export interface ArticlePreview {
  date_created: string;
  views: number;
  estimate_reading_time: string;
  author: string;
  title: string;
}

export interface Article extends ArticlePreview {
  id: number;
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
