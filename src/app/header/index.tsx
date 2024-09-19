import { NavItem } from "./navItem";

export function Header() {
    return (
        <header className="px-8 h-[80px] flex justify-end items-center w-full">
            <nav className="flex gap-10">
                <NavItem href="/">Home</NavItem>
                <NavItem href="/blog">Blog</NavItem>
                <NavItem href="/projects">Projects</NavItem>
                <NavItem href="/about">About Me</NavItem>
                <NavItem href="/contact">Contact</NavItem>
            </nav>
        </header>
    );
}
