"use client";
import React from "react";
import Image from "next/image";
import Chip from "@mui/material/Chip";

interface CardImageProps {
    title: string,
    value: any,
    image: any
}

const CardImage = ({
    title,
    value,
    image,
}: CardImageProps) => {
  return (
    <div className="rounded-lg dark:shadow-dark-tertiary shadow-md bg-white mb-5 p-0 relative
        dark:hover:ring-orange-500 w-full break-words overflow-hidden hover:ring dark:bg-slate-800">
        <div className="relative">                    
            <Image src={image} alt="materialm"/>
            <Chip color="primary" label={title} 
                className="-mt-6 ml-14 relative font-semibold"/>                
        </div>
        <div className="px-6 pb-6 dark:bg-slate-800 dark:text-white">
            <h5 className="text-lg my-6 group-hover:text-primary line-clamp-2">{value}</h5>
        </div>
        </div>
  );
};

export default CardImage;
