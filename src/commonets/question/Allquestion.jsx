import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getallquestion } from "../api/Apifunction";
import {
  Container,
  Card,
  Button,
  Form,
  Spinner,
  Image,
  Row,
  Col,
} from "react-bootstrap";

export const Allquestion = () => {
  const { examId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (examId) {
      fetchQuestions();
    }
  }, [examId]);

  const fetchQuestions = async () => {
    try {
      const response = await getallquestion(examId);
      console.log(response);
      setQuestions(response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setLoading(false);
    }
  };

  const handleSelect = (questionId, selectedOption) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const handleReset = (questionId) => {
    setAnswers((prev) => {
      const newAnswers = { ...prev };
      delete newAnswers[questionId];
      return newAnswers;
    });
  };

  const handleSubmit = () => {
    let totalMarks = 0;

    questions.forEach((q) => {
      const selectedAnswer = answers[q.questionId];
      if (selectedAnswer && selectedAnswer === q.correctOption) {
        totalMarks += parseInt(q.marks, 10);
      }
    });

    console.log("Submitted Answers:", answers);
    console.log("Total Marks:", totalMarks);
    alert(`Answers submitted successfully! Total Marks: ${totalMarks}`);
  };

  return (
    <Container className="mt-5 Container ">
      <h2 className="text-center mb-4 main-title">Test</h2>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : questions.length === 0 ? (
        <p className="text-center text-muted">No questions available.</p>
      ) : (
        <Row>
          {questions.map((q) => (
            <Col key={q.questionId} xs={12} md={6} lg={4} className="mb-4">
              <Card className="question-card">
                <Card.Body>
                  <Card.Title className="question-title">{q.questionName}</Card.Title>

                  {q.photo && (
                    <div className="image-container">
                      <Image
                        src={`data:image/jpeg;base64,${q.photo}`}
                        alt="Question"
                        fluid
                        className="question-image"
                      />
                    </div>
                  )}

                  <Form>
                    {["A", "B", "C", "D", "E"].map((opt) => {
                      const optionKey = `option${opt}`; 
                      return (
                        q[optionKey] && (
                          <Form.Check
                            key={optionKey}
                            type="radio"
                            label={`${opt}      ${q[optionKey]}`} 
                            name={`question-${q.questionId}`}
                            value={q[optionKey]}
                            checked={answers[q.questionId] === q[optionKey]}
                            onChange={() => handleSelect(q.questionId, q[optionKey])}
                            className="option-radio"
                          />
                        )
                      );
                    })}
                  </Form>

                  <div className="d-flex justify-content-between mt-3">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="reset-btn"
                      onClick={() => handleReset(q.questionId)}
                    >
                      Reset
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {questions.length > 0 && (
        <div className="text-center mt-4">
          <Button
            onClick={handleSubmit}
            variant="primary"
            size="lg"
            className="submit-btn"
          >
            Submit Answers
          </Button>
        </div>
      )}
    </Container>
  );
};