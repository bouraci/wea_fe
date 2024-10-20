"use client";

import {getGreetingMessage} from "@api/bookFetchers";
import debounce from "lodash.debounce";
import {ChangeEvent, useEffect, useMemo, useState} from "react";
import {useFetch} from "@hooks/useFetch";

export default function Hello() {
    const [name, setName] = useState("");
    const [debouncedName, setDebouncedName] = useState("");
    const { data: greetingData } = useFetch<string>(
        debouncedName,
        () => getGreetingMessage(debouncedName)
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
