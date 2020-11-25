import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IResidence } from './residence.interface';
import { environment as env } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ResidencesService {
  private url = env.apiUrl + 'residences';

  constructor(private http: HttpClient) {}

  getResidences(): Observable<IResidence[]> {
    return this.http.get<IResidence[]>(this.url).pipe(map((res) => res['doc']));
  }

  getResidence(id: string): Observable<IResidence> {
    return this.http.get<IResidence>(this.url + '/' + id).pipe(
      map((x) => {
        x['doc'].image = env.imageUrl + 'residences/' + x['doc'].image;
        return x['doc'];
      })
    );
  }

  createResidence(residence: IResidence): Observable<IResidence> {
    const fd: any = new FormData();

    fd.append('name', residence.name);
    fd.append('postalCode', residence.postalCode);
    fd.append('description', residence.description);
    fd.append('image', residence.image);

    return this.http.post<any>(this.url, fd).pipe(map((x) => x['doc']));
  }

  updateResidence(id: string, residence: IResidence): Observable<IResidence> {
    const fd: any = new FormData();

    fd.append('name', residence.name);
    fd.append('postalCode', residence.postalCode);
    fd.append('description', residence.description);
    fd.append('image', residence.image);

    return this.http
      .put<any>(this.url + '/' + id, fd)
      .pipe(map((x) => x['doc']));
  }

  deleteResidence(id: string): Observable<IResidence> {
    return this.http
      .delete<IResidence>(this.url + '/' + id)
      .pipe(map((x) => x['doc']));
  }
}
