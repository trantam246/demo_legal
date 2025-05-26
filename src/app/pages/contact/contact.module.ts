import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactRoutingModule } from './contact-routing.module';
@NgModule({
  declarations: [ContactListComponent, ContactDetailComponent],
  imports: [CommonModule, ContactRoutingModule, NzButtonModule],
})
export class ContactModule {}
