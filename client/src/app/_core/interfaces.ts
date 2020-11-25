export interface IMessage {
  _id: string;
  name: string;
  phone: string;
  message: string;
}

export interface IAbout {
  title: string;
  content: string;
}

export interface IContact {
  intro: string;
  address: string;
  email: string;
  phone: string;
}

export interface IArticle {
  _id: string;
  author: {
    _id: string;
    name: string;
  };
  content: string;
  createdAt: string;
  image: string;
  imageAlt: string;
  isPublished: boolean;
  slug: string;
  title: string;
  updatedAt: string;
}

export interface IPortfolio {
  image: string;
  imageAlt: string;
  caption: string;
}