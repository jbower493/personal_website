import { PageTitle } from "@/components/PageTitle";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Jamie Bower Dev | About Me",
    description: "Find out more about me.",
};

export default function About() {
    return (
        <div>
            <PageTitle>About Me</PageTitle>
        </div>
    );
}
