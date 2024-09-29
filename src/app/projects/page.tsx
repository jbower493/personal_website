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
                        className="w-auto h-[280px] rounded-md"
                        src="./projects/wp_desktop.jpg"
                        alt="Workout Planner desktop view"
                    />
                    <img
                        className="w-auto h-[240px] rounded-md"
                        src="./projects/wp_mob.png"
                        alt="Workout Planner mobile view"
                    />
                </div>
                <div className="flex justify-between items-end mb-5">
                    <h3 className="text-[20px] text-S_text_primary leading-none">
                        Workout Planner
                    </h3>
                    <div className="flex gap-3">
                        <Button asChild variant="primary" size="sm">
                            <a
                                href="https://jbwebsites.work/workout-planner"
                                target="_blank"
                                rel="noreferrer"
                            >
                                View Site
                            </a>
                        </Button>
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

            <div className="mb-0">
                <div className="w-full mb-5 flex gap-3 items-end">
                    <img
                        className="w-auto h-[280px] rounded-md"
                        src="./projects/wp_desktop.jpg"
                        alt="Workout Planner desktop view"
                    />
                    <img
                        className="w-auto h-[240px] rounded-md"
                        src="./projects/wp_mob.png"
                        alt="Workout Planner mobile view"
                    />
                </div>
                <div className="flex justify-between items-end mb-5">
                    <h3 className="text-[20px] text-S_text_primary leading-none">
                        Workout Planner
                    </h3>
                    <div className="flex gap-3">
                        <Button asChild variant="primary" size="sm">
                            <a
                                href="https://jbwebsites.work/workout-planner"
                                target="_blank"
                                rel="noreferrer"
                            >
                                View Site
                            </a>
                        </Button>
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
