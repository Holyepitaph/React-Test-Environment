'use client'
import { useState, useEffect } from "react";
import React from "react";
import { useAnimate, stagger, motion } from "framer-motion";
import TickerCarousel from "./testA";

export default function Main() {
  const [isClick, toggleClick] = React.useState(false);
  const toggleClickMenu = () => {
    toggleClick(!isClick);
  };
  const subMenuAnimate = {
    enter: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.5
      },
      display: "block"
    },
    exit: {
      opacity: 0,
      rotateX: -15,
      transition: {
        duration: 0.5,
        delay: 0.3
      },
      transitionEnd: {
        display: "none"
      }
    }
  };
return(
    <div>
     <div
           onClick={toggleClickMenu}
     >Menu</div>
     <motion.div className="" id="test"              
               initial="exit"
              animate={isClick ? "enter" : "exit"}
              variants={subMenuAnimate}>
       <div>Item A</div>
       <div>Item B</div>
       <div>Item C</div>
       <div>Item D</div>
     </motion.div>
    </div>
)
}