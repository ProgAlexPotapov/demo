import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { CatalogComponent } from './catalog.component';
import { CatalogRoutingModule } from './catalog-routing.module';
import { QuickFormComponent } from './quick-form/quick-form.component';
import { SearchCarPipe } from './search.pipe';

@NgModule({
  declarations: [CatalogComponent, QuickFormComponent, SearchCarPipe],
  imports: [CommonModule, SharedModule, CatalogRoutingModule]
})
export class CatalogModule { }
