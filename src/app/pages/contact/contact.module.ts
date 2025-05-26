import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactRoutingModule } from './contact-routing.module';
@NgModule({
  declarations: [ContactListComponent, ContactDetailComponent],
  imports: [
    CommonModule,
    ContactRoutingModule,
    NzPageHeaderModule,
    NzDropDownModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzTabsModule,
    NzTableModule,
    NzAvatarModule,
    NzTagModule,
    NzCollapseModule,
    NzPaginationModule,
    NzSwitchModule,
    NzSelectModule,
    NzGridModule,
    NzCheckboxModule,
    SharedModule,
  ],
})
export class ContactModule {}
