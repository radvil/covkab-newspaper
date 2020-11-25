import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';

import { ISlide } from './slide.interface';
import { environment as env } from '../../../environments/environment';
import { imageExists } from 'src/app/_shared/utils/checkImageExistence';

@Injectable({
    providedIn: 'root',
})
export class SlideService {
    private SLIDE_URL = env.apiUrl + 'portfolios';
    public slide: ISlide;

    constructor(private http: HttpClient) { }

    public createSlide(slide: ISlide): Observable<ISlide> {
        const fd: any = new FormData();
        fd.append('caption', slide.caption);
        fd.append('author', slide.author);
        fd.append('image', slide.image);
        fd.append('imageAlt', slide.imageAlt);

        return this.http.post<ISlide>(this.SLIDE_URL, fd).pipe(
            delay(1000),
            map((res) => res['doc']),
            tap((item) => this.setProperImageLink(item))
        );
    }

    public updateSlide(id: string, slide: ISlide): Observable<any> {
        return this.http.put(`${this.SLIDE_URL}/${id}`, slide).pipe(
            delay(1000),
            map((res) => res['doc']),
            tap((item) => this.setProperImageLink(item))
        );
    }

    public deleteSlide(id: string): Observable<any> {
        return this.http.delete<any>(`${this.SLIDE_URL}/${id}`);
    }

    public getSlides(): Observable<ISlide[]> {
        return this.http.get<ISlide[]>(`${this.SLIDE_URL}?sort=-createdAt`).pipe(
            map((res) => res['doc']),
            tap((item) => item.forEach((item: ISlide) => this.setProperImageLink(item)))
        );
    }

    public getSlide(id: string): Observable<ISlide> {
        return this.http.get<ISlide>(`${this.SLIDE_URL}/${id}`).pipe(
            map((res) => res['doc']),
            tap((item: ISlide) => this.setProperImageLink(item))
        );
    }

    private setProperImageLink(slide: ISlide): ISlide {
        const defaultImageLink = env.imageUrl + 'portfolios/' + slide.image;
        slide.image = imageExists(defaultImageLink)
            ? defaultImageLink
            : slide.imageAlt;
        return slide;
    }
}
