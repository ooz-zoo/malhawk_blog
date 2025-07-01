// app/blog/page.js
import BlogPageClient from './BlogPageClient';
import { getPosts } from '../lib/posts'; // Make sure this path is correct

export default async function BlogPage() {
  try {
    const posts = await getPosts();
    return <BlogPageClient initialPosts={posts} />;
  } catch (error) {
    console.error('Failed to load posts:', error);
    return <div>Error loading posts</div>;
  }
}