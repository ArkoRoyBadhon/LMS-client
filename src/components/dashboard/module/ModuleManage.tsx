"use client";
import React, { useEffect, useState } from "react";
import ModuleCreate from "./ModuleCreate";
import ModuleUpdate from "./ModuleUpdate";

const ModuleManage = ({ id }: { id: string }) => {
  const [purpose, setPurpose] = useState<string | null>(null);

  useEffect(() => {
    const queryPurpose = new URLSearchParams(window.location.search).get(
      "purpose"
    );
    setPurpose(queryPurpose);
  }, []);

  return (
    <>
      {purpose === "create" && <ModuleCreate id={id} />}
      {purpose === "update" && <ModuleUpdate id={id} />}
    </>
  );
};

export default ModuleManage;
