import "./adminLists.css";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import PackagesBar from "./PackagesBar";
import uniqid from "uniqid";
import loading from "../../../assets/loading.gif";

const AdminPackages = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [packagesData, setPackagesData] = useState({packages: "", surveys: "", allPackages: ""});
    const selectedPackageRef = useRef();
    const [pageLoaded, setPageLoaded] = useState(false);
    const [creatingPackage, setCreatingPackage] = useState(false);
    const [deletingPackage, setDeletingPackage] = useState(false);
    const cookies = new Cookies();
    const token = cookies.get("token");
    const packageRef = useRef();
    const respondentsRef = useRef();
    const questionsRef = useRef();
    const timeRef = useRef();
    const priceRef = useRef();
    // Request configuration function
    const requestConfig = (url, method, data) => {
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

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        setCreatingPackage(true);
        const data = {
            package: packageRef.current.value,
            respondents: respondentsRef.current.value,
            questions: questionsRef.current.value,
            time: timeRef.current.value,
            price: priceRef.current.value
        }
        const axiosConfig = requestConfig(
            "https://afrimentary.onrender.com/API/create/survey_packages",
            "post",
            data
        )
        if (packageRef.current.value?.includes(" ")) {
            setErrorMessage("Package Name MUST not have spaces");
        } else {
            axios(axiosConfig).then(res => {
                setSuccessMessage(res?.data?.message);
                packageRef.current.value = "";
                respondentsRef.current.value = "";
                questionsRef.current.value = "";
                timeRef.current.value = "";
                priceRef.current.value = "";
                setCreatingPackage(false);
            }).catch(err => {
                setErrorMessage(err?.response?.data?.message);
                setCreatingPackage(false);
            });
        }
    }

    const handleDelete = (e) => {
        e.preventDefault();
        setDeletingPackage(true);
        const data = {package: selectedPackageRef.current.value}
        const axiosConfig = requestConfig(
            "https://afrimentary.onrender.com/API/activate/survey_package",
            "put",
            data
        )
        axios(axiosConfig).then(res => {
            const success = res?.data?.message;
            setSuccessMessage(success);
            setDeletingPackage(false);
        }).catch(err => {
            const fail = err?.response?.data?.message;
            setErrorMessage(fail);
            setDeletingPackage(false);
        })
    }

    useEffect(() => {
        const controller = new AbortController();
        const getPackages = async () =>  {
            try {
                const response = await axios.get(
                    "https://afrimentary.onrender.com/API/admin/survey_packages",
                    {headers: {
                        'Authorization': 'Basic Auth',
                        'x-access-token': token
                    }},
                    {signal: controller.signal},
                );
                !controller.signal.abort && 
                setPackagesData(response?.data?.data);
            } catch(err) {
                setErrorMessage(err?.response?.message);
            }
            setPageLoaded(true);
        };
        getPackages();
        return () => {
            controller.abort();
        }
    }, [successMessage, errorMessage]);

    // Close error message & success message after 5seconds
    errorMessage && setTimeout(() => {setErrorMessage(false)}, 5000);
    successMessage && setTimeout(() => {setSuccessMessage(false)}, 5000);
    return (
        <section className="all__lists">
            {errorMessage && <div className="all_lists-messages">{errorMessage}</div>}
            {successMessage && <div className="all_lists-messages success">{successMessage}</div>}
            <h3>Packages</h3>
            {pageLoaded ? 
            <div className="admin__packages">
                <div className="create_package sections">
                    {creatingPackage && <img src={loading} alt="" className="submit__loading" />}
                    <form className="packages__form" onSubmit={handleSubmit}>
                        <p className="warning">Package name MUST not have spaces</p>
                        <div>
                            <label htmlFor="package">Package Name</label>
                            <input ref={packageRef} required name="package" id="package" type="text" />
                        </div>
                        <div>
                            <label htmlFor="respondents">Number of Respondents</label>
                            <input ref={respondentsRef} required name="respondents" id="respondents" type="number" />
                        </div>
                        <div>
                            <label htmlFor="questions">Number of Questions</label>
                            <input ref={questionsRef} required name="questions" id="questions" type="number" />
                        </div>
                        <div>
                            <label htmlFor="time">Time in Minutes</label>
                            <input ref={timeRef} required name="time" id="time" type="number" />
                        </div>
                        <div>
                            <label htmlFor="price">Price in USD</label>
                            <input ref={priceRef} required name="price" id="price" type="number" />
                        </div>
                        <button disabled={creatingPackage} type="submit">
                            {!creatingPackage ? "Create New Package" : "Creating..."}
                        </button>
                    </form>
                </div>
                <div className="packages__visualization sections">
                    <PackagesBar data={packagesData} />
                </div>
                <div className="packages__actions sections">
                    {deletingPackage && <img src={loading} alt="" className="submit__loading" />}
                    <h4>Actions</h4>
                    <div className="activate__deactivate-packages">
                        <form onSubmit={handleDelete} className="package__delete-form">
                            <div className="package__delete-container">
                                <label htmlFor="packages">Delete Package</label>
                                <select ref={selectedPackageRef} id="packages" required name="package">
                                    <option className="default__option" value="">Select package</option>
                                    {packagesData.allPackages.map(pack => (
                                        <option key={uniqid()} value={pack}>{pack}</option>
                                    ))}
                                </select>
                            </div>
                            <button disabled={deletingPackage} type="submit">
                                {!deletingPackage ? "Delete" : "Deleting..."}
                            </button>
                        </form>
                    </div>
                </div>
                
            </div> : <p>Page loading...</p>}
        </section>
    )
}

export default AdminPackages;