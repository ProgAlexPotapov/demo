import { Component, OnInit, Output, ViewEncapsulation, EventEmitter, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../modules/admin/auth/models';
import { AuthenticationService } from '../../../modules/admin/auth/auth.service';

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
