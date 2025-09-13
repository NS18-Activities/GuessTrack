import React, { useState } from "react";

export default function Guess_Track() {
  const data = [
    {
      clues: ["Experiences", "Aesthetics", "Responsiveness", "Components", "Interfaces"],
      answer: "Front-End"
    },
    {
      clues: ["Architecture", "Communication", "Permissions", "Endpoints", "Servers"],
      answer: "Back-End"
    },
    {
      clues: ["Imitation", "Patterns", "Learning", "Prediction", "Neural"],
      answer: "Artificial Intelligence"
    },
    {
      clues: ["Guardian", "Exploits", "Defense", "Firewalls", "Protection"],
      answer: "Cybersecurity"
    },
    {
      clues: ["Automation", "Pipelines", "Infrastructure", "Containers", "Deployment"],
      answer: "DevOps"
    },
    {
      clues: ["Insights", "Decisions", "Correlations", "Models", "Analytics"],
      answer: "Data Science"
    },
    {
      clues: ["Portable", "Optimization", "Touch", "Cross-Platform", "Apps"],
      answer: "Mobile Development"
    },
    {
      clues: ["Knowledge", "Storage", "Consistency", "Queries", "Schemas"],
      answer: "Database Engineering"
    },
    {
      clues: ["Puzzles", "Elegance", "Contests", "Algorithms", "Challenges"],
      answer: "Competitive Programming"
    },
    {
      clues: ["Planning", "Needs", "Requirements", "Diagrams", "Workflows"],
      answer: "System Analysis and Design"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [shownClues, setShownClues] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showFinishMessage, setShowFinishMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const currentQuestion = data[currentIndex];

  const handleNextClue = () => {
    if (shownClues < currentQuestion.clues.length) {
      setShownClues(shownClues + 1);
    }
  };

  const handleShowAnswer = () => {
    setLoading(true);
    setTimeout(() => {
      setShowAnswer(true);
      setLoading(false);
    }, 3000);
  };

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShownClues(0);
      setShowAnswer(false);
    } else {
      setShowFinishMessage(true);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setShownClues(0);
    setShowAnswer(false);
    setShowFinishMessage(false);
  };

  return (
    <div className="flex flex-col md:grid md:grid-cols-2 h-screen  font-serif p-4 md:p-6">
      <style>
        {`
          @keyframes fadeInScale {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes glowPulse {
            0% { box-shadow: 0 0 5px #700608, 0 0 10px #a10407ff, 0 0 15px #9e1719ff; }
            50% { box-shadow: 0 0 10px #700608, 0 0 10px #a10407ff, 0 0 15px #9e1719ff; }
            100% { box-shadow: 0 0 5px #700608, 0 0 10px #a10407ff, 0 0 15px #9e1719ff; }
          }
          .animate-fadeInScale {
            animation: fadeInScale 0.5s ease-out forwards;
          }
          .animate-glowPulse {
            animation: glowPulse 2s ease-in-out infinite;
          }
        `}
      </style>

      {/* Quiz content */}
      {!showFinishMessage ? (
        <>
          {/* Left panel with clues */}
          <div className="flex flex-col justify-between border-b-4 md:border-b-0 md:border-r-4 border-[#700608] p-4 md:p-6">
            <div className="flex flex-col gap-4 flex-grow justify-top mb-6">
              <h2 className="text-xl md:text-2xl text-center font-bold mb-4 italic text-[#700608]">The Clues</h2>
              {currentQuestion.clues.slice(0, shownClues).map((clue, index) => (
                <div
                  key={index}
                  className="animate-fadeInScale border-2 border-[#700608] rounded-xl px-4 py-3 text-center md:text-xl shadow-lg transition-all duration-500 ease-in-out"
                >
                  {clue}
                </div>
              ))}
            </div>

            <div className="flex justify-center relative">
              <button
                onClick={handleNextClue}
                disabled={shownClues === currentQuestion.clues.length || showAnswer || loading}
                className="w-48 px-6 py-3 bg-[#700608]  font-bold rounded-xl shadow-lg hover:bg-[#222] text-white border-2 border-[#700608] transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reveal Next Clue
              </button>
            </div>
          </div>

          {/* Right panel with answer and controls */}
          <div className="flex flex-col justify-between items-center p-4 md:p-6 relative">
            <button
              onClick={handleNext}
              className="absolute top-4 md:top-6 right-4 md:right-6 px-4 md:px-6 py-2 bg-[#700608]  font-bold rounded-xl shadow-lg hover:bg-[#222] text-white border-2 border-[#700608] transition-all duration-300 transform hover:scale-105"
            >
              Next Riddle ➡
            </button>

            <div className="flex-grow flex items-center justify-center">
              {showAnswer ? (
                <div className="animate-fadeInScale animate-glowPulse px-6 py-4 md:px-12 md:py-6 bg-[#700608] text-white text-3xl md:text-6xl rounded-2xl shadow-lg text-center transition-opacity duration-500 ease-in-out">
                  {currentQuestion.answer}
                </div>
              ) : loading ? (
                <div className="text-4xl md:text-6xl font-extrabold text-[#700608] animate-fadeInScale">
                  Loading...
                </div>
              ) : (
                <div className="text-6xl md:text-[14rem] font-extrabold text-[#700608]">?</div>
              )}
            </div>

            <div className="flex justify-center w-full relative">
              <button
                onClick={handleShowAnswer}
                disabled={showAnswer || loading}
                className="w-48 px-6 py-3 bg-[#700608]  font-bold rounded-xl shadow-lg hover:bg-[#222] text-white border-2 border-[#700608] transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Show Solution
              </button>
            </div>
          </div>
        </>
      ) : (
        /* Quiz finished message */
        <div className="flex flex-col justify-center items-center col-span-2 text-center p-6 text-amber-50">
          <div className="animate-fadeInScale px-8 py-6 bg-[#700608] text-white text-2xl md:text-4xl rounded-2xl shadow-lg mb-8">
            Congratulations! You've passed your O.W.L.s!
          </div>
          <button
            onClick={handleReset}
            className="w-48 px-6 py-3 bg-[#700608]  font-bold rounded-xl shadow-lg hover:bg-[#222] hover:text-white border-2 border-[#700608] transition-all duration-300 transform hover:scale-105"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}