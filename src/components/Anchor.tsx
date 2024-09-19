import clsx from "clsx";
import Link from "next/link";

type AnchorProps = {
    children: string;
    href: string;
    className?: string;
};

export function Anchor({ children, href, className }: AnchorProps) {
    return (
        <Link
            href={href}
            className={`text-S_text_info text-sm hover:underline ${clsx(
                className
            )}`}
        >
            {children}
        </Link>
    );
}
