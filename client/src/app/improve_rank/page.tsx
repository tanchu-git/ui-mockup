"use client";

import React, { useState } from 'react'
import ProjectHeader from "@/app/improve_rank/ImproveHeader";
import Tile from './TileView';
import { getActiveBusiness } from '@/components/Sidebar';

type Props = {
  params: {id: string}
}

const ImproveRank = (businessId: number) => {
  // const {id} = params;
  const [activeTab, setActiveTab] = useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  return (
    <div>
      {/* MODAL NEW TASKS */}
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Tile" && (
        <Tile id={getActiveBusiness()} setIsModalNewTaskOpen={setIsModalNewTaskOpen}/>
      )}
    </div>
  )
}

export default ImproveRank
