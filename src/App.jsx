import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./commonets/add/Home";
import { Login } from "./commonets/login/Login";
import { AddTeacher } from "./commonets/teacher/AddTeacher";
import { AddStudent } from "./commonets/student/Addstudent";
import { TeacherHome } from "./commonets/teacher/TeacherHome";
import { StudentHome } from "./commonets/student/StudentHome";
import { AddExam } from "./commonets/exam/AddExam";
import { AddQuestion } from "./commonets/question/AddQuestion";
import { Allexam } from "./commonets/exam/Allexam";
import {Allquestion} from "./commonets/question/Allquestion";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
               
                <Route path="/home" element={<Home />} />
                <Route path="/addteacher" element={<AddTeacher />} />
                <Route path="/addstudent" element={<AddStudent/>}/>
                <Route path="/teacherhome" element={<TeacherHome/>}/>
                <Route path="/studenthome" element={<StudentHome/>}/>
                <Route path="/addexam/:teacherId" element={<AddExam/>}/>
                <Route path="/addquestion/:teacherId" element={<AddQuestion/>}/>
                <Route path="/allexam/:teacherId" element={<Allexam/>}/>
                <Route path="/question/:examId" element={<Allquestion/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
