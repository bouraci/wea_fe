"use client";

import { UserChip } from "@components/user/user-chip";
import { LocaleSwitcher } from "@components/locale";
import { BookFilter } from "@components/filter";

export function Sidebar() {
  return (
    <div className="h-screen max-w-sm w-max bg-zinc-800 p-4 flex flex-col">
      <BookFilter />

      <div className="mt-auto flex flex-col gap-6">
        <LocaleSwitcher />
        <UserChip />
      </div>
    </div>
  );
}
