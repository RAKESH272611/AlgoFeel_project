import React, { useState } from 'react';
import '../Assets/css/Contact.css'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const showSuccessNotification = () => {
    toast.success('Message sent successfully!', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform any additional actions here, such as sending the form data to a backend server

    // Reset the form fields
    setName('');
    setEmail('');
    setMessage('');

    showSuccessNotification();
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2 className="contact-heading">Contact Us</h2>
        <p className="contact-description">
          We'd love to hear from you! If you have any questions, suggestions, or feedback, please feel free to reach out to us.
        </p>
        <div className="contact-form">
          <h3 className="form-heading">Send us a Message</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <textarea
                className="form-control"
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Send</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Contact;
