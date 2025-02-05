// verison 1 - only division
// import React, { useState, useEffect } from "react";

// const App = (props) => {
//   const [showAnswer, setShowAnswer] = useState(false);
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState(0);

//   useEffect(() => {
//     const generatedQuestions = [];
//     for (let t = 2; t <= 20; t++) {
//       for (let i = 1; i <= 10; i++) {
//         generatedQuestions.push({ table: t, index: i });
//       }
//     }
//     setQuestions(shuffleArray(generatedQuestions));
//   }, []);

//   const shuffleArray = (array) => {
//     return array.sort(() => Math.random() - 0.5);
//   };

//   const handleNext = () => {
//     if (!showAnswer) {
//       setShowAnswer(true);
//     } else {
//       setShowAnswer(false);
//       if (currentQuestion < questions.length - 1) {
//         setCurrentQuestion((prev) => prev + 1);
//       } else {
//         setCurrentQuestion(0);
//       }
//     }
//   };

//   return (
//     <div
//       {...props}
//       style={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         minHeight: "100vh",
//         textAlign: "center",
//       }}
//     >
//       {questions.length > 0 && (
//         <div>
//           {/* <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
//             Multiplication Table
//           </h1> */}
//           <div
//             style={{
//               display: "flex",
//               marginLeft: "30px",
//             }}
//           >
//             <div
//               style={{
//                 display: "inline-block",
//                 textAlign: "center",
//                 fontSize: "24px",
//               }}
//             >
//               <div>
//                 {questions[currentQuestion].table *
//                   questions[currentQuestion].index}
//               </div>
//               <div
//                 style={{
//                   borderBottom: "2px solid black",
//                   width: "50px",
//                   margin: "4px auto",
//                 }}
//               ></div>
//               <div>{questions[currentQuestion].table}</div>
//             </div>

//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 paddingLeft: "40px",
//                 fontSize: "20px",
//               }}
//             >
//               {showAnswer ? questions[currentQuestion].index : "   "}{" "}
//             </div>
//           </div>

//           <button
//             onClick={handleNext}
//             style={{
//               marginTop: "450px",
//               height: "50px",
//               width: "130px",
//               padding: "10px 16px",
//               backgroundColor: "black",
//               color: "white",
//               borderRadius: "4px",
//               border: "none",
//               cursor: "pointer",
//             }}
//           >
//             {showAnswer ? "Next" : "Show Answer"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;

/* <p style={{ fontSize: "18px", marginTop: "16px" }}>
    {`${
        questions[currentQuestion].table *
        questions[currentQuestion].index
        } ÷ ${questions[currentQuestion].table} = ${
        showAnswer ? questions[currentQuestion].index : "?"
    }`}
</p> */

// Version 2 - everything

import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

const App = (props) => {
  const [mode, setMode] = useState(null);
  const [selectedTables, setSelectedTables] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (mode && (mode === "multiplication" || mode === "division")) {
      generateQuestions(mode);
    } else if (mode && (mode === "addition" || mode === "subtraction")) {
      generateQuestions(mode);
    }
  }, [mode, selectedTables]);

  const toggleTableSelection = (table) => {
    setSelectedTables((prev) =>
      prev.includes(table) ? prev.filter((t) => t !== table) : [...prev, table]
    );
  };

  const generateQuestions = (selectedMode) => {
    let generatedQuestions = [];

    if (selectedMode === "multiplication") {
      selectedTables.forEach((t) => {
        for (let i = 1; i <= 10; i++) {
          generatedQuestions.push({ type: "multiplication", x: t, y: i });
        }
      });
    } else if (selectedMode === "division") {
      selectedTables.forEach((t) => {
        for (let i = 1; i <= 10; i++) {
          generatedQuestions.push({
            type: "division",
            dividend: t * i,
            divisor: t,
          });
        }
      });
    } else if (selectedMode === "addition") {
      for (let i = 0; i < 20; i++) {
        const num1 = Math.floor(Math.random() * 9) + 1;
        const num2 = Math.floor(Math.random() * 9) + 1;
        generatedQuestions.push({ type: "addition", num1, num2 });
      }
    } else if (selectedMode === "subtraction") {
      for (let i = 0; i < 20; i++) {
        let num1 = Math.floor(Math.random() * 9) + 1;
        let num2 = Math.floor(Math.random() * 9) + 1;
        if (num1 < num2) [num1, num2] = [num2, num1];
        generatedQuestions.push({ type: "subtraction", num1, num2 });
      }
    }

    setQuestions(generatedQuestions.sort(() => Math.random() - 0.5));
    setCurrentQuestion(0);
    setCompleted(false);
    setShowAnswer(false);
  };

  const renderQuestion = () => {
    const question = questions[currentQuestion];
    if (!question) return null;

    switch (question.type) {
      case "multiplication":
        return `${question.x} × ${question.y}  ${
          showAnswer ? question.x * question.y : " "
        }`;
      case "division":
        return (
          <div
            style={{
              display: "flex",
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
              <div>{question.dividend}</div>
              <div
                style={{
                  borderBottom: "2px solid black",
                  width: "50px",
                  margin: "4px auto",
                }}
              ></div>
              <div>{question.divisor}</div>
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
              {showAnswer ? question.dividend / question.divisor : "   "}
            </div>
          </div>
        );
      // return `${question.dividend} ÷ ${question.divisor} = ${showAnswer ? question.dividend / question.divisor : '?'}`;
      case "addition":
        return (
          <div
            style={{ textAlign: "center", fontSize: "24px", display: "flex" }}
          >
            <div>
              {question.num1} + {question.num2}
            </div>
            <div style={{ marginLeft: "60px" }}>
              {showAnswer ? question.num1 + question.num2 : " "}
            </div>
          </div>
        );
      case "subtraction":
        return (
          <div
            style={{ textAlign: "center", fontSize: "24px", display: "flex" }}
          >
            <div>
              {question.num1} - {question.num2}
            </div>
            <div style={{ marginLeft: "60px" }}>
              {showAnswer ? question.num1 - question.num2 : " "}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (showAnswer) {
      if (currentQuestion + 1 >= questions.length) {
        setCompleted(true);
      } else {
        setCurrentQuestion((prev) => prev + 1);
      }
    }
    setShowAnswer(!showAnswer);
  };

  return (
    <div
      {...props}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        padding: "24px",
        backgroundColor: "#f0f2f5",
      }}
    >
      {completed && <Confetti />}

      {!mode ? (
        <div style={{ maxWidth: 600, width: "100%" }}>
          <h1 style={{ color: "#1a73e8", marginBottom: 32 }}>Math Practice</h1>

          {mode === null && (
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ marginBottom: 16 }}>Select Tables (for × and ÷)</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {Array.from({ length: 19 }, (_, i) => i + 2).map((num) => (
                  <button
                    key={num}
                    onClick={() => toggleTableSelection(num)}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: selectedTables.includes(num)
                        ? "#1a73e8"
                        : "#e8f0fe",
                      color: selectedTables.includes(num) ? "white" : "#1a73e8",
                      border: "none",
                      borderRadius: 20,
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 16,
            }}
          >
            {["multiplication", "division", "addition", "subtraction"].map(
              (operation) => (
                <button
                  key={operation}
                  onClick={() => setMode(operation)}
                  disabled={
                    ["multiplication", "division"].includes(operation) &&
                    selectedTables.length === 0
                  }
                  style={{
                    padding: 24,
                    backgroundColor: "#ffffff",
                    border: "2px solid #e0e0e0",
                    borderRadius: 12,
                    cursor:
                      ["multiplication", "division"].includes(operation) &&
                      selectedTables.length === 0
                        ? "not-allowed"
                        : "pointer",
                    opacity:
                      ["multiplication", "division"].includes(operation) &&
                      selectedTables.length === 0
                        ? 0.5
                        : 1,
                    transition: "all 0.2s",
                    ":hover": {
                      boxShadow:
                        ["multiplication", "division"].includes(operation) &&
                        selectedTables.length === 0
                          ? "none"
                          : "0 2px 8px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  <span
                    style={{
                      fontSize: 24,
                      fontWeight: "bold",
                      color: "#1a73e8",
                      textTransform: "capitalize",
                    }}
                  >
                    {operation}
                  </span>
                  {["multiplication", "division"].includes(operation) &&
                    selectedTables.length === 0 && (
                      <div
                        style={{ fontSize: 12, color: "#5f6368", marginTop: 8 }}
                      >
                        Select tables first
                      </div>
                    )}
                </button>
              )
            )}
          </div>
        </div>
      ) : questions.length > 0 && !completed ? (
        <div
          style={{
            // background: "white",
            // padding: 40,
            // borderRadius: 16,
            // boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            textAlign: "center",
          }}
        >
          {/* <h1 style={{ color: '#1a73e8', marginBottom: 24 }}>
            {mode.toUpperCase()} PRACTICE
          </h1> */}

          <div style={{ fontSize: 48, fontWeight: "bold", marginBottom: 32 }}>
            {renderQuestion()}
          </div>

          <button
            onClick={handleNext}
            style={{
              marginTop: "450px",
              height: "50px",
              width: "150px",
              padding: "12px 24px",
              backgroundColor: "black",
              color: "white",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
              transition: "all 0.2s",
              ":hover": {
                backgroundColor: "#1557b0",
              },
            }}
          >
            {showAnswer
              ? currentQuestion + 1 >= questions.length
                ? "Finish"
                : "Next"
              : "Show Answer"}
          </button>
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h1 style={{ color: "#1a73e8", marginBottom: 24 }}>
            🎉 Congratulations!
          </h1>
          <button
            onClick={() => {
              setMode(null);
              setSelectedTables([]);
            }}
            style={{
              padding: "12px 24px",
              backgroundColor: "#1a73e8",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Start Over
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
