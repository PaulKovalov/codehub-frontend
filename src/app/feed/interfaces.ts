export interface ArticlePreview {
  id: number;
  date_created: string;
  views: number;
  estimate_reading_time: string;
  author: number;
  username: string;
  title: string;
  preview: string;
  published?: boolean;
}

export interface Article extends ArticlePreview {
  text: string | null;
}

export interface CreateArticle {
  title: string;
  text: string;
}

export interface CreateTutorial {
  title: string;
  preview?: string;
}

export interface Tutorial {
  id: number;
  views: number;
  author: number;
  username: string;
  total_views: number;
  date_created: string;
  table_of_content: [{ title: string, id: number }];
  title: string;
  preview: string;
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

