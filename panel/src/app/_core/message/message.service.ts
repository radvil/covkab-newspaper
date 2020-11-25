import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IMessage } from './message.interface';
import { environment as env } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MessageService {
  baseUrl: string = env.apiUrl + 'messages';

  constructor(private http: HttpClient) {}

  getMessages(query: string): Observable<IMessage[]> {
    return this.http.get<IMessage[]>(this.baseUrl + query);
  }

  getMessage(id: string): Observable<IMessage> {
    return this.http.get<IMessage>(this.baseUrl + '/' + id);
  }

  createMessage(newMessage: IMessage): Observable<any> {
    return this.http.post<IMessage>(this.baseUrl, newMessage);
  }

  deleteMessage(id: string): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/' + id);
  }
}
