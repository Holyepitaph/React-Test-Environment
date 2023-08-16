import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Ticker({ items }){
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [items]);

  return (
    <div className="ticker">
      <AnimatePresence >
        <motion.div
          key={currentIndex}
          className="ticker-item"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
        >
          {items[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
