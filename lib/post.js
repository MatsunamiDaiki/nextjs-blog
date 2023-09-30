import path from "path";
import fs from "fs";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");


export function getPostsData() {
  const fileNemes = fs.readdirSync(postsDirectory);
  const allPostsData = fileNemes.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");

    const filePath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");

    const mattterResult = matter(fileContents);
    console.log(mattterResult)

    return {
      id,
      ...mattterResult.data
    }
  })

  return allPostsData;
}
