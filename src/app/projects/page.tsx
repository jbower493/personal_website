import { PageTitle } from "@/components/PageTitle";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Jamie Bower Dev | Projects",
    description: "Check out some of my projects.",
};

export default function Projects() {
    return (
        <div>
            <PageTitle>Projects</PageTitle>
        </div>
    );
}
