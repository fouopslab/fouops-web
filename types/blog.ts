export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: "Build Logs" | "Technical Notes" | "Founder Lessons";
  readTime: string;
  content: string;
}

export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  category: BlogPost["category"];
  readTime?: string;
}
