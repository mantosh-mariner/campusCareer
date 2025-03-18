import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { addExams } from "../api/Apifunction";

export const AddExam = () => {
  const { teacherId } = useParams(); 
  const navigate = useNavigate(); 

  const [exam, setExam] = useState({
    title: "",
    subject: "",
    examDate: "",
    duration: "",
    session: "",
    detect: "",
    teacher: { teacherId }, 
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInput = (e) => {
    setExam({ ...exam, [e.target.name]: e.target.value });
  };

  const submitExam = async (e) => {
    e.preventDefault();
    try {
      console.log(exam.teacher.teacherId);
      const response = await addExams(exam);

      if (response.status === 200) {
        setExam({
          title: "",
          subject: "",
          examDate: "",
          duration: "",
          session: "",
          detect: "",
          teacher: { teacherId }, 
        });

        setSuccess("Exam added successfully!");
        setTimeout(() => setSuccess(""), 3000);
        
       
        setTimeout(() => { 
          navigate(`/addquestion/${teacherId}`, { replace: true }); 
        }, 4000);
      } else {
        setError("Failed to add exam. Please try again.");
        setTimeout(() => setError(""), 3000);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="container">
      <div className="heading">Add Exam</div>
      <form onSubmit={submitExam}>
        <div className="form-input">
          <div className="input">
            <label htmlFor="title">Exam Title</label>
            <input id="title"
             name="title" 
             type="text"
              className="form-control"
               value={exam.title}
                onChange={handleInput} required />
          </div>

          <div className="input">
            <label htmlFor="subject">Subject</label>
            <input id="subject"
             name="subject"
              type="text" 
              className="form-control"
               value={exam.subject}
                onChange={handleInput} required />
          </div>

          <div className="input">
            <label htmlFor="examDate">Exam Date</label>
            <input id="examDate" 
            name="examDate"
             type="date" 
             className="form-control" 
             value={exam.examDate}
              onChange={handleInput} required />
          </div>

          <div className="input">
            <label htmlFor="duration">Duration (minutes)</label>
            <input id="duration" 
            name="duration" type="number" 
            className="form-control"
             value={exam.duration} onChange={handleInput} required />
          </div>

          <div className="input">
            <label htmlFor="session">Session</label>
            <input id="session"
             name="session" 
             type="text" 
             className="form-control"
              placeholder="ex:-2021-2025" 
              value={exam.session} onChange={handleInput} required />
          </div>

          <div className="input">
            <label htmlFor="detect">Detect Marks</label>
            <input id="detect"
             name="detect"
              type="text" 
              className="form-control" 
              placeholder="1/4 marks deducted for 4 wrong answers" 
              value={exam.detect} 
              onChange={handleInput} required />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

      {success && <div className="popup success"><p>{success}</p></div>}
      {error && <div className="popup error"><p>{error}</p></div>}
    </div>
  );
};
