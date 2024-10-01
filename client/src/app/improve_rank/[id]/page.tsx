"use client";

import React, { useState } from 'react'
import ImproveHeader from "@/app/improve_rank/ImproveHeader";
import Tile from '../TileView';
import Timeline from '../TimelineView';
import Table from '../TableView';

type Props = {
  params: {id: string}
}

const ImproveRank = ({params}: Props) => {
  const {id} = params;
  const [activeTab, setActiveTab] = useState("Tile");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  // Modal is for adding a 'Add Task' functionality later
  return (
    <div>
      <ImproveHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Tile" && (
        <Tile id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "Timeline" && (
        <Timeline id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "Table" && (
        <Table id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
    </div>
  )
}

export default ImproveRank
