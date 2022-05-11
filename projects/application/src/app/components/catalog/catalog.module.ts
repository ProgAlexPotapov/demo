import { NgModule } from '@angular/core';
import { SharedModule } from '../../modules/shared/shared.module';
import { CatalogComponent } from './catalog.component';
import { CatalogRoutingModule } from './catalog-routing.module';
import { QuickFormComponent } from './quick-form/quick-form.component';
import { CatalogCardComponent } from './catalog-card/catalog-card.component';

import { FilterService } from './catalog-data/filter/filter.service';
import { CarSelectedService } from './catalog-data/car-selected/car-selected.service';
import { CatalogService } from './catalog-data/catalog/catalog.service';

@NgModule({
  imports: [SharedModule, CatalogRoutingModule],
  declarations: [CatalogComponent, QuickFormComponent, CatalogCardComponent],
  providers: [ CatalogService, FilterService, CarSelectedService]
})
export class CatalogModule {
}
