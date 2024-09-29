import { Anchor } from "@/components/Anchor";

export type PostListItemModel = {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
};

export function PostListItem({
    slug,
    title,
    excerpt,
    date,
}: PostListItemModel) {
    return (
        <article
            key={slug}
            className="bg-S_background_secondary rounded-xl py-3 px-5 w-80 h-56 flex flex-col"
        >
            <small className="text-S_text_primary mb-2 block">{date}</small>
            <h2 className="text-S_text_default text-lg mb-3 leading-tight">
                {title}
            </h2>
            <p className="flex-1 text-S_text_secondary text-sm">{excerpt}...</p>
            <Anchor href={`/blog/${slug}`} className="text-sm">
                Read article
            </Anchor>
        </article>
    );
}
