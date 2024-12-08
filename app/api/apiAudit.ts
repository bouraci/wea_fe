export async function getAuditLogs() {
  const response = await fetch("/api/audit/audit", {
    method: "GET",
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}
