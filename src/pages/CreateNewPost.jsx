import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/auth';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from "react-quill";
import './CreateNewPost.css';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';

const defaultContactFormData = {
  photo: '',
  about: '',
};

const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }],
    ['link', 'image'],
    ['clean']
  ]
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent', 'link', 'image'
];

function CreateNewPost() {
  const [contact, setContact] = useState(defaultContactFormData);
  const [description, setDescription] = useState('');
  const { authorizationToken,URL } = useAuth();
  const id = localStorage.getItem('userId');
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setContact({
      ...contact,
      [name]: value
    });
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${URL}/api/auth/userpost`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorizationToken
        },
        user: id,
        body: JSON.stringify({ ...contact, description })
      });
      if (response.ok) {
        setContact(defaultContactFormData);
        setDescription('');
        const data = await response.json();
        console.log(data);
        toast.success("post created successfully");
        navigate('/sharexperiences/visapost');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid h-100 pt-5 background-image">
      <div className="row h-100 align-items-center justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4 pt-5">
              <label htmlFor="photo" className="form-label">Photo</label>
              <input
                type="text"
                className="form-control"
                id="photo"
                name="photo"
                value={contact.photo}
                onChange={handleInput}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="form-label">Description</label>
              <ReactQuill
                value={description}
                onChange={handleDescriptionChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="about" className="form-label">About</label>
              <select
                className="form-select"
                id="about"
                name="about"
                value={contact.about}
                onChange={handleInput}
              >
                <option value="">Select...</option>
                <option value="Visa">Visa</option>
                <option value="Scholarships">Scholarships</option>
                <option value="Admission">Admission</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateNewPost;
