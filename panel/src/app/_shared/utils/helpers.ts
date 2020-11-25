import * as moment from 'moment';
import { environment as env } from '../../../environments/environment';
import { IArticle } from '../../_core';

export function transformArticleData(article: IArticle) {
  let date = moment(article.createdAt);

  article.createdAt = date.utc().format('YYYY-MM-DD');
  article.image = env.imageUrl + 'articles/' + article.image;

  return article;
}
