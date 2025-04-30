import { useState, useEffect, useRef } from "react";
import ReactConfetti from "react-confetti";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import questions from "../data/questions";
import alarmSound from "../assets/alarm.wav";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showScore, setShowScore] = useState(false);
  const [isConfettiVisible, setIsConfettiVisible] = useState(false);
  const [timer, setTimer] = useState(30);
  const [isWaiting, setIsWaiting] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);

  const [windowDimension, setWindowDimension] = useState({ width: window.innerWidth, height: window.innerHeight });
  
  useEffect(() => {
    const handleResize = () => {
      setWindowDimension({ width: window.innerWidth, height: window.innerHeight });
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const alarm = new Audio(alarmSound);
  alarm.volume = 0.5;

  useEffect(() => {
    let interval = null;
    if (!showScore && !isWaiting) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            handleTimeUp(); 
            return 0; 
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentQuestion, showScore, isWaiting]);
  
  const handleTimeUp = () => {
    if (hasAnswered) return; 
  
    setIsWaiting(true);
    setHasAnswered(true); 
    setTimer(0);
    alarm.play();
  
    
    setTimeout(() => {
      alarm.pause();
      alarm.currentTime = 0;
      setIsWaiting(false);
      
      
      const nextQuestionIndex = currentQuestion + 1;
      
      if (nextQuestionIndex < questions.length) {
        setCurrentQuestion(nextQuestionIndex);
        setSelectedOption(null);
        setTimer(30);
        setHasAnswered(false); 
      } else {
       
        setShowScore(true);
      }
    }, 7000);
  };
  
  const handleOptionClick = (option) => {
    if (!isWaiting && !hasAnswered) {
      setSelectedOption(option);
      setHasAnswered(true); 
    }
  };
  
  const handleNextQuestion = () => {
    const isCorrect = selectedOption === questions[currentQuestion].answer;
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
  
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setSelectedOption(null);
      setTimer(30);
      setHasAnswered(false); 
    } else {
      const finalScore = isCorrect ? score + 1 : score;
      if (finalScore === questions.length) {
        setIsConfettiVisible(true);
      }
      setShowScore(true);
    }
  };
  
  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption(null);
    setShowScore(false);
    setIsConfettiVisible(false);
    setTimer(30);
    setIsWaiting(false);
    setHasAnswered(false);
  };

  const shareMessage = `🎉 I scored ${score} out of ${questions.length} in this awesome Quiz App! Try it yourself!`;
  const shareUrl = "https://your-quiz-app-link.com";

  
  const timerPercentage = (timer / 30) * 100;
  const timerColor = timer > 10 ? "#10B981" : timer > 5 ? "#F59E0B" : "#EF4444";
  const circleSize = 80;
  const strokeWidth = 8;
  const radius = (circleSize - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const dashoffset = circumference - (timerPercentage / 100) * circumference;

  return (
    <div className="max-w-xl mx-auto mt-8 p-6">
     
      <div className="flex justify-between items-center mb-6">
        <div className="bg-gray-800 dark:bg-white text-white dark:text-gray-800 px-4 py-2 rounded-lg shadow-md">
          <span className="font-bold">Question: </span>
          <span>{currentQuestion + 1}/{questions.length}</span>
        </div>
        
        <div className="bg-gray-800 dark:bg-white text-white dark:text-gray-800 px-4 py-2 rounded-lg shadow-md">
          <span className="font-bold">Score: </span>
          <span>{score}</span>
        </div>
      </div>

      
      <div className="flex justify-center mb-6">
        <div className="relative w-20 h-20">
          <svg className="w-full h-full" viewBox={`0 0 ${circleSize} ${circleSize}`}>
           
            <circle
              cx={circleSize / 2}
              cy={circleSize / 2}
              r={radius}
              strokeWidth={strokeWidth}
              stroke="#374151"
              fill="none"
              className="opacity-25"
            />
            
            <circle
              cx={circleSize / 2}
              cy={circleSize / 2}
              r={radius}
              strokeWidth={strokeWidth}
              stroke={timerColor}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashoffset}
              transform={`rotate(-90 ${circleSize / 2} ${circleSize / 2})`}
              className="transition-all duration-1000 ease-linear"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-white dark:text-gray-800">
              {timer}
            </span>
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-gray-800 dark:bg-white rounded-2xl shadow-xl transition-all duration-300 p-8 transform hover:scale-[1.01] relative z-10">
        {isConfettiVisible && (
          <div className="fixed inset-0 z-50 pointer-events-none">
            <ReactConfetti
              width={windowDimension.width}
              height={windowDimension.height}
              recycle={false}
              numberOfPieces={500}
            />
          </div>
        )}

        {showScore ? (
          <div className="text-center text-white dark:text-gray-800">
            <h2 className="text-3xl font-bold mb-6">Quiz Completed!</h2>
            
            <div className="mb-8 p-6 bg-gray-700 dark:bg-gray-100 rounded-xl shadow-inner">
              <div className="text-xl mb-2">Your score:</div>
              <div className="text-4xl font-bold mb-3">{score} / {questions.length}</div>
              <div className="text-sm text-gray-300 dark:text-gray-500">
                {Math.round((score / questions.length) * 100)}% correct
              </div>
            </div>
            
            {score === questions.length && (
              <div className="p-4 mb-6 bg-green-500 bg-opacity-20 dark:bg-green-50 border-l-4 border-green-500 rounded">
                <p className="text-green-400 dark:text-green-500 font-medium">
                  Perfect! All answers were correct! 🎉
                </p>
              </div>
            )}
            
            <h3 className="text-lg font-medium mb-4">Share your results:</h3>
            <div className="flex justify-center gap-4 mb-8">
              <FacebookShareButton url={shareUrl} quote={shareMessage} className="transform transition hover:scale-110">
                <FacebookIcon size={50} round />
              </FacebookShareButton>
              <TwitterShareButton url={shareUrl} title={shareMessage} className="transform transition hover:scale-110">
                <TwitterIcon size={50} round />
              </TwitterShareButton>
              <WhatsappShareButton url={shareUrl} title={shareMessage} separator=":: " className="transform transition hover:scale-110">
                <WhatsappIcon size={50} round />
              </WhatsappShareButton>
            </div>

            <button
              onClick={restartQuiz}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Play Again
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-8">
              <div className="mb-1 text-sm font-medium text-gray-400 dark:text-gray-500">
                Question {currentQuestion + 1}
              </div>
              <h2 className="text-2xl font-bold mb-4 text-white dark:text-gray-800 leading-tight">
                {questions[currentQuestion].question}
              </h2>
            </div>

            {isWaiting && (
              <div className="p-4 mb-6 bg-red-500 bg-opacity-20 dark:bg-red-50 border-l-4 border-red-500 rounded animate-pulse">
                <p className="text-red-400 dark:text-red-500 font-medium">
                  ⏳ Time's up! Moving to the next question...
                </p>
              </div>
            )}

            <div className="grid gap-3 mb-6">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  disabled={isWaiting || hasAnswered}
                  className={`
                    px-6 py-4 rounded-lg font-medium text-left transition-all duration-200
                    ${selectedOption === option 
                      ? "bg-blue-600 text-white shadow-md transform scale-[1.02]" 
                      : "bg-gray-700 dark:bg-gray-100 text-white dark:text-gray-800 hover:bg-gray-600 dark:hover:bg-gray-200"
                    }
                    ${(isWaiting || (hasAnswered && !selectedOption)) 
                      ? "opacity-60 cursor-not-allowed" 
                      : "hover:shadow-lg"
                    }
                  `}
                >
                  <div className="flex items-center">
                    <div className={`
                      w-8 h-8 rounded-full mr-3 flex items-center justify-center text-sm font-bold 
                      ${selectedOption === option 
                        ? "bg-white text-blue-600" 
                        : "bg-gray-800 dark:bg-white text-white dark:text-gray-800"
                      }
                    `}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {selectedOption && !isWaiting && (
              <div className="flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                >
                  {currentQuestion + 1 === questions.length ? "Finish Quiz" : "Next Question"} 
                  <span className="ml-2">→</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Progress Bar */}
        <div className="mt-8">
          <div className="w-full bg-gray-700 dark:bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className={`h-2 transition-all duration-700 ${
                isWaiting ? "bg-red-500" : "bg-blue-600 dark:bg-blue-500"
              }`}
              style={{
                width: `${showScore ? 100 : ((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            ></div>
          </div>
          <div className="mt-2 text-xs text-gray-400 dark:text-gray-500 text-right">
            Progress: {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
          </div>
        </div>
      </div>
    </div>
  );
}