export interface TableOfContentItem {
  title: string;
  id: number;
}

export interface BasePreview {
  id: number;
  date_created: string;
  views: number;
  author: number;
  username: string;
  title: string;
  preview: string;
  published?: boolean;
}

export interface ArticlePreview extends BasePreview {
  estimate_reading_time: string;
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

export interface CreateTutorial {
  title: string;
  preview?: string;
}

export interface Tutorial extends BasePreview {
  total_views: number;
  total_articles: number;
}

export interface TutorialsPage {
  next: string | null;
  prev: string | null;
  results: Tutorial[];
}

export interface TutorialArticleNav {
  next: number;
  prev: number;
}

export interface TutorialArticle extends Article {
  tutorial: number;
  nav: TutorialArticleNav;
}

export interface TutorialArticlePreview extends ArticlePreview {
  tutorial: number;
}

export interface TutorialArticlesPage {
  next: string | null;
  prev: string | null;
  results: TutorialArticlePreview[];
}

export interface NavbarElement {
  title: string;
  asset: string | null;
  routerLink: string;
}
