import { Button } from "@/components/Button";
import Link from "next/link";

export default function Home() {
    return (
        <div className="h-[calc(100dvh-80px-4rem)] flex justify-center items-center">
            <div className="mb-[calc(40px+2rem)] flex flex-col items-center">
                <h1 className="text-[42px] font-extrabold uppercase text-center text-S_text_primary">
                    Jamie Bower
                </h1>
                <h2 className="text-[22px] font-semibold text-center mb-8">
                    Software Engineer
                </h2>
                <p className="text-sm text-S_text_secondary w-[440px] text-center mb-4">
                    Pro golfer turned frontend developer. Love building stuff
                    and learning.
                </p>
                <div className="flex gap-2">
                    <Button asChild>
                        <Link href="/blog">Checkout my blog</Link>
                    </Button>
                    <Button asChild variant="secondary">
                        <Link href="/contact">Get in touch</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
