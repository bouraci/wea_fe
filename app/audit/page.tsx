"use client";

import { useFetch } from "@hooks/useFetch";
import { AuditType } from "@/app/types/AuditType";
import { getAuditLogs } from "@api/apiAudit";
import { Spinner } from "@components/spinner";
import { Chip } from "@components/chip";

export default function AuditPage() {
  const { data, isLoading } = useFetch<AuditType[]>("auditData", getAuditLogs);

  function getLogTypeString(id: number) {
    switch (id) {
      case 1:
        return "AddToFavourites";
      case 2:
        return "RemoveFromFavourites";
      case 3:
        return "RegisterUser";
      case 4:
        return "AddComment";
      case 5:
        return "LoadCsv";
      case 6:
        return "LoadCdb";
      case 7:
        return "AddOrder";
      case 8:
        return "UpdateUserDetail";
      case 9:
        return "HideBook";
      default:
        return "Unknown";
    }
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (data) {
    return (
      <div className="space-y-4">
        {data.map((log: AuditType, index) => (
          <div
            className="grid grid-cols-[1fr_2fr_1fr_3fr_3fr] gap-4 p-4 border border-zinc-400 rounded-lg card-list-item"
            key={index}
          >
            <Chip content={getLogTypeString(log.logType)} />
            <p>{new Date(log.createdDate).toLocaleString("cs-CZ")}</p>
            <p>{log.userName}</p>
            <pre
              className=" bg-zinc-700 p-2 rounded"
              style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
            >
              {JSON.stringify(log.original, null, 2)}
            </pre>
            <pre
              className=" bg-zinc-700 p-2 rounded"
              style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
            >
              {JSON.stringify(log.updated, null, 2)}
            </pre>
          </div>
        ))}
      </div>
    );
  }

  return null;
}
