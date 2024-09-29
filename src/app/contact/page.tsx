import { Anchor } from "@/components/Anchor";
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
            <div className="mb-8">
                <h2 className="text-[24px] mb-2">LinkedIn</h2>
                <Anchor
                    type="external"
                    href="https://www.linkedin.com/in/jamie-bower-a574581a2/"
                >
                    https://www.linkedin.com/in/jamie-bower-a574581a2/
                </Anchor>
            </div>
            <div className="mb-8">
                <h2 className="text-[24px] mb-2">Github</h2>
                <Anchor type="external" href="https://github.com/jbower493">
                    https://github.com/jbower493
                </Anchor>
            </div>
            <div>
                <h2 className="text-[24px] mb-2">Email</h2>
                <Anchor type="external" href="mailto:jamiebower03@gmail.com">
                    jamiebower03@gmail.com
                </Anchor>
            </div>
        </div>
    );
}
