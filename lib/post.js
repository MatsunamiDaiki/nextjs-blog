import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark"
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

export function getPostsData() {
  const fileNemes = fs.readdirSync(postsDirectory);
  const allPostsData = fileNemes.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const mattterResult = matter(fileContents);

    return {
      id,
      ...mattterResult.data
    }
  })

  return allPostsData;
}

export function getAllPostIds() {
  const fileNemes = fs.readdirSync(postsDirectory);
  return fileNemes.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, "")
      }
    }
  })
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContent = fs.readFileSync(fullPath, "utf8")

  const mattterResult = matter(fileContent);

  const blogContent = await remark().use(html).process(mattterResult.content)

  const blogContentHTML = blogContent.toString();

  return {
    id,
    blogContentHTML,
    ...mattterResult.data
  }
}
