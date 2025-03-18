import React, { useState } from "react";
import { studentRegister } from "../api/Apifunction";
import "../../../src/App.css";

export const AddStudent = () => {
  const [student, setStudent] = useState({
    name: "",
    emailId: "",
    contact: "",
    uniRoll: "",
    collegeRoll: "",
    course: "",
    dob: "",
    session: "",
    branch: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInput = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const submitInput = async (e) => {
    e.preventDefault();
    try {
      const response = await studentRegister(student);
      if (response === 200) {
        setStudent({
          name: "",
          emailId: "",
          contact: "",
          uniRoll: "",
          collegeRoll: "",
          course: "",
          dob: "",
          session: "",
          branch: "",
        });
        setSuccess("Student registered successfully!");
        setTimeout(() => {
          setSuccess("");
        }, 3000);
      } else {
        setError("Failed to register student. Please try again.");
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
    <div className="container">
      <div className="heading">Add Student</div>
      <form onSubmit={submitInput}>
        <div className="form-input">
          <div className="input">
            <label htmlFor="name">Student Name</label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-control"
              value={student.name}
              onChange={handleInput}
              required
            />
          </div>

          <div className="input">
            <label htmlFor="emailId">Email</label>
            <input
              id="emailId"
              name="emailId"
              type="email"
              className="form-control"
              value={student.emailId}
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
              value={student.contact}
              onChange={handleInput}
              required
            />
          </div>

          <div className="input">
            <label htmlFor="course">Course</label>
            <select
              id="course"
              name="course"
              type="text"
              className="form-control"
              value={student.course}
              onChange={handleInput}
              required
            >
         <option value="">Select Branch</option>
    <option value="B Tech">B.Tech</option>
    <option value="Mechanical Engineering">MBA</option>
    <option value="Civil Engineering">M TECH</option>
    
        </select>
          </div>

          <div className="input">
  <label htmlFor="branch">Branch</label>
  <select
    id="branch"
    name="branch"
    className="form-control"
    value={student.branch}
    onChange={handleInput}
    required
  >
    <option value="">Select Branch</option>
    <option value="Computer Science and Engineering">Computer Science and Engineering</option>
    <option value="Mechanical Engineering">Mechanical Engineering</option>
    <option value="Civil Engineering">Civil Engineering</option>
    <option value="Electrical Engineering">Electrical Engineering</option>
    <option value="Electronics and Communication Engineering">Electronics and Communication Engineering</option>
    <option value="Information Technology">Information Technology</option>
    <option value="Chemical Engineering">Chemical Engineering</option>
    <option value="Biotechnology">Biotechnology</option>
    <option value="Aerospace Engineering">Aerospace Engineering</option>
    <option value="Automobile Engineering">Automobile Engineering</option>
    <option value="Agricultural Engineering">Agricultural Engineering</option>
    <option value="Instrumentation Engineering">Instrumentation Engineering</option>
    <option value="Textile Engineering">Textile Engineering</option>
    <option value="Mining Engineering">Mining Engineering</option>
    <option value="Metallurgical Engineering">Metallurgical Engineering</option>
    <option value="Production Engineering">Production Engineering</option>
    <option value="Petroleum Engineering">Petroleum Engineering</option>
    <option value="Environmental Engineering">Environmental Engineering</option>
    <option value="Industrial Engineering">Industrial Engineering</option>
    <option value="Marine Engineering">Marine Engineering</option>
  </select>
</div>


          <div className="input">
            <label htmlFor="uniRoll">University Roll</label>
            <input
              id="uniRoll"
              name="uniRoll"
              type="text"
              className="form-control"
              value={student.uniRoll}
              onChange={handleInput}
              required
            />
          </div>

          <div className="input">
            <label htmlFor="collegeRoll">College Roll</label>
            <input
              id="collegeRoll"
              name="collegeRoll"
              type="text"
              className="form-control"
              value={student.collegeRoll}
              onChange={handleInput}
              required
            />
          </div>

          

          <div className="input">
            <label htmlFor="dob">Date of Birth</label>
            <input
              id="dob"
              name="dob"
              type="date"
              className="form-control"
              value={student.dob}
              onChange={handleInput}
              required
            />
          </div>
          {/* <div className="input">
            <label htmlFor="sessionFrom">Session</label>
           
            <input
                id="sessionFrom"
                name="sessionFrom"
                type="date"
                className="form-control"
                value={student.session}
                onChange={handleInput}
                required
            />
           
            </div> */}


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
  );
};
