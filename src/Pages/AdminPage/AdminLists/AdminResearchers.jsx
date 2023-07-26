import "./adminLists.css";
import DataTable from "../../../Components/DataTable/DataTable";
import {useState, useEffect, useRef} from "react";
import axios from "axios";
import Cookies from "universal-cookie";

const AdminResearcher = () => {
  const [researchers, setResearchers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [pageLoaded, setPageLoaded] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [researcherId, setResearcherId] = useState({id: "", action: ""});
  const passwordRef = useRef();
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
    {
      field: 'country',
      headerName: 'Country',
      width: 110,
      editable: true,
    },
    {
      field: 'institution',
      headerName: 'Institution',
      width: 200,
      editable: true,
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
      field: 'active',
      headerName: 'Active',
      type: "boolean",
      width: 90,
    },
    {
      field: 'blocked',
      headerName: 'Suspended',
      type: "boolean",
      width: 90,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 250,
      renderCell: (params) => {
        return <div className="actions">
          {params.row.blocked ? <div className="actions__buttons unsuspend" onClick={() => {
            setConfirmPassword(true);
            setResearcherId({id: params.row.id, action: "suspend"});
          }}>Reinstate</div> 
          : <div className="actions__buttons suspend" onClick={() => {
            setConfirmPassword(true);
            setResearcherId({id: params.row.id, action: "suspend"});
          }}>Suspend</div>}
          <div className="actions__buttons delete"onClick={() => {
            setConfirmPassword(true);
            setResearcherId({id: params.row.id, action: "delete"});
          }}>Delete</div>
        </div>
      } 
    },
  ];

  // Request configuration function
  const actionsRequestConfig = (url, method, data) => {
    const axiosConfig = {
      method: method,
      url: url,
      data: data,
      headers: {
        'Authorization': 'Basic Auth',
        'x-access-token': token
      }
    }
    return axiosConfig;
  }

  // Delete Respondent
  const deleteResearcher = (password) => {
    // Configure delete request
    const url = `https://afrimentary.onrender.com/API/delete/researcher/${researcherId.id}`;
    const method = "delete";
    const data = password;
    const requestConfig = actionsRequestConfig(url, method, data);
    axios(requestConfig).then(res => {
      setSuccessMessage(res?.data?.message);
      // Filter out the deleted respondent
      setRespondentId(prev => {
        prev.filter(researcher => {
          return researcher.id != researcherId.id;
        })
      })
    }).catch(
      err => {
        setErrorMessage(err?.response?.data?.message);
      }
    )
  }

  // suspend Respondent
  const suspendResearcher = (password) => {
    // Configure suspend request
    const url = `http://127.0.0.1:5000/API/suspend/researcher/${researcherId.id}`;
    const method = "put";
    const data = password;
    const requestConfig = actionsRequestConfig(url, method, data);
    axios(requestConfig).then(res => {
      setSuccessMessage(res?.data?.message);
    }).catch(
      err => {
        setErrorMessage(err?.response?.data?.message);
      }
    );
  }

  //Load Researchers
  useEffect(() => {
    const controller = new AbortController();
    const getResearchers = async () =>  {
      try {
        const response = await axios.get(
            "http://127.0.0.1:5000/API/all/researchers",
            {headers: {
              'Authorization': 'Basic Auth',
              'x-access-token': token
            }},
            {signal: controller.signal},
        );
        !controller.signal.abort && setResearchers(response?.data?.researchers);
      } catch(err) {
        setErrorMessage(err?.response?.message);
      }
      setPageLoaded(true);
    };
    getResearchers();
    return () => {
        controller.abort();
    }
  }, []);

  // Handle password confirm form
  const submitPassword = (e) => {
    e.preventDefault();
    const password = {password: passwordRef.current.value}
    if (researcherId.action === 'delete') {
      deleteResearcher(password);
    } else if (researcherId.action === "suspend") {
      suspendResearcher(password);
    }
    passwordRef.current.value = "";
    setConfirmPassword(false);
  }
  // Close error message & success message after 5 seconds
  errorMessage && setTimeout(() => {setErrorMessage(false)}, 5000);
  successMessage && setTimeout(() => {setSuccessMessage(false)}, 5000);
  return (
    <section className="all__lists">
      {confirmPassword && <div className="admin__password">
        <form onSubmit={submitPassword}>
          <h4>Enter password</h4>
          <input name="adminPassword" placeholder="Password" required type="password" ref={passwordRef}/>
          <button  type="submit">Submit</button>
          <button onClick={() => {setConfirmPassword(false)}} className="close__form"  type="button">Close form</button>
        </form>
      </div>}
      {errorMessage && <div className="all_lists-messages">{errorMessage}</div>}
      {successMessage && <div className="all_lists-messages success">{successMessage}</div>}
      <h3>Researchers</h3>
      <div className="lists__table">
        {pageLoaded ?
          <DataTable rows={researchers} columns={columns} /> :
          <p>Loading...</p>
        }
      </div>
    </section>
  )
}

export default AdminResearcher;