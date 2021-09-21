import browser from 'browser-detect';
import { Component, OnInit, ViewEncapsulation, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
// import {AboutMeComponent} from './about-me/about-me.component';
import {
  authLogout, AppState, LocalStorageService, selectIsAuthenticated, selectIsAdmin,
  selectSettingsLanguage, selectEffectiveTheme, selectSettingsChangeFontSize
} from '../../core/core.module';
import {
  actionSettingsChangeAnimationsPageDisabled, actionSettingsChangeLanguage,
  actionSettingsChangeFontSize, actionSettingsChangeTheme
} from '../../core/settings/settings.actions';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { User } from '../../modules/admin/auth/models';
import { AuthenticationService } from '../../modules/admin/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.less'],
  host: { class: 'main-header' },
  encapsulation: ViewEncapsulation.None
})

export class HeaderComponent implements OnInit {
  languages = ['en', 'fr', 'de'];
  modalRef: BsModalRef;
  navigation = [
    { link: 'catalog', label: 'catalog' },
    { link: 'home', label: 'home' }
  ];
  themes = [
    { value: 'orange-theme', label: 'orange' },
    { value: 'red-theme', label: 'red' },
    { value: 'blue-theme', label: 'blue' }
  ];
  fontSizes = [
    { value: 'normal-font', label: 'normal' },
    { value: 'medium-font', label: 'medium' },
    { value: 'large-font', label: 'large' }
  ];

  isAuthenticated$: Observable<boolean>;
  isAdmin$: Observable<boolean>;
  language$: Observable<string>;
  theme$: Observable<string>;
  fontSize$: Observable<string>;
  user$: Observable<User>;
  user: User;

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
    this.user = this.authService.currentUserValue;
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
    this.theme$ = this.store.pipe(select(selectEffectiveTheme));
    this.fontSize$ = this.store.pipe(select(selectSettingsChangeFontSize));
  }

  onOpenModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onCloseAboutMe(returnObj) {
    if (returnObj) {
      this.modalRef.hide();
    }
  }

  onLogoutClick() {
    this.store.dispatch(authLogout());
    this.router.navigate(['/login']);
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
