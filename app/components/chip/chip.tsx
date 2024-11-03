import clsx from "clsx";

export function Chip({content, className}: Readonly<{ content: string; className?: string }>) {
    return (
        <span className={clsx("text-sm border-blue-500/50 border text-white w-max py-1 px-2 rounded-full bg-blue-500/40", className)}>
            {content}
        </span>
    );
}