export interface ArticlePreview {
  id: number;
  date_created: string;
  views: number;
  estimate_reading_time: string;
  author: string;
  username: string;
  title: string;
  preview: string;
}

export interface Article extends ArticlePreview {
  text: string | null;
}

export interface CreateArticle {
  title: string;
  text: string;
}

export interface ArticlesPage {
  next: string | null;
  prev: string | null;
  results: ArticlePreview[];
}

export interface NavbarElement {
  title: string;
  asset: string | null;
  routerLink: string;
}

