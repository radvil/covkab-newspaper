import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { map, filter, mergeMap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class TitleService {
	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private titleSrv: Title
	) {}

	/**
	 * SET APP TITLE
	 * Function to be injected in the app global
	 * Set the app title based on the activated route
	 * We will directly inject this in the app.component.ts file since we dont hv another service to be injected alongside this function.
	 * We can inject a translate service if we wanna integrate translation in our app
	 */
	setAppTitle() {
		this.router.events
			.pipe(
				map(() => this.activatedRoute),
				map((route) => {
					while (route.firstChild) route = route.firstChild;
					return route;
				}),
				filter((route) => route.outlet === 'primary'),
				mergeMap((route) => route.data)
			)
			.subscribe((event) => {
				this.titleSrv.setTitle(event['title']);
			});
	}
}
