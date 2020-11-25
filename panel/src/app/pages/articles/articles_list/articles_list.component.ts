import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { IsLoadingService } from '@service-work/is-loading';
import { merge, Observable, fromEvent } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { ConfirmDialogComponent as ConfirmDialog } from '../../../_shared';
import {
  ArticleService,
  IUser,
  AuthService,
  ArticleDataSource,
} from '../../../_core';

@Component({
  selector: 'app-articles_list',
  templateUrl: './articles_list.component.html',
  styleUrls: ['./articles_list.component.scss'],
})
export class ArticlesListComponent implements OnInit, AfterViewInit {
  dataSource: ArticleDataSource;
  displayedColumns: string[] = [
    'title',
    'author',
    'isPublished',
    'createdAt',
    'action',
  ];
  currentUser: IUser;
  totalDocuments: number;
  isDocumentsNull: Observable<boolean>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('searchInput', { static: true }) input: ElementRef;

  constructor(
    private isLoading: IsLoadingService,
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private articleSrv: ArticleService,
    private authSrv: AuthService
  ) {}

  isVerified(authorId: string): boolean {
    return this.currentUser && this.currentUser._id === authorId;
  }

  ngOnInit() {
    this.authSrv.user.subscribe((x) => (this.currentUser = x));
    this.totalDocuments = this.route.snapshot.data['totalDocuments'];
    this.isDocumentsNull = this.totalDocuments['message'];
    this.dataSource = new ArticleDataSource(this.articleSrv);

    // console.log(this.totalDocuments);
    this.dataSource.findArticles(null, 1, 5, 'createdAt');
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadArticlesPage('title');
        })
      )
      .subscribe();

    // load articles on sort || change page
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadArticlesPage()))
      .subscribe();
  }

  loadArticlesPage(key?: string): void {
    key
      ? this.dataSource.searchArticle(key, this.input.nativeElement.value)
      : this.dataSource.findArticles(
          this.sort.direction,
          this.paginator.pageIndex + 1,
          this.paginator.pageSize,
          this.sort.active
        );
  }

  addArticle() {
    this.router.navigate(['articles-add/']);
  }

  showArticle(id: string) {
    this.router.navigate([`articles-detail/${id}`]);
  }

  editArticle(id: string) {
    this.router.navigate([`articles-edit/${id}`]);
  }

  deleteArticle(id: string) {
    const dialog = this.dialog.open(ConfirmDialog, { width: '450px' });

    dialog.afterClosed().subscribe((confirmed: boolean) => {
      if (!confirmed) {
        return this.snack.open('Canceled', 'Close', { duration: 2000 });
      }

      const http$ = this.articleSrv.deleteArticle(id);

      const newSub = http$.subscribe((_) => {
        this.snack.open('Deleted succeed!', 'Close', { duration: 5000 });
        this.dataSource.findArticles();
      });

      this.isLoading.add(newSub);
    });
  }
}
