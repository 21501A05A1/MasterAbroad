import React from 'react'
import { useEffect,useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Admit_Eligibility.css'
function Admit_Eligibility() {
  const API=process.env.REACT_APP_API;
  const [isLoading, setIsloading] = useState(false);
  const [formData, setFormData] = useState({
    GRE_Score: "",
    TOEFL_Score: "",
    University_Rating: "",
    SOP: "",
    LOR: "",
    CGPA: "",
    Research: "",
  });
 // State to manage prediction result
 const [result, setResult] = useState("");
 // State to manage displaying result
 const [showSpan, setShowSpan] = useState(false);

 const handleChange = (event) => {
   const value = event.target.value;
   const name = event.target.name;
   let inputData = { ...formData };
   inputData[name] = value;
   setFormData(inputData);
 };
  // Function to handle the 'Predict Selling Price' button click
  const handlePredictClick = () => {
    const url = `${API}/predict`;
    setIsloading(true);
    const jsonData = JSON.stringify(formData);
    // Fetch request to the Flask backend
    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: jsonData,
    })
      .then((response) => response.json())
      .then((response) => {
        setResult(response.Prediction);
        setIsloading(false);
        setShowSpan(true);
      });
  };
  return (
    <div className='background-images'>
      <div className="container text-center mt-4">
      <h1 className="text-center">Chance of Admission</h1>
      <div className="container">
        <form method="post" acceptCharset="utf-8" name="Modelform">
          <div className="text-center mt-3">
            <label>
              <b>Enter GRE_Score:</b>
            </label>
            <br />
            <input
              type="text"
              className="form-control"
              id="GRE_Score"
              name="GRE_Score"
              value={formData.GRE_Score}
              onChange={handleChange}
              placeholder="Enter GRE_Score "
            />
          </div>
          <div className="form-group">
            <label>
              <b>Enter TOEFL_Score:</b>
            </label>
            <br />
            <input
              type="text"
              className="form-control"
              id="TOEFL_Score"
              name="TOEFL_Score"
              value={formData.TOEFL_Score}
              onChange={handleChange}
              placeholder="Enter TOEFL_Score"
            />
          </div>
          <div className="form-group">
            <label>
              <b>
                Enter University_Rating:
              </b>
            </label>
            <br />
            <input
              type="text"
              className="form-control"
              id="University_Rating"
              name="University_Rating"
              value={formData.University_Rating}
              onChange={handleChange}
              placeholder="Enter the University Rating "
            />
          </div>
          <div className="form-group">
            <label>
              <b>
                Enter SOP:
              </b>
            </label>
            <br />
            <input
              type="text"
              className="form-control"
              id="SOP"
              name="SOP"
              value={formData.SOP}
              onChange={handleChange}
              placeholder="Enter SOP "
            />
          </div>
          <div className="form-group">
            <label>
              <b>
                Enter LOR:
              </b>
            </label>
            <br />
            <input
              type="text"
              className="form-control"
              id="LOR"
              name="LOR"
              value={formData.LOR}
              onChange={handleChange}
              placeholder="Enter LOR"
            />
          </div>
          <div className="form-group">
            <label>
              <b>
                Enter CGPA:
              </b>
            </label>
            <br />
            <input
              type="text"
              className="form-control"
              id="CGPA"
              name="CGPA"
              value={formData.CGPA}
              onChange={handleChange}
              placeholder="Enter CGPA "
            />
          </div>
          <div className="form-group">
            <label>
              <b>Enter Research</b>
            </label>
            <br />
            <input
              type="text"
              className="form-control"
              id="Research"
              name="Research"
              value={formData.Research}
              onChange={handleChange}
              placeholder="Enter Research "
            />
          </div>
          <div className="form-group mt-3">
            <button
              className="btn btn-primary form-control"
              disabled={isLoading}
              onClick={!isLoading ? handlePredictClick : null}
            >
              Predict admission
            </button>
          </div>
        </form>
        <br />
        <div className="text-center">
          <h4>
            {showSpan && (
              <span id="prediction">
                {result && Object.keys(result).length !== 0 ? (
                  <p>The Predicted chance of admission is {result*100} </p>
                ) : (
                  <p>Please fill out each field in the form completely</p>
                )}
              </span>
            )}
          </h4>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Admit_Eligibility