import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ArticleService, IArticle, IUser, AuthService } from '../../../_core';
import { ConfirmDialogComponent } from '../../../_shared';
import { environment as env } from '../../../../environments/environment';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { IsLoadingService } from '@service-work/is-loading';
import * as moment from 'moment';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-articles_detail',
    templateUrl: './articles_detail.component.html',
    styleUrls: ['./articles_detail.component.scss'],
})
export class ArticlesDetailComponent implements OnInit, OnDestroy {
    idParam: string;
    article: IArticle;
    defaultAvatar = 'assets/images/portraits/default.jpg';
    private subs: Subscription = new Subscription();
    currentUser: IUser;

    constructor(
        private route: ActivatedRoute,
        private articleSrv: ArticleService,
        private authSrv: AuthService,
        private isLoading: IsLoadingService,
        private router: Router,
        public snackBar: MatSnackBar,
        private dialog: MatDialog
    ) { }

    ngOnInit() {
        this.authSrv.user.subscribe(x => this.currentUser = x);
        this.idParam = this.route.snapshot.params.id;
        this.subs.add(this.loadArticle());
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

    private loadArticle(): void {
        const request$ = this.articleSrv.getArticle(this.idParam)
            .subscribe(res => this.article = res);

        this.subs.add(request$);
        this.isLoading.add(request$);
    }

    editArticle(id: string) {
        this.router.navigate([`articles-edit/${id}`]);
    }

    deleteArticle(id: string) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '450px',
        });

        this.subs.add(dialogRef.afterClosed().subscribe((confirmed: boolean) => {
            if (confirmed) {
                this.isLoading.add(
                    this.articleSrv.deleteArticle(id).subscribe(
                        (res) => {
                            if (res.success === true) {
                                this.snackBar.open('Delete succeed', 'Close', {
                                    duration: 5000,
                                });
                                this.router.navigate(['articles-list/']);
                            }
                        },
                        (err) => {
                            this.snackBar.open('Failed to delete', 'Close', {
                                duration: 5000,
                            });
                        }
                    )
                );
            } else {
                this.snackBar.open('Canceled', 'Close', { duration: 2000 });
            }
        }));
    }
}
