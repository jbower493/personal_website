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
                    Prior to 2021, pretty much my whole life up until that point
                    had been dedicated to a career in professional golf. I
                    trained for many years to get to the point of turning
                    professional, in which time I spent several years traveling
                    around the world representing the England team. I then
                    turned professional in 2017, and went on to compete
                    professionally for 4 years, before eventually deciding on a
                    career change in 2021.
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
