import "./adminLists.css";
import DataTable from "../../../Components/DataTable/DataTable";
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";

const AdminSurveys = () => {
  const [surveys, setSurveys] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [pageLoaded, setPageLoaded] = useState(false);

  const confirmSurveyPayment = (id) => {
    // Manually confirm survey payment
    const axiosConfig = {
      method: "post",
      url: `https://afrimentary.onrender.com/API/confirm_admin_survey_payment/${id}`,
      headers: {
          'Authorization': 'Basic Auth',
          'x-access-token': token
      }
    }
    axios(axiosConfig).then(
      res => {
        setSuccessMessage(res?.data?.message);
      }
    ).catch(err => {
      setErrorMessage(err?.response?.data?.message);
    }
    )
    
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'title',
      headerName: 'Survey Title',
      width: 300,
      editable: true,
    },
    {
      field: 'field',
      headerName: 'Field of Study',
      width: 150,
      editable: true,
    },
    {
      field: 'package',
      headerName: 'Package',
      width: 110,
      editable: true,
    },
    {
      field: 'startDate',
      headerName: 'Start Date',
      width: 150,
      editable: true,
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      width: 150,
    }, 
    {
      field: 'researcher',
      headerName: 'Researcher',
      width: 250,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 250,
    },
    {
      field: 'paid',
      headerName: 'Paid',
      type: "boolean",
      width: 90,
    },
    {
      field: 'responses',
      headerName: 'Responses',
      width: 100,
      renderCell: (params) => {
        return <div className="survey_responses">
          <Link to={`/admin/responses/${params.row.id}`} className="responses">Responses</Link>
        </div>
      } 
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => {
        return <div className="actions">
          {!params.row.paid && <div className="actions__buttons verify" onClick={() => {confirmSurveyPayment(params.row.publicID)}}>Confirm Payment</div>}
        </div>
      } 
    },
  ];

    // Fetch all surveys
    useEffect(() => {
      const controller = new AbortController();
      const getSurveys = async () =>  {
        try {
          const response = await axios.get(
              "https://afrimentary.onrender.com/API/all/surveys",
              {headers: {
                'Authorization': 'Basic Auth',
                'x-access-token': token
              }},
              {signal: controller.signal},
          );
          !controller.signal.abort && setSurveys(response?.data?.surveys);
        } catch(err) {
          setErrorMessage(err?.response?.message);
        }
        setPageLoaded(true);
      };
      getSurveys();
      return () => {
          controller.abort();
      }
    }, []);

    // Close error message & success message after 5seconds
    errorMessage && setTimeout(() => {setErrorMessage(false)}, 5000);
    successMessage && setTimeout(() => {setSuccessMessage(false)}, 5000);
    
    return (
        <section className="all__lists">
          {errorMessage && <div className="all_lists-messages">{errorMessage}</div>}
          {successMessage && <div className="all_lists-messages success">{successMessage}</div>}
          <div className="surveys__header">
            <h3>Surveys</h3>
            <Link to="/survey/create/custom">Create Survey</Link>
          </div>
          <div className="lists__table">
            {pageLoaded ?
              <DataTable rows={surveys} columns={columns} /> :
              <p>Loading...</p>
            }
          </div>
        </section>
    )
}

export default AdminSurveys;