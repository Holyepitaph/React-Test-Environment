// Interactive Marquee concept made with Framer-Motion for 14islands blog post

import "wipe.css";
import "./styles.css";

import { useState, useRef, useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import FontFaceObserver from "fontfaceobserver";
import normalizeWheel from "normalize-wheel";
import { useRafLoop } from "react-use";
import { useWindowSize } from "@react-hook/window-size";

const _ = {
  content: "Around the world, around the world.",
  speed: 2,
  threshold: 0.014,
  wheelFactor: 1.5,
  dragFactor: 1.1
};

const MarqueeItem = ({ content, speed }) => {
  const item = useRef(null);
  const rect = useRef({});
  const x = useRef(0);

  const [width, height] = useWindowSize();

  const setX = () => {
    if (!item.current || !rect.current) return;
    const xPercentage = (x.current / rect.current.width) * 100;
    if (xPercentage < -100) x.current = 0;
    if (xPercentage > 0) x.current = -rect.current.width;
    item.current.style.transform = `translate3d(${xPercentage}%, 0, 0)`;
  };

  useEffect(() => {
    rect.current = item.current.getBoundingClientRect();
  }, [width, height]);

  const loop = () => {
    x.current -= speed.get();
    setX();
  };

  useRafLoop(loop, true);

  return (
    <div className="item" ref={item}>
      {content}
    </div>
  );
};

const InteractiveMarquee = () => {
  const marquee = useRef(null);
  const slowDown = useRef(false);
  const isScrolling = useRef(false);
  const constraintsRef = useRef(null);

  const x = useRef(0);
  const w = useRef(window.innerWidth).current;
  const speed = useSpring(_.speed, {
    damping: 40,
    stiffness: 90,
    mass: 5
  });
  const speed2 = useSpring(_.speed, {
    damping: 40,
    stiffness: 90,
    mass: 5
  });
  const opacity = useTransform(speed, [-w * 0.2, 0, w * 0.2], [1, 0, 1]);
  const skewX = useTransform(speed, [-w * 0.25, 0, w * 0.25], [-25, 0, 25]);

  const onWheel = (e) => {
    const normalized = normalizeWheel(e);
    x.current = normalized.pixelY * _.wheelFactor;

    // Reset speed on scroll end
    window.clearTimeout(isScrolling.current);
    isScrolling.current = setTimeout(function () {
      speed.set(_.speed);
      speed2.set(_.speed);
    }, 30);
  };

  const onPointerDown = () => {
    slowDown.current = true;
    marquee.current.classList.add("drag");
    speed.set(0);
    speed2.set(0);
  };

  const onDrag = (e, info) => {
    speed.set(_.dragFactor * -info.delta.x);
    speed2.set(_.dragFactor * -info.delta.x * 0.9);
  };

  const onPointerUp = (e) => {
    slowDown.current = false;
    marquee.current.classList.remove("drag");
    x.current = _.speed;
  };

  const loop = () => {
    if (slowDown.current || Math.abs(x.current) < _.threshold) return;
    x.current *= 0.7;
    if (x.current < 0) {
      x.current = Math.min(x.current, 0);
    } else {
      x.current = Math.max(x.current, 0);
    }
    speed.set(_.speed + x.current);
    speed2.set(_.speed + x.current * 0.9);
  };

  useRafLoop(loop, true);

  return (
    <>
      <motion.div className="bg" style={{ opacity }} />
      <motion.div
        className="marquee"
        style={{ skewX }}
        ref={marquee}
        onWheel={onWheel}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onPointerDown={onPointerDown}
        onDrag={onDrag}
        onPointerUp={onPointerUp}
        dragElastic={0.0001}
      >
        <div className="wrapper">
          <MarqueeItem content={_.content} speed={speed} />
          <MarqueeItem content={_.content} speed={speed} />
        </div>
        <div className="wrapper">
          <MarqueeItem content={_.content} speed={speed2} />
          <MarqueeItem content={_.content} speed={speed2} />
        </div>
      </motion.div>
    </>
  );
};

export default function App() {
  const [isFontAvailable, setIsFontAvailable] = useState(false);
  useEffect(() => {
    const font = new FontFaceObserver("Barlow Condensed");
    font.load(null, 5000).then(() => setIsFontAvailable(true));
  }, [setIsFontAvailable]);

  return isFontAvailable ? (
    <InteractiveMarquee />
  ) : (
    <div className="loader">Loading...</div>
  );
}
