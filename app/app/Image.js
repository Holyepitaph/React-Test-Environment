import Image from 'next/image'
import { useRef } from "react";
import { motion, useScroll } from 'framer-motion'

// Needs to have scroll animation 
// Needs Images Replaced
export function ImageA(){
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"]
  });
    return(
        <div ref={ref} className='mx-2'>
          <motion.div className='flex bg-white h-64 lg:w-[50rem] lg:mx-20 xl:mx-[23.5rem] lg:mb-36 sm:h-[25rem] rounded-md m-2 justify-end shadow-md' 
          // style={{ scaleY: scrollYProgress }}
          >
              <Image
                src="/A.png"
                alt="First Thing"
                className="bg-gray-300 py-6 px-6 w-1/2 mr-auto rounded"
                width={225}
                height={250}
                priority
              />
              <Image
                src="/B.png"
                alt="Second Thing"
                className=" py-6 w-[50%]"
                width={225}
                height={250}
                priority
              />
          </motion.div>
        </div>
    )
}