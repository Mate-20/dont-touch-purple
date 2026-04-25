// A boolean array of 8 which when true will render a color.
// A score counter
// Array of color pallete

import { useEffect, useRef, useState } from "react";

const GRID_NUMBER = 8;

export type gridType = { value: boolean, color: string }

const COLORS = ["#06B6D4", "#E11D48", "#F59E0B", "#10B981", "#EC4899", "#7C3AED"];
const PURPLE_COLOR = "#7C3AED";

export const useGame = () => {
    const [isIntroGoingOn, setIsIntroGoingOn] = useState(true);
    const [gameOver, setGameOver] = useState<"All Colors Filled" | "Touched Purple" | "">("");
    const [gameScore, setGameScore] = useState(0);
    const [gridArray, setGridArray] = useState<gridType[]>(Array.from({ length: GRID_NUMBER }, () => ({ value: false, color: "#121212" })));
    const [gameSpeed, setGameSpeed] = useState(1000);
    const [startGame, setStartGame] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const purpleTimeoutsRef = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

    const tapSound = new Audio("/blockTap.mp3");
    const gameOverSound = new Audio("/gameOver.mp3");

    useEffect(()=>{
        if(gameScore > 20){
            setGameSpeed(400);
        } else if(gameScore > 10){
            setGameSpeed(700);
        } 
    },[gameScore])
    
    useEffect(() => {
        // Always clear any previous interval before starting a new one
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        // Clear any pending purple removals
        for (const t of purpleTimeoutsRef.current.values()) clearTimeout(t);
        purpleTimeoutsRef.current.clear();

        if (!startGame || gameOver) {
            let array = Array.from({ length: GRID_NUMBER }, () => ({ value: false, color: "#121212" }))
            setGridArray(array);
            return;
        }
        intervalRef.current = setInterval(() => {
            // Use the freshest grid state
            setGridArray(prev => {
                const emptyIndices: number[] = [];
                for (let i = 0; i < prev.length; i++) {
                    if (!prev[i].value) emptyIndices.push(i);
                }
                // If all indices are filled, end the game and stop spawning
                if (emptyIndices.length === 0) {
                    handleGameOver("All Colors Filled");
                    return prev;
                }
                const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
                const randomIndex =
                    emptyIndices[Math.floor(Math.random() * emptyIndices.length)];

                // If purple spawns, remove it after 2 seconds (unless user already removed it)
                if (randomColor === PURPLE_COLOR) {
                    const existing = purpleTimeoutsRef.current.get(randomIndex);
                    if (existing) clearTimeout(existing);

                    const timeoutId = setTimeout(() => {
                        setGridArray(curr =>
                            curr.map((cell, idx) =>
                                idx === randomIndex && cell.value && cell.color === PURPLE_COLOR
                                    ? { value: false, color: "#121212" }
                                    : cell
                            )
                        );
                        purpleTimeoutsRef.current.delete(randomIndex);
                    }, 2000);

                    purpleTimeoutsRef.current.set(randomIndex, timeoutId);
                }

                return prev.map((item, index) =>
                    index === randomIndex ? { value: true, color: randomColor } : item
                );
            });
        }, gameSpeed);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            for (const t of purpleTimeoutsRef.current.values()) clearTimeout(t);
            purpleTimeoutsRef.current.clear();
        };
    }, [startGame, gameOver, gameSpeed]);
    const removeColor = (index: number) => {
        setGridArray(prev => prev.map((item, key) => key === index ? { value: false, color: "#121212" } : item));
    }

    const handleColorClick = (index: number) => {
        if (gridArray[index].value && gridArray[index].color === PURPLE_COLOR) {
            handleGameOver("Touched Purple");
        } else if (gridArray[index].value) {
            tapSound.play();
            setGameScore(s => s + 1);

        }
        removeColor(index);
    }

    const handleGameOver = (gameOverMessage : "All Colors Filled" | "Touched Purple" | "") => {
        gameOverSound.play();
        setGameScore(0);
        setGameOver(gameOverMessage);
        setStartGame(false);
    }

    return { gridArray, handleColorClick, gameScore, isIntroGoingOn, setIsIntroGoingOn, gameOver, startGame, setStartGame, setGameOver };
}
