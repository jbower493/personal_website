import { MobileNav } from "./mobileNav";
import { NavItem } from "./navItem";

export function Header() {
    return (
        <header className="sm:h-[80px] justify-end items-center w-full flex">
            <nav className="px-8 gap-10 hidden sm:flex">
                <NavItem href="/">Home</NavItem>
                <NavItem href="/blog">Blog</NavItem>
                <NavItem href="/projects">Projects</NavItem>
                <NavItem href="/about">About Me</NavItem>
                <NavItem href="/contact">Contact</NavItem>
            </nav>

            <MobileNav />
        </header>
    );
}
