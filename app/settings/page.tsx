"use client";

import { Card } from "@components/card";
import { loadData } from "@api/apiData";
import toast from "react-hot-toast";
import { Button } from "@components/button";

export default function Settings() {
  async function handleLoadData() {
    const response = await loadData();

    if (response) {
      toast.success(`Data loaded successfully`);
    } else {
      toast.error(`Failed to load data`);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Card heading="Settings">
        <Button label="Load Data" onClick={() => handleLoadData()} />
      </Card>
    </div>
  );
}
