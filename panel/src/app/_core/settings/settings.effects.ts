import { Injectable, NgZone } from '@angular/core';
// import { OverlayContainer } from '@angular/cdk/overlay';
import { select, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { merge, of } from 'rxjs';
import { tap, withLatestFrom } from 'rxjs/operators';

import { selectSettingsState } from '../core.state';
import { LocalStorageService } from '../helper/local-storage.service';

import * as fromActions from './settings.actions';
// import * as fromSelectors from './settings.selectors';
import { State } from './settings.model';
import { selectHeaderBackground, selectIsFixedHeader } from './settings.selectors';

export const SETTINGS_KEY = 'SETTINGS';

const INIT = of('rad-init-effect-trigger');

@Injectable()
export class SettingsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<State>,
    // private overlayContainer: OverlayContainer,
    private localStorageSrv: LocalStorageService,
    private ngZone: NgZone
  ) {}

  hour = 0;
  changeHour = this.ngZone.runOutsideAngular(() =>
    setInterval(() => {
      const hour = new Date().getHours();
      if (hour !== this.hour) {
        this.hour = hour;
        this.ngZone.run(() =>
          this.store.dispatch(fromActions.changeHour({ hour }))
        );
      }
    }, 60_000)
  );

  persistSettings = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromActions.changeTheme,
          fromActions.changeAutoNightMode,
          fromActions.changeFixedHeader,
          fromActions.changeFixedSidebar,
          fromActions.changeHeaderBackground,
          fromActions.changeSidebarBackground
        ),
        withLatestFrom(this.store.pipe(select(selectSettingsState))),
        tap(([action, settings]) =>
          this.localStorageSrv.setItem(SETTINGS_KEY, settings)
        )
      ),
    { dispatch: false }
  );

  // changeHeader = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(fromActions.changeFixedHeader),
  //       withLatestFrom(this.store.select(selectIsFixedHeader)),
  //       tap(([action, state]) => {
  //         console.log('TEST', action, state);
  //       })
  //     ),
  //   { dispatch: false }
  // );

  //// TODO:// After setup dark mode
  // updateTheme = createEffect(
  //   () =>
  //     merge(INIT, this.actions$.pipe(ofType(fromActions.changeTheme))).pipe(
  //       withLatestFrom(
  //         this.store.pipe(select(fromSelectors.selectEffectiveTheme))
  //       ),
  //       tap(([action, effectiveTheme]) =>
  //         this.replaceClass('-theme', effectiveTheme)
  //       )
  //     ),
  //   { dispatch: false }
  // );

  // private replaceClass(rmCLass: string, addClass: string) {
  //   const classList = this.overlayContainer.getContainerElement().classList;
  //   const toRemove = Array.from(classList).filter((item: string) =>
  //     item.includes(rmCLass)
  //   );
  //   if (toRemove.length) classList.remove(...toRemove);
  //   classList.add(addClass);
  // }
}
