"use client";

import {getGreetingMessage} from "@/app/api/fetchers";
import useSWR from "swr";
import debounce from "lodash.debounce";
import toast from "react-hot-toast";
import {ChangeEvent, useEffect, useMemo, useState} from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [debouncedName, setDebouncedName] = useState("");
  const {
    data: greetingData,
    error: greetingError,
  } = useSWR(
      debouncedName,
    () => getGreetingMessage(debouncedName),
    {
      revalidateOnFocus: false,
    },
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);

    if (value === "") {
      setDebouncedName("");
      debouncedChangeHandler.cancel();
      return;
    }
    debouncedChangeHandler(value);
  };

  const debouncedChangeHandler = useMemo(
      () =>
          debounce((value) => {
            setDebouncedName(value);
          }, 500),
      [],
  );

  useEffect(() => {
    return debouncedChangeHandler.cancel();
  }, []);

  if (greetingError) {
    toast.error(greetingError.message, { duration: 5000 });
  }

  return (
      <>
        <input
            className="py-4 min-w-full px-4 bg-zinc-700 rounded-lg w-max"
            type="text"
            placeholder="Koho chcete pozdravit?"
            value={name}
            onChange={onChange}
        />

        {greetingData && <cite className="mt-6 font-light text-4xl text-center">{greetingData}</cite>}
      </>
  );
}
