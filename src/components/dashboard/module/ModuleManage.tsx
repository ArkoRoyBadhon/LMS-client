"use client";
import React, { useEffect, useState } from "react";
import ModuleCreate from "./ModuleCreate";

const ModuleManage = ({ id }: { id: string }) => {
  const [purpose, setPurpose] = useState<string | null>(null);

  useEffect(() => {
    const queryPurpose = new URLSearchParams(window.location.search).get(
      "purpose"
    );
    setPurpose(queryPurpose);
  }, []);

  return (
    <div>
      Module ID: {id}, Purpose: {purpose || "Loading..."}
      {purpose === "create" && <ModuleCreate id={id} />}
    </div>
  );
};

export default ModuleManage;
