import { clsx } from "clsx";

type PageTitleProps = {
    children: string;
    size?: "lg" | "sm";
};

export function PageTitle({ children, size = "lg" }: PageTitleProps) {
    return (
        <h1
            className={`${clsx({
                "text-[36px]": size === "lg",
                "text-[24px]": size === "sm",
            })} mb-6 font-extrabold uppercase text-S_text_primary`}
        >
            {children}
        </h1>
    );
}
