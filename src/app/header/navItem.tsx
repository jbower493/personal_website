"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavItem({
    children,
    href,
}: {
    children: string;
    href: string;
}) {
    const pathname = usePathname();

    return (
        <Link
            href={href}
            className={`text-sm uppercase text-C_NavItem_text hover:text-S_text_default font-medium ${clsx(
                {
                    "text-S_text_default":
                        href === "/blog"
                            ? pathname.startsWith(href)
                            : pathname === href,
                }
            )}`}
        >
            {children}
        </Link>
    );
}
