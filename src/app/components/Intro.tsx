import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

interface IntroProps {
  setIntro: (isIntro: boolean) => void
}

const Intro = ({ setIntro }: IntroProps) => {

  const [animationOver, setAnimationOver] = useState(false)
  const [animationDelay, setAnimationDelay] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setAnimationOver(true), 2000);
    const t2 = setTimeout(() => setAnimationDelay(true), 3000);
    const t3 = setTimeout(() => setIntro(false), 5000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className={`h-screen w-screen flex items-center justify-center ${animationOver ? 'bg-[#121212]' : 'bg-purple-500'} transition-all duration-800 `} >
      <motion.div
        className="text-4xl flex items-center gap-2 max-[430px]:text-2xl"
        initial={{ opacity: 0, y: 0 }}
        animate={{
          opacity: 1,
          y: animationDelay ? "-45vh" : 0,
        }}
        transition={{ duration: 0.8 }}
      >
        <span className="font-thin font-[montserrat]">Don't Touch</span>
        <span className="text-purple-500 font-[pacifico]">PURPLE</span>
      </motion.div>
    </div>
  );
};
export default Intro;