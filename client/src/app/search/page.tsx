"use client";

import Header from "@/components/Header";
import React, { useEffect, useState } from "react";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="p-8">
      <Header name="Search" />
      <div>
        <input
          type="text"
          placeholder="Search..."
          className="w-1/2 rounded border p-3 shadow"
        />
      </div>
      <div className="p-5">

        
      </div>
    </div>
  );
};

export default Search;