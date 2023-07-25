import "./adminLists.css";
import DataTable from "../../../Components/DataTable/DataTable";
import {useState, useEffect} from "react";
import axios from "axios";
import Cookies from "universal-cookie";

const AdminResearcher = () => {
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
          {!params.row.active && <div className="actions__buttons verify">Activate</div>}
          {params.row.blocked ? <div className="actions__buttons unsuspend">Suspend</div> : <div className="actions__buttons suspend">Suspend</div>}
          <div className="actions__buttons delete">Delete</div>
        </div>
      } 
    },
  ];
const [researchers, setResearchers] = useState([]);
const [errorMessage, setErrorMessage] = useState("");
const [successMessage, setSuccessMessage] = useState("");
const cookies = new Cookies();
const token = cookies.get("token");
const [pageLoaded, setPageLoaded] = useState(false);

//Load Agents
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
    return (
        <section className="all__lists">
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