import React, { useState } from "react";
import { teacherRegister } from "../api/Apifunction";
import "../../../src/App.css"


export const AddTeacher = () => {
  const [teacher, setTeacher] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInput = (e) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };

  const submitInput = async (e) => {
    e.preventDefault();
    try {
      const response = await teacherRegister(teacher);
      if (response === 200) {
        setTeacher({
          name: "",
          email: "",
          contact: "",
          address: "",
        })
        setSuccess("Teacher registered successfully!");
        setTimeout(() => {
          setSuccess("");
        }, 3000);
      } else {
        setError("Failed to register teacher. Please try again.");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <>
      <div className="container">
      <div className="heading">Add Teacher</div>
        <form onSubmit={submitInput}>
          <div className="form-input">
            <div className="input">
              <label htmlFor="name">Teacher Name</label>
              <input
                id="name"
                name="name"
                type="text"
                className="form-control"
                value={teacher.name}
                onChange={handleInput}
                required
              />
            </div>

            <div className="input">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-control"
                value={teacher.email}
                onChange={handleInput}
                required
              />
            </div>

            <div className="input">
              <label htmlFor="contact">Contact</label>
              <input
                id="contact"
                name="contact"
                type="text"
                className="form-control"
                value={teacher.contact}
                onChange={handleInput}
                required
              />
            </div>

            <div className="input">
              <label htmlFor="address">Address</label>
              <input
                id="address"
                name="address"
                type="text"
                className="form-control"
                value={teacher.address}
                onChange={handleInput}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>

       
        {success && (
          <div className="popup success">
            <p>{success}</p>
            
          </div>
        )}

        
        {error && (
          <div className="popup error">
            <p>{error}</p>
            
          </div>
        )}
      </div>

      
      
    </>
  );
};
