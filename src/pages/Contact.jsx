import React, { useState, useEffect } from "react";
import Image from 'react-bootstrap/Image';
import contactphoto from '../images/contactphoto.jpg';
import { useAuth } from "../store/auth";
import './Contact.css'
import {toast} from 'react-toastify';
const defaultContactFormData = {
    username: "",
    email: "",
    message: "",
};

const Contact = () => {
    const [contact, setContact] = useState(defaultContactFormData);
    const [userDataLoaded, setUserDataLoaded] = useState(false);
    const { user,URL,username } = useAuth();

    useEffect(() => {
        if (user && !userDataLoaded) {
            setContact({
                ...contact,
                username: user.username,
                email: user.email,
            });
            setUserDataLoaded(true);
        }
    }, [user, contact, userDataLoaded]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setContact({
            ...contact,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${URL}/api/form/contact`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(contact),
            });
            if (response.ok) {
                setContact(defaultContactFormData);
                const data = await response.json();
                console.log(data);
                toast.success("contact form submitted");
            }
            else{
                toast.error("Form not submitted successfully")
            }
        }
        catch (error) {
            console.log(error)
        }
    };

    return (
        <div>
            <section id="contactpage">
            <h2 style={{ padding: '50px 0', textAlign: 'center' }}> Contact Form</h2>
                <section id="contact" style={{ padding: '50px 0', textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ flex: 1, marginRight: '20px' }}>
                        <Image src={contactphoto} className='w-75' />
                    </div>
                    <div style={{ flex: 1 }}>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="username"
                                    value={username}
                                    onChange={handleInput}
                                    style={{ width: '80%' }} // Adjust width here
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInputc1" className="form-label">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="exampleFormControlInput1"
                                    name="email"
                                    value={user.email}
                                    onChange={handleInput}
                                    style={{ width: '80%' }} // Adjust width here
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">
                                    Your Message
                                </label>
                                <textarea
                                    className="form-control"
                                    id="exampleFormControlTextarea1"
                                    rows="3"
                                    name="message"
                                    value={contact.message}
                                    onChange={handleInput}
                                    style={{ width: '80%' }}
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-outline-primary rounded-pill px-4">Send Message <i className="fa fa-paper-plane ms-2"></i></button>
                        </form>
                    </div>
                </div>
            </section>
            </section>
        </div>
    );
}

export default Contact;
