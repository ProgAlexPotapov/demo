import { Component, OnInit, Output, ViewEncapsulation, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from '../../../../modules/core/auth/auth.service';
import { User } from '../../../../modules/core/auth/user.models';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.html',
  encapsulation: ViewEncapsulation.None
})
export class AboutMeComponent implements OnInit {
  @Output() aboutMeCloseClick: EventEmitter<any> = new EventEmitter<any>();
  user: User

  constructor(
    public translate: TranslateService,
    private authService: AuthenticationService,
  ) {
  }

  onCloseClick() {
    this.aboutMeCloseClick.emit(true);
  }

  ngOnInit() {
  this.user = this.authService.currentUserValue;
  }
}
