import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectIsAuthenticated } from '../../modules/core/auth/auth.selectors';
import { Observable } from 'rxjs';
import { AppState } from '../../modules/core/core.state';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../modules/core/animations/route.animations';
import { technologies, Technology } from './list.data';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.less'],
  host: { class: 'home' },
  encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  isAuthenticated$: Observable<boolean>;
  technologies: Technology[] = technologies;

  constructor(
    private store: Store<AppState>) {
  }

  ngOnInit() {
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
  }
}
