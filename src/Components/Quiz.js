import React from 'react';
import { useState,useEffect } from 'react';
/**
 * Functional component for a quiz application.
 * Manages state for questions, current question index, score, show score flag, selected option, and correctness flag.
 * Uses useEffect to fetch data asynchronously.
 * Renders a quiz interface with questions, options, and a submit button.
 * @returns JSX element for the quiz application.
 */
const Quiz = () => {
  const[questions,setQuestions]=useState([]);
    const[currentQuestion,setCurrentQuestion]=useState(0)
    const[score,setScore]=useState(0);
    const[showScore,setShowScore]=useState(false);
    const[selectedOption,setSelectedOption]=useState(null);
    const[isCorrect,setIsCorrect]=useState(null); 
    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/questions");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setQuestions(jsonData);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
    const handleAnswer=(selectedOption)=>{
      setSelectedOption(selectedOption);
    const correctAnswer=questions[currentQuestion].answer;
    console.log("Selected Option: ", selectedOption);
    console.log("Correct Answer: ", correctAnswer);
    const isAnswerCorrect=selectedOption===correctAnswer;
    console.log(correctAnswer)
    setIsCorrect(isAnswerCorrect);
    console.log(isAnswerCorrect)
    setScore((prevScore) => prevScore + (isAnswerCorrect ? 1 : 0));


    // console.log(score,"s")
    // setTimeout(() => {
    //   const nextQuestion=currentQuestion+1;
    //   if(nextQuestion<questions.length){
    //     setCurrentQuestion(nextQuestion);
    //     setSelectedOption(null);
    //     setIsCorrect(null);
    //   }
    // }, 1000);
  };
  const handleNext=()=>{
    const nextQuestion=currentQuestion+1;
    if(nextQuestion<questions.length){
      setCurrentQuestion(nextQuestion);
      setSelectedOption(null);
      setIsCorrect(null);
    }
  }
  const handlePrevious=()=>{
    const previous=currentQuestion-1;
    if(previous>=0){
      setCurrentQuestion(previous);
      setSelectedOption(null);
      setIsCorrect(null);
    }
  }
  const handleSubmit =()=>{
    setShowScore(true);
  }
const restartQuiz=()=>{
  setCurrentQuestion(0);
  setScore(0);
  setShowScore(false);
  setSelectedOption(null);
}
const progress=((currentQuestion+1) / questions.length)*100;
if (questions.length === 0) {
  return <div className='w-[700px] m-[100px] bg-black text-white text-center flex flex-col items-center justify-center'>
    <img src='../../public/rudra-running-l2r.gif' alt='boy running'/>Loading questions...</div>;
}
  return (
    <div className='w-[700px] m-[100px] flex items-center flex-col bg-green-300  rounded-[5px] ' style={{border:"1px solid green"}}>
      <div className='w-[500px] p-[20px] mx-0 my-auto bg-white rounded-[5px] '>
        {showScore?(
          <div className='flex items-center flex-col text-center gap-[10px]'>
            <p className='font-semibold text-[22px]'>you scored {score} out of {questions.length}</p>
           
            <button onClick={restartQuiz} className='w-fit px-2 py-4 mb-[6px]  cursor-pointer rounded-[4px] bg-black text-white'> Restart Quiz </button>
          </div>
        ):(
          <>
          <div className='relative pb-[0.6rem] mb-2 shadow-primary capitalize'>
            <h3 className='font-semibold'>Programming Quiz</h3>
            <div  className='absolute left-0 bottom-0 h-[3px] bg-slate-300 mt-[10px] rounded-[8px] 'style={{width:`${progress}%`,backgroundColor:"#01e866"}}></div>
          </div>
          <div>
            <div className='mb-[20px]'>
              <div className='mb-[8px] text-[14px] font-medium text-customred'>
                <span>
                  Question {currentQuestion+1}
                </span>/{questions.length}
              </div>
              <div  className='text-[17px] font-medium'>
               {questions[currentQuestion].question}
              </div>
            </div>
            <div>
              {questions[currentQuestion].options.map((option)=>{
                const isOptionSelected =selectedOption===option;
                const isOptionCorrect=isCorrect===true&&isOptionSelected;
                const isOptionWrong =isCorrect===false &&isOptionSelected;
                return (
                  <button className='block w-full p-2 pl-4 mb-[6px] bg-white border border-black cursor-pointer text-[12px] font-medium text-start rounded-[4px] 'key={option} onClick={() => handleAnswer(option)}
                  style={{border:`1.5px solid ${
                    isOptionCorrect?"#01e866":isOptionWrong?"red":"black"
                  }`,backgroundColor:isOptionCorrect?"#01e866":isOptionWrong?"red":"",color:isOptionCorrect||isOptionWrong?"#fff":"#000" }} disabled={selectedOption !== null}>
                    {option}
                  </button>
                )
              })}
            </div>
            <div className='flex justify-between p-1'>
              {currentQuestion >0&&(<button className='bg-black text-white p-2 rounded-[5px]'onClick={handlePrevious}>Previous</button>)}
            
              {currentQuestion < questions.length - 1 ? (
                  <button className='bg-black text-white p-2 rounded-[5px]' onClick={handleNext}>Next</button>
                ) : (
                  <button className='bg-black text-white p-2 rounded-[5px]' onClick={handleSubmit}>Submit</button>
                )}
                </div>
            
          </div>
          </>
        )}
      </div>
    </div>
  )
};

export default Quiz
