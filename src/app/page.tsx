'use client'
import { motion } from "framer-motion";
import Intro from "./components/Intro";
import EightGrid from "./components/EightGrid";
import { useGame } from "./hooks/useGame";
import GameOver from "./components/GameOver";
import { useEffect, useState } from "react";

export default function Home() {

  const {
    gameScore,
    gridArray,
    handleColorClick,
    isIntroGoingOn,
    setIsIntroGoingOn,
    gameOver,
    startGame,
    setStartGame,
    setGameOver
  } = useGame();


  const [finalScore, setFinalScore] = useState(0);

  useEffect(()=>{
    if(gameScore > 0){
      setFinalScore(gameScore);
    }
  },[gameScore])

  return (
    <>
      {isIntroGoingOn ? <Intro setIntro={setIsIntroGoingOn} /> :
        <div className="bg-[#121212] h-screen w-screen flex flex-col items-center gap-5 p-4 relative">

          {/* Game Over Modal */}
          {gameOver &&
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <GameOver score={finalScore} gameOver={gameOver} setGameOver={setGameOver}/>
          </div>}

          {/* Title */}
          <div className="text-4xl flex items-center gap-2 max-[430px]:text-2xl">
            <span className="font-thin font-[montserrat]">Don't Touch</span>
            <span className="text-purple-500 font-[pacifico]">PURPLE</span>
          </div>

          {/* Game Score and Button */}
          <button
            type="button"
            onClick={() => setStartGame(true)}
            className="text-sm sm:text-base rounded-full border border-[#8caa7c] bg-white/5 px-4 py-2 hover:bg-white/10 transition flex items-center gap-3"
            style={{boxShadow:`1px 0px 5px #8caa7c`}}
          >
            <span className="text-white/80">
              {startGame ? "Playing" : "Start"}
            </span>
            <span className="h-4 w-px bg-white/10" aria-hidden="true" />
            <span className="tabular-nums">
              Score: <span className="font-semibold text-white">{gameScore}</span>
            </span>
          </button>

          {/* Game Grid */}
          <motion.div initial={{ opacity: 0, width: 0}} animate={{ opacity: 1, width: 'fit-content'}} transition={{ duration: 0.5 }}>
            <EightGrid gridArray={gridArray} handleColorClick={handleColorClick} />
          </motion.div>
        </div>}
    </>
  );
}
