export type Issue = {
  id: string;
  volume: number;
  issueNo: number;
  title: string;
  doi?: string;
  issn: string;
  coverImage?: string | null;
  editorial?: string;
  editorialAuthor?: string;
  publishedAt: string;
  isCurrent: boolean;
  date: string;
};

export type IssueArticle = {
  id: string;
  title: string;
  abstract: string;
  pages: string;
  pdfUrl: string;
  authors: string[];
  keywords: string[];
};
