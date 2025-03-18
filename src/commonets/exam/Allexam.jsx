import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAllexam } from "../api/Apifunction";


export const Allexam = () => {
    const { teacherId } = useParams(); 
    const [exams, setExams] = useState([]);

    useEffect(() => {
        if (teacherId) {
            getExams();
        }
    }, [teacherId]);

    const getExams = async () => {
        try {
            const response = await getAllexam(teacherId); 
            setExams(response); 
            console.log(response); 
        } catch (error) {
            console.error("Error fetching exams:", error);
        }
    };

    return (
        <div className="exam-container">
            <h2 className="text-center mb-4">📚 All Exams</h2>
            {exams.length > 0 ? (
                <div className="table-responsive">
                    <table className="table table-hover custom-table">
                        <thead>
                            <tr>
                                <th>Exam ID</th>
                                <th>Subject</th>
                                <th>Title</th>
                                <th>Date</th>
                                <th>Session</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {exams.map((examArray, index) => (
                                <tr key={index}>
                                    <td>{examArray[0]}</td>  
                                    <td>{examArray[5]}</td>  
                                    <td>{examArray[6]}</td> 
                                    <td>{examArray[2]}</td>
                                    <td>{examArray[3] || "N/A"}</td> 
                                   <td> <button><Link to={`/editexam/${examArray[0]}`}>Edit</Link></button> <button> <Link to={`/question/${examArray[0]}`}>Question</Link></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center no-exams">No exams found.</p>
            )}
        </div>
    );
};
