import { Anchor } from "@/components/Anchor";
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
            <section className="mb-8">
                <h2 className="text-[24px] text-S_text_primary mb-2">Work</h2>
                <p>
                    I currently work as a Senior Software Engineer at{" "}
                    <Anchor href="https://nexigen.digital" type="external">
                        Nexigen Digital
                    </Anchor>
                    , working mainly in frontend development. I&apos;ve been at
                    Nexigen since 2021, working with my colleagues to create and
                    maintain software focused around providing Domain Name and
                    Web Hosting solutions (amongst other things) for our
                    customers.
                </p>
            </section>
            <section className="mb-8">
                <h2 className="text-[24px] text-S_text_primary mb-2">
                    Background
                </h2>
                <p>
                    I trained to be an elite golfer throughout my teenage years, first representing my county (Yorkshire), before going on to represent England internationally. In 2017, I turned professional and signed with a sport management company. I competed on the European Challenge Tour and PGA Euro Pro Tours for several years. In 2020 I took up coding as a hobby and loved it so much that I decided to pursue a career to software engineering shortly after.
                </p>
            </section>
            <section>
                <h2 className="text-[24px] text-S_text_primary mb-2">
                    Hobbies
                </h2>
                <p>
                    Outside of work, my hobbies include playing and watching
                    football, working out, and going to the beach (I love to get
                    in the ocean at any opportunity). I play football
                    competitively for a local club,{" "}
                    <Anchor href="https://bnfc.com.au" type="external">
                        Blackburn New Hope FC
                    </Anchor>
                    .
                </p>
            </section>
        </div>
    );
}
