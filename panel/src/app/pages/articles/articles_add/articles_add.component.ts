import { Component, OnInit } from '@angular/core';
import {
    FormGroup,
    FormControl,
    FormBuilder,
    Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ArticleService, IArticle, AuthService, IUser } from '../../../_core';
import { editor } from '../../../_shared';

import { MatSnackBar } from '@angular/material/snack-bar';
import { IsLoadingService } from '@service-work/is-loading';

@Component({
    selector: 'app-articles_add',
    templateUrl: './articles_add.component.html',
    styleUrls: ['./articles_add.component.scss'],
})
export class ArticlesAddComponent implements OnInit {
    pageSubtitle = 'Tambah Artikel Baru';
    idParam: string;
    article: IArticle;
    _author: IUser;
    isPublished = false;
    form: FormGroup;
    preview: string;
    editor = Object.create(editor);
    private subs: Subscription = new Subscription();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private snackBar: MatSnackBar,
        private isLoading: IsLoadingService,
        private _article: ArticleService,
        private _auth: AuthService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this._auth.user.subscribe((x) => (this._author = x));
        this.idParam = this.route.snapshot.params.id;

        this.createForm();

        if (this.idParam) {
            this.pageSubtitle = 'Edit Artikel';
            this.subs.add(this.loadArticle());
        }
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
        this.isLoading.remove();
    }

    private createForm() {
        this.form = this.fb.group({
            title: new FormControl('', [
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(255),
            ]),
            content: new FormControl('', [Validators.required]),
            author: new FormControl(this._author._id, [Validators.required]),
            isPublished: new FormControl(this.isPublished),
            articleImage: new FormControl(null),
            imageAlt: new FormControl("", [Validators.maxLength(255)]),
        });
    }

    private patchForm(article: IArticle): void {
        article && this.form.patchValue({
            title: article.title,
            content: article.content,
            author: article.author._id,
            isPublished: article.isPublished,
            articleImage: article.articleImage,
            imageAlt: article.imageAlt,
        });
    }

    public onFileSelected(event: any) {
        const file = (event.target as HTMLInputElement).files[0];
        this.form.patchValue({ articleImage: file });
        this.form.get('articleImage').updateValueAndValidity();

        const reader = new FileReader();
        reader.onload = () => (this.preview = reader.result as string);
        reader.readAsDataURL(file);
    }

    private loadArticle() {
        this._article.getArticle(this.idParam).subscribe((article) => {
            this.article = article;
            this.preview = article.image;
            this.patchForm(article);
        });
    }

    public submitForm() {
        this.form.disable();

        if (this.idParam) {
            // if edit mode,
            const request = this._article.updateArticle(this.idParam, this.form.value);
            const subscription$ = request.subscribe(
                (res: any) => {
                    this.snackBar.open('Succeed!', 'close', { duration: 5000 });
                    this.form.enable();
                    this.router.navigate(['articles-list/']);
                },
                (err) => {
                    this.form.enable();
                    this.snackBar.open(`Failed!`, 'close', { duration: 5000 });
                }
            );

            this.subs.add(subscription$);
            this.isLoading.add(subscription$);
        } else {
            // if add mode,
            const request = this._article.createArticle(this.form.value);
            const subscription$ = request.subscribe(
                (res: any) => {
                    this.form.enable();
                    this.snackBar.open('Succeed!', 'close', { duration: 5000 });
                    this.router.navigate(['articles-list/']);
                },
                (err) => {
                    this.form.enable();
                    this.snackBar.open(`Failed!`, 'close', { duration: 5000 });
                }
            );

            this.subs.add(subscription$);
            this.isLoading.add(subscription$);
        }
    }

    public cancelSubmit() {
        this.router.navigate(['articles-list/']);
    }
}
