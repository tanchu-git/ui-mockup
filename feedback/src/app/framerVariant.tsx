import { useRef, useState } from "react";
import { motion, useCycle } from "framer-motion";
import { Rating } from "@mui/material";
import React from "react";
import { useGetFeedbackLinkQuery } from "@/state/api";
import { permanentRedirect, redirect, useRouter } from "next/navigation";

const negFeedback = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2}px)`,
        transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2
        }
    }),
    closed: {
        clipPath: "circle(30px)",
        transition: {
        delay: 0.5,
        type: "spring",
        stiffness: 400,
        damping: 40
        }
    }
};

type Props = {
    feedbackLink: string
}

export const FeedbackView = ( { feedbackLink }: Props ) => {
    const [isOpen, toggleOpen] = useCycle(false, true);
    const containerRef = useRef(null);

    const [value, setValue] = React.useState<number | null>(2);    

    const {
        data: business,
        isLoading: businessLoading,
        isError: businessError
      } = useGetFeedbackLinkQuery({ feedbackLink: feedbackLink });

    if (businessLoading) return <div>Loading..</div>;
    if (businessError || !business || !business[0]) return <div>{feedbackLink} - No such link</div>;

    const goodRating = value! >= Number(business[0].ratingLimit);
    const placId = business[0].placeId;
    const router = useRouter()

    return (
        <motion.nav
            className=""
            initial={false}
            animate={isOpen ? "open" : "closed"}
            ref={containerRef}
        >
            <motion.div className="background bg-white" variants={negFeedback} />
            <Rating
                className={`mb-48 scale-150 ${isOpen ? "-z-10" : ""}`}
                size="large"
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                setValue(newValue);
                }}
            />
            <button                 
                className="negButton w-[50px] h-[50px] outline-none border-none 
                    font-bold text-blue-900 text-xl cursor-pointer bg-transparent"
                    onClick={ () => { 
                        goodRating 
                        ? 
                        router.push(`https://search.google.com/local/writereview?placeid=${placId}`) 
                        : 
                        toggleOpen()
                    }}
            >         
            Go!
            </button>
        </motion.nav>    
    )
}