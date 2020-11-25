export interface IArticle {
  _id: string;
  title: string;
  content: string;
  author: any; // fuck off!
  isPublished: string;
  image: string;
  imageAlt: string;
  articleImage: File;
  createdAt: string;
  updatedAt: string;
}