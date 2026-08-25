import type { ArticleAuthor } from "@gad/types/issue";

export function formatAuthorName(author: ArticleAuthor): string {
  const middle = author.middlename ? ` ${author.middlename}` : "";
  return `${author.firstname}${middle} ${author.lastname}`.trim();
}
