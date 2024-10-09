"use client";

import React, { useState } from 'react'
import ImproveHeader from "@/app/improve_rank/ImproveHeader";
import Overview from '../CardView';
import { getActiveBusiness } from '@/components/Sidebar';

type Props = {
  params: {id: string}
}

const CardViews = ({params}: Props) => {
  const {id} = params || 1;

  // Modal is for adding a 'Add Task' functionality later
  return (
    <div>
        <Overview id={id}/>
    </div>
  )
}

export default CardViews