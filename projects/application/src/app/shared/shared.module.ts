import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BootstrapModule } from './ngx-bootstrap.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    BootstrapModule,

  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    BootstrapModule,
  ]
})
export class SharedModule { }
