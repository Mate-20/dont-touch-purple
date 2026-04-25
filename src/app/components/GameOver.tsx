import { useEffect, useState } from "react";

interface GameOverProps {
    score: number;
    setGameOver: (gameOver: "All Colors Filled" | "Touched Purple" | "") => void;
    gameOver: "All Colors Filled" | "Touched Purple" | "";
}

const GameOver = ({ score, setGameOver, gameOver }: GameOverProps) => {
    return (
        <div className="flex items-center justify-center w-screen h-screen relative">
            <div className="w-screen h-screen bg-black/50 absolute top-0 left-0 -z-10"></div>
            <div className="w-[min(92vw,340px)] rounded-2xl border border-white/10 bg-[#121212] p-5 shadow-2xl" style={{ boxShadow: `1px 0px 15px #7C3AED` }}>
                <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                        <div className="text-xs font-medium tracking-[0.22em] text-white/60">
                            GAME OVER
                        </div>
                        <div className="mt-1 text-2xl font-semibold leading-tight">
                            {gameOver == "All Colors Filled" ? "Aww, All blocks got filled" : "Told You"}
                        </div>
                        {gameOver == "Touched Purple" && <div className="text-2xl flex items-center gap-2">
                            <span className="font-thin font-[montserrat]">Don't Touch</span>
                            <span className="text-purple-500 font-[pacifico]">PURPLE</span>
                        </div>}
                    </div>
                </div>

                <div className="mt-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <div className="text-xs text-white/60">Final score</div>
                    <div className="mt-0.5 text-3xl font-bold tabular-nums leading-none">
                        {score}
                    </div>
                </div>

                <button className="w-full mt-4 text-sm text-white/60 rounded-lg border border-gray p-1 cursor-pointer"
                 onClick={() => setGameOver("")}>
                    Play Again
                </button>
            </div>
        </div>
    );
};

export default GameOver;