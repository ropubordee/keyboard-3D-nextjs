
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedContainerProps{
    children : ReactNode
    deley: number;
    styles?: string; 
}
const AnimatedContainer = ({children,deley,styles} : AnimatedContainerProps) => {
    const variants = {
        hidden: {
          opacity: 0,
          x : 50,
          y: 20,
        },
        show: {
          opacity: 1,
          x : 0,
          y: 0,
          transition: {
            type: 'tween',
            ease: 'easeIn',
            duration: 0.5,
            deley : deley
          },
        },
    };
  return (
    <motion.h2
    variants={variants}
    initial="hidden"
    whileInView="show"
    className={styles}
    viewport={{once : true}}
  >
    {children}
  </motion.h2>
  )
}

export default AnimatedContainer













