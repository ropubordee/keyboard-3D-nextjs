import { motion } from 'framer-motion';

interface TextBottomFadeInProps{
    title: string;
    textStyles: any; 
}

const textVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'tween',
        ease: 'easeIn',
        duration: 0.5,
      },
    },
};

const TypingText = ({ title, textStyles }:TextBottomFadeInProps) => (
    <motion.h2
      variants={textVariants}
      initial="hidden"
      whileInView="show"
      className={textStyles}
    >
      {title}
    </motion.h2>
);

export default TypingText;  




