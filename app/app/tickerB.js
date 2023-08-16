import React, { useEffect, useState} from "react";
import { motion, stagger, useAnimate  } from "framer-motion";

const TickerCarousel = () => {
  const [scope, animate] = useAnimate()
const a = '200%';
const c = "-300%";
const test = "infinite"
const marqueeVariantsA = {
  animate: {
    x: ["0%","-100%", "-200%"],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 10,
        ease: "linear",
        time:[0,.5,1]
      },
    },
  },
};

const marqueeVariantsB = {
  animate: {
    x: ["0%","-100%", "-200%"],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 10,
        ease: "linear",
        time:[0,.5,1]
      },
    },
  },
};

  return (
    <div className="flex mx-0 h-full w-1/2 overflow-x-hidden" ref={scope}>
      <motion.div  className="h-36 bg-white flex gap-6 text-black text-2xl w-auto"           
          variants={marqueeVariantsA}
          animate="animate"
          id="test">
        <span>Item Aasdfasdfasdfasdfas</span>
        <span>Item Basdffffffffffffffffff</span>
        <span>Item Caaaaaaaaaaaaaaaaaaaaaaaa</span>
        <span>Item Daaaaaaaaaaaaaaaaaaaaaaaaaaa</span>
        <span>Item Eeeeeeeeeeeeeeeeeeeeeee</span>
        <span>Item Frrrrrrrrrrrrrrrrrrrrrrrr</span>
        <span>Item Gffffffffffffffffffffffffffffff</span>
      </motion.div>
      <motion.div className="h-36 bg-white flex gap-6 text-red-300 text-2xl w-auto"           
          variants={marqueeVariantsB}
          animate="animate"
          id="test">
        <span>Item Aasdfasdfasdfasdfas</span>
        <span>Item Basdffffffffffffffffff</span>
        <span>Item Caaaaaaaaaaaaaaaaaaaaaaaa</span>
        <span>Item Daaaaaaaaaaaaaaaaaaaaaaaaaaa</span>
        <span>Item Eeeeeeeeeeeeeeeeeeeeeee</span>
        <span>Item Frrrrrrrrrrrrrrrrrrrrrrrr</span>
        <span>Item Gffffffffffffffffffffffffffffff</span>
      </motion.div>
    </div>
  );
};

export default TickerCarousel;
