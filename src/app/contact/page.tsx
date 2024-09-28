import { PageTitle } from "@/components/PageTitle";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Jamie Bower Dev | Contact",
    description: "Get in touch with me.",
};

export default function Contact() {
    return (
        <div>
            <PageTitle>Contact</PageTitle>
        </div>
    );
}
