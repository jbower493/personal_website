"use client";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavItem } from "./navItem";
import { useState } from "react";

export function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <nav
                className={`fixed w-full sm:hidden top-0 flex gap-10 flex-col justify-center items-center ${
                    isOpen ? "left-0" : "left-full"
                } w-full h-[400px] py-10 bg-S_background_secondary transition-all`}
            >
                <NavItem href="/" onClick={() => setIsOpen(false)}>
                    Home
                </NavItem>
                <NavItem href="/blog" onClick={() => setIsOpen(false)}>
                    Blog
                </NavItem>
                <NavItem href="/projects" onClick={() => setIsOpen(false)}>
                    Projects
                </NavItem>
                <NavItem href="/about" onClick={() => setIsOpen(false)}>
                    About Me
                </NavItem>
                <NavItem href="/contact" onClick={() => setIsOpen(false)}>
                    Contact
                </NavItem>
            </nav>
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="sm:hidden fixed top-4 right-4"
            >
                {isOpen ? <XMarkIcon width={20} /> : <Bars3Icon width={20} />}
            </button>
        </>
    );
}
