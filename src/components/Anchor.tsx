import clsx from "clsx";
import Link from "next/link";
import { ReactNode } from "react";

type AnchorProps = {
    children: ReactNode;
    href: string;
    className?: string;
    type?: "internal" | "external";
};

export function Anchor({
    children,
    href,
    className,
    type = "internal",
}: AnchorProps) {
    const classes = `text-S_text_info hover:underline ${clsx(className)}`;

    if (type === "external") {
        return (
            <a href={href} target="_blank" className={classes}>
                {children}
            </a>
        );
    }

    return (
        <Link href={href} className={classes}>
            {children}
        </Link>
    );
}
