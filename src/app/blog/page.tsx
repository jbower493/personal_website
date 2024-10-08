import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { blogPostsDir } from "./consts";
import { PageTitle } from "@/components/PageTitle";
import { PostListItem, PostListItemModel } from "./PostListItem";
import { Input } from "@/components/Input";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Jamie Bower Dev | Blog",
    description:
        "Check out my blog. I post about various software engineering topics that I find interesting.",
};

/**
 * Date must be provided in the format "DD/MM/YYYY"
 */
function getTimestampFromDate(date: string) {
    const dateSegments = date.split("/") as string[];
    const formattedDate = dateSegments.reverse().join("-");
    return Date.parse(formattedDate);
}

export default function Blog({
    searchParams,
}: {
    searchParams: { search?: string };
}) {
    const searchTerm = searchParams.search;

    const blogPostNames = fs.readdirSync(blogPostsDir);
    const posts = blogPostNames
        .map((filename) => {
            const fileContents = fs.readFileSync(
                path.join(blogPostsDir, filename),
                {
                    encoding: "utf-8",
                }
            );

            const grayMatter = matter(fileContents);
            const postMeta = grayMatter.data as PostListItemModel;
            postMeta.slug = filename.replace(".md", "");
            return postMeta;
        })
        .sort((a, b) => {
            const dateA = getTimestampFromDate(a.date);
            const dateB = getTimestampFromDate(b.date);

            return dateA > dateB ? -1 : 1;
        });

    const filteredPosts = searchTerm
        ? posts.filter((postMeta) =>
              postMeta.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : posts;

    return (
        <div>
            <form
                method="GET"
                action="/blog"
                className="w-full flex justify-end"
            >
                <Input
                    name="search"
                    placeholder="Search for a blog post"
                    className="w-[300px]"
                />
            </form>
            <PageTitle>Blog</PageTitle>
            <p className="mb-10">
                One of the things I like to do in my spare time is learn new
                things by building side projects, and just generally trying out
                things that I&apos;ve heard about but don&apos;t yet understand.
                I decided to share my learnings by creating a blog.
            </p>
            <div className="flex gap-5 flex-wrap">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((postMeta) => {
                        return (
                            <PostListItem
                                key={postMeta.slug}
                                slug={postMeta.slug}
                                title={postMeta.title}
                                excerpt={postMeta.excerpt}
                                date={postMeta.date}
                            />
                        );
                    })
                ) : (
                    <p>No blog posts matched your search.</p>
                )}
            </div>
        </div>
    );
}
