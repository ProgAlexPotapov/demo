import { ActivationEnd, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { select, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, interval, merge, of } from 'rxjs';
import { tap, withLatestFrom, map, distinctUntilChanged, mapTo, filter } from 'rxjs/operators';
import { selectSettingsState } from '../core.state';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { AnimationsService } from '../animations/animations.service';
import { TitleService } from '../title/title.service';
import {
  actionSettingsChangeAnimationsElements,
  actionSettingsChangeAnimationsPage,
  actionSettingsChangeAnimationsPageDisabled,
  actionSettingsChangeAutoNightMode,
  actionSettingsChangeLanguage,
  actionSettingsChangeFontSize,
  actionSettingsChangeTheme,
  actionSettingsCatalogMode,
  actionSettingsChangeStickyHeader,
  actionSettingsChangeHour
} from './settings.actions';

import {
  selectEffectiveTheme,
  selectCatalogMode,
  selectSettingsLanguage,
  selectSettingsChangeFontSize,
  selectPageAnimations,
  selectElementsAnimations
} from './settings.selectors';

import { State } from './settings.model';
export const SETTINGS_KEY = 'SETTINGS';
const INIT = of('app-init-effect-trigger');

@Injectable()
export class SettingsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private router: Router,
    private overlayContainer: OverlayContainer,
    private localStorageService: LocalStorageService,
    private titleService: TitleService,
    private animationsService: AnimationsService,
    private translateService: TranslateService
  ) { }

  changeHour = createEffect(() =>
    interval(60_000).pipe(
      mapTo(new Date().getHours()),
      distinctUntilChanged(),
      map(hour => actionSettingsChangeHour({ hour }))
    )
  );
  persistSettings = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          actionSettingsChangeAnimationsElements,
          actionSettingsChangeAnimationsPage,
          actionSettingsChangeAnimationsPageDisabled,
          actionSettingsChangeAutoNightMode,
          actionSettingsChangeLanguage,
          actionSettingsChangeFontSize,
          actionSettingsChangeStickyHeader,
          actionSettingsChangeTheme,
          actionSettingsCatalogMode
        ),
        withLatestFrom(this.store.pipe(select(selectSettingsState))),
        tap(([action, settings]) =>
          this.localStorageService.setItem(SETTINGS_KEY, settings)
        )
      ),
    { dispatch: false }
  );
  updateRouteAnimationType = createEffect(
    () =>
      merge(
        INIT,
        this.actions$.pipe(
          ofType(
            actionSettingsChangeAnimationsElements,
            actionSettingsChangeAnimationsPage
          )
        )
      ).pipe(
        withLatestFrom(
          combineLatest([
            this.store.pipe(select(selectPageAnimations)),
            this.store.pipe(select(selectElementsAnimations))
          ])
        ),
        tap(([action, [pageAnimations, elementsAnimations]]) =>
          this.animationsService.updateRouteAnimationType(
            pageAnimations,
            elementsAnimations
          )
        )
      ),
    { dispatch: false }
  );
  updateTheme = createEffect(
    () =>
      this.store.pipe(
        select(selectEffectiveTheme),
        tap(effectiveTheme => {
          document.body.setAttribute('class', effectiveTheme);
        })
      ),
    { dispatch: false }
  );

  setTranslateServiceLanguage = createEffect(
    () =>
      this.store.pipe(
        select(selectSettingsLanguage),
        distinctUntilChanged(),
        tap(language => {
          this.translateService.use(language);
          document.querySelector('html').setAttribute('lang', language);
        })
      ),
    { dispatch: false }
  );
  updateFontSize = createEffect(
    () =>
      this.store.pipe(
        select(selectSettingsChangeFontSize),
        tap(fontSize => {
          document.querySelector('html').setAttribute('font', fontSize);
        })
      ),
    { dispatch: false }
  );
  setTitle = createEffect(
    () =>
      merge(
        this.actions$.pipe(ofType(actionSettingsChangeLanguage)),
        this.router.events.pipe(filter(event => event instanceof ActivationEnd))
      ).pipe(
        tap(() => {
          this.titleService.setTitle(
            this.router.routerState.snapshot.root,
            this.translateService
          );
        })
      ),
    { dispatch: false }
  );
}
