import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import { tap, withLatestFrom } from 'rxjs/operators';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { authLogin, authLogout, authAdmin, authNoAdmin } from './auth.actions';
import { State } from './auth.models';
import { selectAuthState } from '../core.state';

export const AUTH_KEY = 'AUTH';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }
  login = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authLogin, authAdmin, authNoAdmin),
        withLatestFrom(this.store.pipe(select(selectAuthState))),
        tap(([action, settings]) => {
          this.localStorageService.setItem(AUTH_KEY, settings)
        })
      ),
    { dispatch: false }
  );
  logout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authLogout),
        tap(() => {
          this.router.navigate(['']);
          this.localStorageService.setItem(AUTH_KEY, { isAuthenticated: false });
        })
      ),
    { dispatch: false }
  );
}
