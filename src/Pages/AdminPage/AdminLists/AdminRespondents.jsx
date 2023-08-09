import "./adminLists.css";
import DataTable from "../../../Components/DataTable/DataTable";
import {useState, useEffect, useRef} from "react";
import axios from "axios";
import Cookies from "universal-cookie";

const AdminRespondents = () => {
    const [respondents, setRespondents] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const cookies = new Cookies();
    const token = cookies.get("token");
    const [pageLoaded, setPageLoaded] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(false);
    const [respondentId, setRespondentId] = useState({id: "", action: ""});
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
          field: 'city',
          headerName: 'City',
          width: 150,
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
          field: 'verified',
          headerName: 'Verified',
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
              {/* Verify */}
              {!params.row.verified && <div className="actions__buttons verify"
                onClick={() => {
                  setConfirmPassword(true);
                  setRespondentId({id: params.row.id, action: "verify"});
                }}
                > Verify
              </div>}

              {/* Suspend and Reinstate */}
              {params.row.blocked ? 
              <div className="actions__buttons unsuspend"
                onClick = {() => {
                  setConfirmPassword(true);
                  setRespondentId({id: params.row.id, action: "suspend"});
                }}>Reinstate</div> : 
              <div className="actions__buttons suspend" onClick={() => {
                setConfirmPassword(true);
                setRespondentId({id: params.row.id, action: "suspend"});
                }}>Suspend</div>}

              {/* Delete */}
              <div onClick={() => {
                setConfirmPassword(true);
                setRespondentId({id: params.row.id, action: "delete"});
                }} className="actions__buttons delete">
                Delete
              </div>
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
      const deleteRespondent = (password) => {
        // Configure delete request
        const url = `https://afrimentary.onrender.com/API/delete/respondent/${respondentId.id}`;
        const method = "delete";
        const data = password;
        const requestConfig = actionsRequestConfig(url, method, data);
        axios(requestConfig).then(res => {
          setSuccessMessage(res?.data?.message);
          // Filter out the deleted respondent
          setRespondents(prev => {
            return prev.filter(respondent => {
              return respondent.id != respondentId.id;
            });
          });
        }).catch(
          err => {
            setErrorMessage(err?.response?.data?.message);
          }
        )
      }

    // suspend Respondent
    const suspendRespondent = (password) => {
      // Configure suspend request
      const url = `https://afrimentary.onrender.com/API/suspend/respondent/${respondentId.id}`;
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

    // Verify Respondent
    const verifyRespondent = (password) => {
      // Configure verify request
      const url = `https://afrimentary.onrender.com/API/verify/respondent/${respondentId.id}`;
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

    // Handle password confirm form
    const submitPassword = (e) => {
      e.preventDefault();
      const password = {password: passwordRef.current.value}
      if (respondentId.action === 'delete') {
        deleteRespondent(password);
      } else if (respondentId.action === "suspend") {
        suspendRespondent(password);
      } else if (respondentId.action === "verify") {
        verifyRespondent(password);
      }
      passwordRef.current.value = "";
      setConfirmPassword(false);
    }

    
    // Fetch all respondents
    useEffect(() => {
      const controller = new AbortController();
      const getRespondents = async () =>  {
        try {
          const response = await axios.get(
              "https://afrimentary.onrender.com/API/all/respondents",
              {headers: {
                'Authorization': 'Basic Auth',
                'x-access-token': token
              }},
              {signal: controller.signal},
          );
          !controller.signal.abort && setRespondents(response?.data?.respondents);
        } catch(err) {
          setErrorMessage(err?.response?.message);
        }
        setPageLoaded(true);
      };
      getRespondents();
      return () => {
          controller.abort();
      }
    }, []);

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
            <h3>Respondents</h3>
            <div className="lists__table">
                {pageLoaded ?
                  <DataTable rows={respondents} columns={columns} /> :
                  <p>Loading...</p>
                }
            </div>
        </section>
    )
}

export default AdminRespondents;