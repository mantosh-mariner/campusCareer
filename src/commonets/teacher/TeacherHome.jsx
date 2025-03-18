import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getIdOfTeacher } from "../api/Apifunction";

export const TeacherHome = () => {
    const location = useLocation();
    const username = location.state?.username || ""; 
    const [id, setId] = useState(null);

    useEffect(() => {
        if (username) {
            getIds();
        }
    }, [username]); 

    const getIds = async () => {
        try {
            const response = await getIdOfTeacher(username);
           
            setId(response);
        } catch (error) {
            console.error("Error fetching teacher ID:", error);
        }
    };

    return (
        <div>
            <h2>Teacher Home</h2>
            {id ? (
                <>
                    <Link to={`/addexam/${id}`}>Add Exam</Link>
                    <Link to={`/addquestion/${id}`}>Add Question</Link>
                    <Link to={`/allexam/${id}`} >see all exam</Link>
                </>
            ) : (
                <p>Loading Teacher ID...</p>
            )}
            <p>Welcome, {username} | Teacher ID: {id}</p>
        </div>
    );
};
