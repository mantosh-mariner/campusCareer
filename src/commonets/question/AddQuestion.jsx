import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findexamid, addQuestion } from "../api/Apifunction";

export const AddQuestion = () => {
    const { teacherId } = useParams();
    const [examId, setId] = useState(null);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const [questions, setQuestions] = useState([
        { 
            questionName: "", optionA: "", optionB: "", optionC: "", optionD: "", optionE: "", 
            correctOption: "", marks: "", exam: { examId: null }, photo: null, preview: null 
        }
    ]);

    useEffect(() => {
        if (teacherId) {
            getIds();
        }
    }, [teacherId]);

    const getIds = async () => {
        try {
            const response = await findexamid(teacherId);
            console.log("Response from API:", response);
            setId(response);

            setQuestions((prevQuestions) =>
                prevQuestions.map((q) => ({ ...q, exam: { examId: response } }))
            );
        } catch (error) {
            console.error("Error fetching exam ID:", error);
        }
    };

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        setQuestions((prevQuestions) =>
            prevQuestions.map((q, i) =>
                i === index ? { ...q, [name]: value } : q
            )
        );
    };

    const handlePhotoChange = (index, event) => {
        const file = event.target.files[0];
        if (file) {
            console.log("Selected Photo:", file);
            const previewUrl = URL.createObjectURL(file); 

            setQuestions((prevQuestions) =>
                prevQuestions.map((q, i) =>
                    i === index ? { ...q, photo: file, preview: previewUrl } : q
                )
            );

            event.target.value = "";
        }
    };

    const addQuestionField = () => {
        setQuestions((prevQuestions) => [
            ...prevQuestions,
            { 
                questionName: "", optionA: "", optionB: "", optionC: "", optionD: "", optionE: "", 
                correctOption: "", marks: "", exam: { examId }, photo: null, preview: null 
            }
        ]);
    };

    const removeQuestionField = (index) => {
        setQuestions((prevQuestions) =>
            prevQuestions.filter((_, i) => i !== index) // Remove the question at the specified index
        );
    };

    const handleSubmit = async () => {
        try {
            for (const q of questions) {
                const formData = new FormData();
                formData.append("questionName", q.questionName);
                formData.append("optionA", q.optionA);
                formData.append("optionB", q.optionB);
                formData.append("optionC", q.optionC);
                formData.append("optionD", q.optionD);
                formData.append("optionE", q.optionE);
                formData.append("correctOption", q.correctOption);
                formData.append("marks", q.marks);
                formData.append("examId", q.exam.examId);

                if (q.photo) {
                    console.log("Appending Photo:", q.photo);
                    formData.append("photo", q.photo);
                } else {
                    console.warn("No photo found for:", q);
                }

                await addQuestion(formData);
            }

            setQuestions([
                { 
                    questionName: "", optionA: "", optionB: "", optionC: "", optionD: "", optionE: "", 
                    correctOption: "", marks: "", exam: { examId }, photo: null, preview: null 
                }
            ]);

            setSuccess("Question added successfully!");
            setTimeout(() => setSuccess(""), 3000);

        } catch (error) {
            setError("Failed to add Question. Please try again.");
            setTimeout(() => setError(""), 3000);
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <h1>Add Questions for Exam ID: {examId}</h1>
            {questions.map((q, index) => (
                <div key={index}>
                    <input type="text" name="questionName" placeholder="Question" value={q.questionName} onChange={(e) => handleInputChange(index, e)} />
                    <input type="text" name="optionA" placeholder="Option A" value={q.optionA} onChange={(e) => handleInputChange(index, e)} />
                    <input type="text" name="optionB" placeholder="Option B" value={q.optionB} onChange={(e) => handleInputChange(index, e)} />
                    <input type="text" name="optionC" placeholder="Option C" value={q.optionC} onChange={(e) => handleInputChange(index, e)} />
                    <input type="text" name="optionD" placeholder="Option D" value={q.optionD} onChange={(e) => handleInputChange(index, e)} />
                    <input type="text" name="optionE" placeholder="Option E" value={q.optionE} onChange={(e) => handleInputChange(index, e)} />
                    <input type="text" name="correctOption" placeholder="Correct Option" value={q.correctOption} onChange={(e) => handleInputChange(index, e)} />
                    <input type="text" name="marks" placeholder="Marks" value={q.marks} onChange={(e) => handleInputChange(index, e)} />

                    {/* File Input */}
                    <input type="file" accept="image/*" onChange={(e) => handlePhotoChange(index, e)} />

                    {/* Image Preview */}
                    {q.preview && (
                        <div>
                            <p>Preview:</p>
                            <img src={q.preview} alt="Preview" style={{ width: "100px", height: "100px", objectFit: "cover" }} />
                        </div>
                    )}

                    {/* Remove Question Button */}
                    <button type="button" onClick={() => removeQuestionField(index)}>Remove Question</button>
                </div>
            ))}
            
            <button type="button" onClick={addQuestionField}>Add Another Question</button>
            <button type="button" onClick={handleSubmit}>Submit Questions</button>

            {success && <div className="popup success"><p>{success}</p></div>}
            {error && <div className="popup error"><p>{error}</p></div>}
        </div>
    );
};