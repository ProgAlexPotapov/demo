import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { select, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, merge, of } from 'rxjs';
import { tap, withLatestFrom, distinctUntilChanged } from 'rxjs/operators';
import { selectSettingsState } from '../core.state';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { AnimationsService } from '../animations/animations.service';
import {
  actionSettingsChangeAnimationsPage,
  actionSettingsChangeAnimationsPageDisabled,
  actionSettingsChangeLanguage,
  actionSettingsChangeFontSize,
  actionSettingsChangeTheme,
  actionSettingsCatalogMode,
  actionSettingsChangeAnimationsElements
} from './settings.actions';

import {
  selectCatalogMode,
  selectSettingsLanguage,
  selectSettingsChangeFontSize,
  selectPageAnimations, selectElementsAnimations, selectTheme
} from './settings.selectors';

import { State } from './settings.model';
export const SETTINGS_KEY = 'Settings';
const INIT = of('app-init-effect-trigger');

@Injectable()
export class SettingsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private router: Router,
    private overlayContainer: OverlayContainer,
    private localStorageService: LocalStorageService,
    private animationsService: AnimationsService,
    private translateService: TranslateService
  ) { }

  persistSettings = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          actionSettingsChangeAnimationsElements,
          actionSettingsChangeAnimationsPage,
          actionSettingsChangeAnimationsPageDisabled,
          actionSettingsChangeLanguage,
          actionSettingsChangeFontSize,
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
        select(selectTheme),
        tap(theme => {
          document.body.setAttribute('class', `${theme}-theme` );
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
          document.querySelector('html').setAttribute('font', `${fontSize}-font`);
        })
      ),
    { dispatch: false }
  );
}
