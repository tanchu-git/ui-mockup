"use client";

import React, { useState } from 'react'
import ImproveHeader from "@/app/improve_rank/ImproveHeader";
import Tile from '../TableTiles';

type Props = {
  params: {id: string}
}

const Reviews = ({params}: Props) => {
  const {id} = params;

  // Modal is for adding a 'Add Task' functionality later
  return (
    <div>
        <Tile id={id}/>
    </div>
  )
}

export default Reviews
