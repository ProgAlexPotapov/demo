import browser from 'browser-detect';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {
  authLogout, AppState, LocalStorageService, selectIsAuthenticated, selectIsAdmin,
  selectSettingsLanguage, selectTheme, selectSettingsChangeFontSize
} from '../../../modules/core/core.module';
import {
  actionSettingsChangeAnimationsPageDisabled, actionSettingsChangeLanguage,
  actionSettingsChangeFontSize, actionSettingsChangeTheme
} from '../../../modules/core/settings/settings.actions';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AuthenticationService } from '../../../modules/core/auth/auth.service';
import { Router } from '@angular/router';
import { FontSizes, Languages, Themes } from '../../../modules/core/settings/settings.model';
import { Component, OnInit, ViewEncapsulation, TemplateRef } from '@angular/core';
import { User } from '../../../modules/core/auth/user.models';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  host: { class: 'main-header' },
  encapsulation: ViewEncapsulation.None
})

export class HeaderComponent implements OnInit {
  languages = Languages;
  themes = Themes;
  fontSizes = FontSizes;
  modalRef: BsModalRef;

  isAuthenticated$: Observable<boolean>;
  isAdmin$: Observable<boolean>;
  language$: Observable<string>;
  theme$: Observable<string>;
  fontSize$: Observable<string>;
  user$: Observable<User>;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private store: Store<AppState>,
    private storageService: LocalStorageService,
    private modalService: BsModalService
  ) {
  }

  private static isIEorEdgeOrSafari() {
    return ['ie', 'edge', 'safari'].includes(browser().name);
  }

  ngOnInit() {
    this.user$ = this.authService.currentUser;
    this.storageService.testLocalStorage();
    if (HeaderComponent.isIEorEdgeOrSafari()) {
      this.store.dispatch(
        actionSettingsChangeAnimationsPageDisabled({
          pageAnimationsDisabled: true
        })
      );
    }
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
    this.isAdmin$ = this.store.pipe(select(selectIsAdmin));
    this.language$ = this.store.pipe(select(selectSettingsLanguage));
    this.theme$ = this.store.pipe(select(selectTheme));
    this.fontSize$ = this.store.pipe(select(selectSettingsChangeFontSize));
  }

  onOpenModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onCloseAboutMe(ev) {
    if (ev) {
      this.modalRef.hide();
    }
  }

  onLogoutClick() {
    this.store.dispatch(authLogout());
    this.router.navigate(['/login']).then();
    this.authService.logout();
  }

  onLanguageSelect(language: string) {
    this.store.dispatch(actionSettingsChangeLanguage({ language }));
  }

  onThemeSelect(theme: string) {
    this.store.dispatch(actionSettingsChangeTheme({ theme }));
  }

  onFontSelect(fontSize: string) {
    this.store.dispatch(actionSettingsChangeFontSize({ fontSize }));
  }
}
