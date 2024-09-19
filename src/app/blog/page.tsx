import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { blogPostsDir } from "./consts";
import { PageTitle } from "@/components/PageTitle";
import { PostListItem, PostListItemModel } from "./PostListItem";

/**
 * Date must be provided in the format "DD/MM/YYYY"
 */
function getTimestampFromDate(date: string) {
    const dateSegments = date.split("/") as string[];
    const formattedDate = dateSegments.reverse().join("-");
    return Date.parse(formattedDate);
}

export default function Blog() {
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

    return (
        <div>
            <PageTitle>Blog</PageTitle>
            <p className="mb-10">
                One of the things I like to do in my spare time is learn new
                things by building side projects, and just generally trying out
                things that I&apos;ve heard about by don&apos;t yet understand.
                I usually make notes as I go during this process, so that I can
                refer back to my learnings at any point, so I recently decided
                what better way to make notes than in a blog post!
            </p>
            <div className="flex gap-5 flex-wrap">
                {posts.map((postMeta) => {
                    return (
                        <PostListItem
                            key={postMeta.slug}
                            slug={postMeta.slug}
                            title={postMeta.title}
                            excerpt={postMeta.excerpt}
                            date={postMeta.date}
                        />
                    );
                })}
            </div>
        </div>
    );
}
