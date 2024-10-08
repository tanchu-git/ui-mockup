"use client";

import React, { useState } from 'react'
import ImproveHeader from "@/app/improve_rank/ImproveHeader";
import TileReviews from '../TableTiles';

type Props = {
  params: {id: string}
}

const Reviews = ({params}: Props) => {
  const {id} = params;

  // Modal is for adding a 'Add Task' functionality later
  return (
    <div>
        <TileReviews id={id}/>
    </div>
  )
}

export default Reviews
