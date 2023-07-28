import "./adminLists.css";
import DataTable from "../../../Components/DataTable/DataTable";
import {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import {RiCloseLine} from "react-icons/ri";

const SurveyResponses = () => {
    const [responses, setResponses] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const cookies = new Cookies();
    const token = cookies.get("token");
    const [pageLoaded, setPageLoaded] = useState(false);
    const {id} = useParams();
    const [surveyTitle, setSurveyTitle] = useState("");
    const [popImage, setPopImage] = useState(false);
    const [popImageData, setPopImageData] = useState({imgUrl: "", email: ""})
    const showScreenshot = (img, email) => {
      setPopImage(prev =>  {return !prev});
      setPopImageData({imgUrl: img, email: email})
    }
    // Verify Response
    const verifyResponse = (id) => {
      const axiosConfig = {
        method: "put",
        url: `https://afrimentary.onrender.com/API/verify_response/${id}`,
        headers: {
            'Authorization': 'Basic Auth',
            'x-access-token': token
        }
      }
      axios(axiosConfig).then(res => {
          setSuccessMessage(res?.data?.message);
      }).catch(
        err => {
          setErrorMessage(err?.response?.message);
        }
      );
    }

    // Fetch survey responses
    useEffect(() => {
        const controller = new AbortController();
        const getResponses = async () =>  {
          try {
            const response = await axios.get(
                `https://afrimentary.onrender.com/API/all/responses/${id}`,
                {headers: {
                  'Authorization': 'Basic Auth',
                  'x-access-token': token
                }},
                {signal: controller.signal},
            );
            !controller.signal.abort && setResponses(response?.data?.responses);
            setSurveyTitle(response?.data?.surveyTitle);
          } catch(err) {
            setErrorMessage(err?.response?.message);
          }
          setPageLoaded(true);
        };
        getResponses();
        return () => {
            controller.abort();
        }
    }, []);

    // Table columns
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'timeTaken',
          headerName: 'Time Taken (in Mins)',
          width: 90,
        }, 
        {
          field: 'phone',
          headerName: 'Phone',
          width: 150,
        }, 
        {
          field: 'email',
          headerName: 'Email',
          width: 250,
        },
        {
          field: 'verified',
          headerName: 'Verified',
          type: "boolean",
          width: 90,
        },
        {
          field: 'screenshot',
          headerName: 'Image',
          width: 90,
          renderCell: (params) => {
            return <div className="screenshot__thumbnail" onClick={() => {showScreenshot(params.row.screenshot, params.row.email)}}>
                <img className={"screenshot__img"} src={params.row.screenshot} alt="" />
            </div>
          }
        },
        {
          field: 'verify',
          headerName: 'Verify',
          width: 150,
          renderCell: (params) => {
            return <div>
              {!params.row.verified && <div className="actions__buttons verify" onClick={() => {
                verifyResponse(params.row.id);
                params.row.verified = true;
              }}>Verify Response</div>}
            </div>
          }
        },
    ]
    // Close error message & success message after 5seconds
    errorMessage && setTimeout(() => {setErrorMessage(false)}, 5000);
    successMessage && setTimeout(() => {setSuccessMessage(false)}, 5000);
    return (
        <section className="all__lists">
            {popImage && <div className="expand__screenshot">
              {<div className="minimize__img" onClick={() => {setPopImage(false)}}><RiCloseLine size="32px" color="#fff" /></div>}
              <p>Submitted by: <span>{popImageData.email}</span></p>
              <img className="full__img" src={popImageData.imgUrl} alt=""/>
            </div>}
            {errorMessage && <div className="all_lists-messages">{errorMessage}</div>}
            {successMessage && <div className="all_lists-messages success">{successMessage}</div>}
            {surveyTitle && <h3>{surveyTitle}</h3>}
            <div className="lists__table">
            {pageLoaded ?
                <DataTable rows={responses} columns={columns} /> :
                <p>Loading...</p>
            }
          </div>
        </section>
    )
}

export default SurveyResponses;