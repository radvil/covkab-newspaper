import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, share, tap } from 'rxjs/operators';

import { environment as env } from '../../../environments/environment';
import { ImageLink } from '../helpers/ImageLink';

import { IAbout, IArticle, IContact, IMessage, IPortfolio } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class DataService {

  constructor(private http: HttpClient) { }

  public imageLink = new ImageLink();

  getAbout(): Observable<IAbout> {
    const url = env.apiUrl + 'info/about/';
    return this.http.get<IAbout>(url).pipe(map((res) => res['doc']));
  }

  getContact(): Observable<IContact> {
    const url = env.apiUrl + 'info/contact/';
    return this.http.get<IContact>(url).pipe(map((res) => res['doc']));
  }

  getPortfolios(): Observable<IPortfolio[]> {
    const url = env.apiUrl + 'portfolios';

    return this.http.get<IPortfolio[]>(url).pipe(
      map((res) => res['doc'] as IPortfolio[]),
      tap((portfolios) => this.imageLink.setAll(portfolios, 'portfolios')),
      share()
    );
  }

  getLocalCovidCaseStatus(): Observable<any> {
    const url = env.apiUrl + 'statistics';
    return this.http.get<any>(url);
  }

  getArticles(): Observable<IArticle[]> {
    const url = env.apiUrl + 'articles?';

    return this.http.get<IArticle[]>(url).pipe(
      map((res) => res['doc'] as IArticle[]),
      tap((articles) => this.imageLink.setAll(articles, 'articles'))
    );
  }

  getArticle(id: string): Observable<IArticle> {
    const url = env.apiUrl + 'articles/' + id;

    return this.http.get<IArticle>(url).pipe(
      map(res => res['doc']),
      tap(article => this.imageLink.setOne(article, 'articles')),
      share()
    );
  }

  createMessage(newMessage: IMessage): Observable<any> {
    const url = env.apiUrl + 'messages/';
    return this.http.post<IMessage>(url, newMessage);
  }
}
