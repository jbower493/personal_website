import { PageTitle } from "@/components/PageTitle";
import { Metadata } from "next";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
    title: "Jamie Bower Dev | Projects",
    description: "Check out some of my projects.",
};

export default function Projects() {
    return (
        <div>
            <PageTitle>Projects</PageTitle>

            <div className="mb-16">
                <div className="w-full mb-5 flex gap-3 items-end">
                    <img
                        className="w-full h-auto sm:w-auto sm:h-[280px] rounded-md"
                        src="./projects/sl_mob_1.png"
                        alt="Shopping List first screenshot"
                    />
                    <img
                        className="w-auto h-[280px] rounded-md hidden sm:inline"
                        src="./projects/sl_mob_2.png"
                        alt="Shopping List second screenshot"
                    />
                    <img
                        className="w-auto h-[280px] rounded-md hidden sm:inline"
                        src="./projects/sl_mob_3.png"
                        alt="Shopping List third screenshot"
                    />
                </div>
                <div className="flex-col sm:flex-row flex gap-4 justify-between sm:items-end mb-5">
                    <h3 className="text-[20px] text-S_text_primary leading-none">
                        Shopping List
                    </h3>
                    <div className="flex gap-3">
                        <Button asChild variant="primary" size="sm">
                            <a
                                href="https://shoppinglist.jamiebowerdev.com"
                                target="_blank"
                                rel="noreferrer"
                            >
                                View Site
                            </a>
                        </Button>
                        <Button asChild variant="outline" size="sm">
                            <a
                                href="https://github.com/jbower493/shopping_list"
                                target="_blank"
                                rel="noreferrer"
                            >
                                View Code
                            </a>
                        </Button>
                    </div>
                </div>
                <p className="text-S_text_default">
                    This is an application I built to solve a problem that I was
                    having in my own day to day life. I was fed up of writing
                    shopping lists before doing the groceries each week,
                    repeating the same items over and over, and figuring out
                    what ingredients I needed to make certain recipes. This
                    application simplifies and automates the process of writing
                    your grocery list by allowing you to create recipes and
                    menus, and then automatically add all the ingredients from
                    those recipes into a list, from which you can then check off
                    items as you walk around the store. It&apos;s available
                    online and free to use, click the &quot;View Site&quot;
                    button above to check it out!
                </p>
            </div>

            <div className="mb-0">
                <div className="w-full mb-5 flex gap-3 items-end">
                    <img
                        className="w-auto h-[280px] rounded-md hidden lg:inline"
                        src="./projects/wp_desktop.jpg"
                        alt="Workout Planner desktop view"
                    />
                    <img
                        className="w-full h-auto sm:w-auto sm:h-[240px] rounded-md"
                        src="./projects/wp_mob.png"
                        alt="Workout Planner mobile view"
                    />
                </div>
                <div className="flex-col sm:flex-row flex gap-4 justify-between sm:items-end mb-5">
                    <h3 className="text-[20px] text-S_text_primary leading-none">
                        Workout Planner
                    </h3>
                    <div className="flex gap-3">
                        <Button asChild variant="outline" size="sm">
                            <a
                                href="https://github.com/jbower493/portfolio-workout_planner"
                                target="_blank"
                                rel="noreferrer"
                            >
                                View Code
                            </a>
                        </Button>
                    </div>
                </div>
                <p className="text-S_text_default">
                    This is a web application which allows users to create a
                    profile, then login and record their favourite workouts and
                    exercises, including details about each exercise and
                    workout. I used React for the frontend (with Redux for state
                    management and Bootstrap for styling) and Node JS with
                    Express for the backend API.
                </p>
            </div>
        </div>
    );
}
