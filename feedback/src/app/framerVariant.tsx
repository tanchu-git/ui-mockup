import { useRef, useState } from "react";
import { motion, useCycle } from "framer-motion";

const negFeedback = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
        transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2
        }
    }),
    closed: {
        clipPath: "circle(30px at 40px 40px)",
        transition: {
        delay: 0.5,
        type: "spring",
        stiffness: 400,
        damping: 40
        }
    }
};

export const FeedbackView = () => {
    const [isOpen, toggleOpen] = useCycle(false, true);
    const containerRef = useRef(null);

    return (
        <div className="">
            <motion.nav
                initial={false}
                animate={isOpen ? "open" : "closed"}
                custom={containerRef}
                ref={containerRef}
                >
                <motion.div className="background" variants={negFeedback} />
                <button className="text-white" onClick={() => {toggleOpen(); console.log(isOpen)}}>
                    Hi                    
                </button>
            </motion.nav>            
        </div>
    )
}