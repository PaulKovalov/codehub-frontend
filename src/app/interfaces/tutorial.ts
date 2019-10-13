import {Article} from './article';

export interface Tutorial {
  id: number;
  title: string;
  views: string;
  author: string;
  preview: string;
  articles: Article[] | null;
}
