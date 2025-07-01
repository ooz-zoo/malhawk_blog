

export default function MarkdownContent({ content }) {
  return (
    <div
      className="prose prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}