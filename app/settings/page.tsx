"use client"

import {Card} from "@components/card";
import {loadData} from "@api/dataFetchers";
import toast from "react-hot-toast";

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
                    <button onClick={() => handleLoadData()}>Load Data</button>
            </Card>
        </div>
    );
}