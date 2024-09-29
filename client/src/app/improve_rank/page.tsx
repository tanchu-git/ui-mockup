"use client";

import React, { useState } from 'react'
import ProjectHeader from "@/app/improve_rank/ProjectHeader";

type Props = {}

const ImproveRank = () => {
  const [activeTab, setActiveTab] = useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  return (
    <div>
      {/* MODAL NEW TASKS */}
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* {activeTab === "Board" && (
        <Board />
      )} */}
    </div>
  )
}

export default ImproveRank
