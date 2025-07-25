import path from 'path';
import { promises as fs } from 'fs';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';  
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src/app/posts');

export async function getPosts() {
  const filenames = await fs.readdir(postsDirectory);
  
  return Promise.all(
    filenames.map(async (filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = await fs.readFile(filePath, 'utf8');

      const { data: frontmatter, content } = matter(fileContents);

      const processedContent = await unified()
        .use(remarkParse)
        .use(remarkGfm)   
        .use(remarkHtml)
        .process(content);

      return {
        slug: filename.replace(/\.md$/, ''),
        ...frontmatter,
        content: processedContent.toString(),
      };
    })
  );
}

// Individual post
export async function getPostBySlug(slug) {
  try {
    const filePath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = await fs.readFile(filePath, 'utf8');

    const { data: frontmatter, content } = matter(fileContents);

    const processedContent = await unified()
      .use(remarkParse)
      .use(remarkGfm)    
      .use(remarkHtml)
      .process(content);

    return {
      slug,
      ...frontmatter,
      content: processedContent.toString(),
    };
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    return null;
  }
}
