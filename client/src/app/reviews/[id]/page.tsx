"use client";

import React, { useState } from 'react'
import ImproveHeader from "@/app/improve_rank/ImproveHeader";
import TileRevies from '../TableTiles';

type Props = {
  params: {id: string}
}

const Reviews = ({params}: Props) => {
  const {id} = params;

  // Modal is for adding a 'Add Task' functionality later
  return (
    <div>
        <TileRevies id={id}/>
    </div>
  )
}

export default Reviews
