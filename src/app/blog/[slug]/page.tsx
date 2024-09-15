import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const blogPostsDir = path.join(process.cwd(), "src/blogPosts");

export default async function BlogPost({
    params,
}: {
    params: { slug: string };
}) {
    const blogPostNames = fs.readdirSync(blogPostsDir);
    const requestedPost = blogPostNames.find(
        (postName) => postName.replace(".md", "") === params.slug
    );

    if (!requestedPost) {
        return <h3>Blog post not found</h3>;
    }

    const fileContents = fs.readFileSync(
        path.join(blogPostsDir, requestedPost),
        { encoding: "utf-8" }
    );

    const grayMatter = matter(fileContents);
    // const postMeta = grayMatter.data;
    const postContent = grayMatter.content;

    const markdownContent = await remark().use(remarkHtml).process(postContent);

    console.log(markdownContent);

    return (
        <div>
            <div
                dangerouslySetInnerHTML={{ __html: markdownContent.value }}
            ></div>
        </div>
    );
}
