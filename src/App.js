import React, { useState, useEffect } from "react";

const App = (props) => {
  // const [table, setTable] = useState(2);
  // const [index, setIndex] = useState(1);
  const [showAnswer, setShowAnswer] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    const generatedQuestions = [];
    for (let t = 2; t <= 20; t++) {
      for (let i = 1; i <= 10; i++) {
        generatedQuestions.push({ table: t, index: i });
      }
    }
    setQuestions(shuffleArray(generatedQuestions));
  }, []);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleNext = () => {
    if (!showAnswer) {
      setShowAnswer(true);
    } else {
      setShowAnswer(false);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        setCurrentQuestion(0);
      }
    }
  };

  return (
    <div
      {...props}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      {questions.length > 0 && (
        <div>
          {/* <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
            Multiplication Table
          </h1> */}
          <div
            style={{
              display: "flex",
              // justifyContent: "center",
              marginLeft: "30px",
            }}
          >
            <div
              style={{
                display: "inline-block",
                textAlign: "center",
                fontSize: "24px",
              }}
            >
              <div>
                {questions[currentQuestion].table *
                  questions[currentQuestion].index}
              </div>
              <div
                style={{
                  borderBottom: "2px solid black",
                  width: "50px",
                  margin: "4px auto",
                }}
              ></div>
              <div>{questions[currentQuestion].table}</div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: "40px",
                fontSize: "20px",
              }}
            >
              {showAnswer ? questions[currentQuestion].index : "   "}{" "}
            </div>
          </div>
          {/* <p style={{ fontSize: "18px", marginTop: "16px" }}>
            {`${
              questions[currentQuestion].table *
              questions[currentQuestion].index
            } ÷ ${questions[currentQuestion].table} = ${
              showAnswer ? questions[currentQuestion].index : "?"
            }`}
          </p> */}
          <button
            onClick={handleNext}
            style={{
              marginTop: "500px",
              height: "50px",
              width: "130px",
              padding: "10px 16px",
              backgroundColor: "black",
              color: "white",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
            }}
          >
            {showAnswer ? "Next" : "Show Answer"}
          </button>
        </div>
      )}
    </div>
  );
};

export default App;

// style={{
//   display: "flex",
//   "flex-direction": "column",
//   "align-items": "center",
// }}

// style={{ height: "70px", width: "170px" }}
