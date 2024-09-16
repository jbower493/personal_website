import "./blog.css";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { blogPostsDir } from "./consts";
import Link from "next/link";

export default function Blog() {
    const blogPostNames = fs.readdirSync(blogPostsDir);

    const files = blogPostNames.map((filename) => {
        const fileContents = fs.readFileSync(
            path.join(blogPostsDir, filename),
            {
                encoding: "utf-8",
            }
        );

        const grayMatter = matter(fileContents);
        const postMeta = grayMatter.data;
        postMeta.slug = filename.replace(".md", "");
        return postMeta;
    });

    return (
        <div>
            <h2>Blog</h2>
            {files.map((postMeta) => {
                return (
                    <div key={postMeta.slug}>
                        <Link href={`/blog/${postMeta.slug}`}>
                            {postMeta.title}
                        </Link>
                        <p>{postMeta.date}</p>
                        <p>{postMeta.excerpt}...</p>
                    </div>
                );
            })}
        </div>
    );
}
