import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080",
});


export async function adminLogin(loginData) {
    try {
        console.log(loginData)
        const response = await api.post("/adminlogin", loginData);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Login error:", error);
        return false;
    }
}

export async function teacherRegister(teacher) {
    try {
        const response = await api.post("/addTeacher", teacher);
        return response.status;
    } catch (error) {
        console.error("Registration Error:", error);
        return error.response ? error.response.status : 500;
    }
}

export async function studentRegister(student) {
    try {
        const response=await api.post("/studentRegister", student)
        return response.status;
        
    } catch (error) {
        
    }
    
}

export async function getIdOfTeacher(username) {
    try {
        console.log(username)
        const response = await api.get(`/id?username=${username}`);
        console.log(response.status) 
        return response.status === 200 ? response.data : null;
    } catch (error) {
        console.error("Error Fetching Teacher ID:", error);
        return null;
    }
}

export async function addExams(exam) {
    try {
        
        const response=await api.post("/addExam", exam);
        console.log(response.status)
        return response;
    } catch (error) {
        return false;
        
    }
}

export async function addQuestion(question) {
    try {
        const response = await api.post("/addQuestion", question);
        return response.status;
    } catch (error) {
        console.error("Error Adding Question:", error);
        return error.response ? error.response.status : 500;
    }
}


export async function findexamid(teacherId) {

    try {
        console.log(teacherId)
        const response=await api.get(`/add-exam?teacherId=${teacherId}`)
        console.log(response.data);
        return response.data;
    } catch (error) {
        return error;
    }
}

export  async function  getAllexam(teacherId) {
    try {
        const response=await api.get(`/getallexam?teacherId=${teacherId}`)
        if(response.status===200)return response.data;
    } catch (error) {
        return error;
    }
}

export async function getallquestion(examId) {
    try {
        var response=await api.get(`/allquestions?examId=${examId}`)
        if(response.status===200)
        return response.data;
    } catch (error) {
        return error;
    }
    
}