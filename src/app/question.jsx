"use client";
import { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Heart, X } from "lucide-react";

const questions = [
  "Do you believe everyone should go to therapy?",
  "Would you prefer tea over coffee?",
  "Is pineapple on pizza acceptable?",
  "I feel energized after spending time with a group of people.",
  "I enjoy starting conversations with strangers.",
  "I often speak before I think.",
  "I feel drained after too much alone time.",
  "I like being at the center of attention.",
  "I seek out new acquaintances whenever I can.",
  "I get restless without social plans.",
  //   "I enjoy being part of group activities more than solo ones.",
  //   "I find silence in a room awkward.",
  //   "I am quick to share what I am thinking.",
  //   "I often jump into new social circles with ease.",
];

const getDirection = (x, y) => {
  if (Math.abs(x) > Math.abs(y)) {
    return x > 100 ? "yes" : x < -100 ? "no" : null;
  } else {
    return y > 100 ? "maybe" : null;
  }
};

export default function SwipeQuestions() {
  const [index, setIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const controls = useAnimation();

  const handleAnswer = async (direction) => {
    await controls.start({
      x: direction === "yes" ? 500 : direction === "no" ? -500 : 0,
      y: direction === "maybe" ? 500 : 0,
      opacity: 0,
      transition: { duration: 0.4 },
    });

    if (index + 1 >= questions.length) {
      setCompleted(true);
    } else {
      setIndex((prev) => prev + 1);
      controls.set({ x: 0, y: 0, opacity: 1 });
    }
  };

  const handleDragEnd = async (_, info) => {
    const dir = getDirection(info.offset.x, info.offset.y);
    if (dir) await handleAnswer(dir);
  };

  const progress = ((index + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen w-full bg-[#0c0c0c] flex flex-col items-center justify-center text-[#ff7a00] px-4 font-mono">
      {!completed ? (
        <motion.div
          drag
          dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          animate={controls}
          className="w-full max-w-md border border-[#ff7a00] rounded-2xl p-6 bg-[#1a1a1a]/80 shadow-md"
        >
          <div className="text-sm mb-4 flex justify-between items-center">
            <span className="tracking-wider font-semibold">
              Question {index + 1} of {questions.length}
            </span>
            <div className="w-28 h-1 bg-[#ff7a00]/30 rounded-full">
              <div
                className="h-1 bg-[#ff7a00] rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div
            // drag
            // dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
            // onDragEnd={handleDragEnd}
            // animate={controls}
            className="rounded-xl h-40 bg-[#0c0c0c] text-center text-2xl leading-relaxed font-semibold flex items-center justify-center px-4 select-none shadow-lg border border-[#ff7a00]/40 text-[#ff7a00]"
          >
            {questions[index]}
          </div>

          <div className="flex justify-around mt-6 gap-4">
            <button
              onClick={() => handleAnswer("no")}
              className="flex flex-col items-center px-5 py-3 rounded-xl bg-[#1a1a1a]/60 border border-red-500 hover:bg-red-800/20 transition"
            >
              <X className="text-red-500 w-6 h-6" />
              <span className="mt-1 text-sm text-red-400 font-medium">No</span>
            </button>

            <button
              onClick={() => handleAnswer("maybe")}
              className="flex flex-col items-center px-5 py-3 rounded-xl bg-[#1a1a1a]/60 border border-yellow-500 hover:bg-yellow-800/20 transition"
            >
              <div className="w-6 h-6 rounded-full border-2 border-yellow-500"></div>
              <span className="mt-1 text-sm text-yellow-400 font-medium">
                Maybe
              </span>
            </button>

            <button
              onClick={() => handleAnswer("yes")}
              className="flex flex-col items-center px-5 py-3 rounded-xl bg-[#1a1a1a]/60 border border-green-500 hover:bg-green-800/20 transition"
            >
              <Heart className="text-green-500 w-6 h-6" />
              <span className="mt-1 text-sm text-green-400 font-medium">
                Yes
              </span>
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="w-full max-w-xl text-center space-y-6">
          <h2 className="text-3xl font-bold text-green-400">🎉 You're Done!</h2>
          <p className="text-lg text-white">
            Your emotional style is{" "}
            <span className="text-pink-400 font-semibold">Balanced</span>.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl bg-[#fef08a]/10 border border-yellow-400 p-4 text-left">
              <p className="font-semibold text-yellow-300">✨ The F Soul</p>
              <p className="text-sm text-white mt-1">
                Your unique combination of traits creates a distinctive approach
                to life that defies simple categorization.
              </p>
            </div>
            <div className="rounded-xl bg-[#fecdd3]/10 border border-pink-300 p-4 text-left">
              <p className="font-semibold text-pink-300">
                ✨ The Balanced Heart
              </p>
              <p className="text-sm text-white mt-1">
                You navigate between emotional expression and control with
                fluidity. This emotional intelligence serves you well in varied
                situations.
              </p>
            </div>
            <div className="rounded-xl bg-[#bae6fd]/10 border border-blue-300 p-4 text-left">
              <p className="font-semibold text-blue-300">
                📖 The Wisdom of Uncertainty
              </p>
              <p className="text-sm text-white mt-1">
                You embrace the beauty of not knowing. Like a mystic, you
                understand that the deepest truths often lie in the space
                between certainty and doubt.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
