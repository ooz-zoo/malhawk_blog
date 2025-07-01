// src/utils/extractHeadings.js
export const extractHeadings = (content) => {
    return content
      .filter((block) => block._type === "block" && block.style.startsWith("h"))
      .map((block) => ({
        text: block.children[0].text,
        level: block.style.replace("h", ""),
        id: block.children[0].text.toLowerCase().replace(/\s+/g, "-"),
      }));
  };