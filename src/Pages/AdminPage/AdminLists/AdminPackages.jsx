import "./adminLists.css";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import PackagesBar from "./PackagesBar";

const AdminPackages = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [packagesData, setPackagesData] = useState({packages: "", surveys: ""});
    const [pageLoaded, setPageLoaded] = useState(false);
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
        axios(axiosConfig).then(res => {
            setSuccessMessage(res?.data?.message);
            packageRef.current.value = ""
            respondentsRef.current.value = ""
            questionsRef.current.value = ""
            timeRef.current.value = ""
            priceRef.current.value = ""
        }).catch(err => {
            setErrorMessage(err?.response?.data?.message);
        });
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
                    <form className="packages__form" onSubmit={handleSubmit}>
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
                        <button type="submit">Create New Package</button>
                    </form>
                </div>
                <div className="packages__visualization sections">
                    <PackagesBar data={packagesData} />
                </div>
                <div className="packages__actions sections">
                    <p>Actions</p>
                </div>
                
            </div> : <p>Page loading...</p>}
        </section>
    )
}

export default AdminPackages;