import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleInputChange = (e) => {
    const {name, value} = e.target
    setFormData({ ...formData, [name]: value });
  };

  // Reset the response messages
  useEffect(() => {
    const clearMessages = async () =>{
      const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
      };
      await sleep(5000);
      setSuccessMsg("");
      setErrorMsg("");
    };
    clearMessages();

  }, [errMsg, successMsg])

  
  const handleSubmit = (e) => {
    e.preventDefault();
    const axiosConfig = {
      method: "post",
      url: "https://afrimentary.onrender.com/API/contactmessage",
      data: formData
    }
    axios(axiosConfig).then(
      response => {
        const message = response.data.message
        if (message === "Success! Message sent"){
          setFormData({ name: '', email: '', subject: '', message: ''});
          setSuccessMsg(message);
        }
      }

    ).catch(err => {
      setErrorMsg(err);
    });
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {errMsg || successMsg ? 
        <div className={errMsg ? "response_message err": "response_message success"}>
          <p>{errMsg}</p>
          <p>{successMsg}</p>
        </div> :  null
      }
      <div className="form-group">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleInputChange}
          required
          maxLength={200}
        ></textarea>
      </div>
      <div className="form-group">
        <button type="submit">Send</button>
      </div>
    </form>
  );
};

export default ContactForm;
