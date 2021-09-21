import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { routeAnimations } from '../core/core.module';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.less'],
  host: { class: 'main-app' },
  animations: [routeAnimations],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  ngOnInit(): void {
    this.lazyLoadStyle('bootstrap.css');
    this.lazyLoadStyle('global.css');
    this.lazyLoadStyle('ui.css');
    this.lazyLoadStyle('widget.css');
  }

  lazyLoadStyle(cssFile: string) {
    const headElement = this.document.getElementsByTagName('head')[0];
    const link = this.document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.onload = () => { link.rel = 'stylesheet'; }
    link.href = cssFile;
    headElement.appendChild(link);
  }
}
