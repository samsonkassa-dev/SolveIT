/** @kal **/

import { NgModule } from '@angular/core';
import { ResourcesListComponent } from './resources-list/resources-list.component';
import {CommonModule} from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';
import {SharedModule} from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ResourcesService} from './service/resources.service';
import { CreateResourceComponent } from './create-resource/create-resource.component';
import {NgCircleProgressModule} from 'ng-circle-progress';
import { ModalComponent } from './modal/modal.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {SolveitTeamGuardService} from '../Auth/services/solveit-team-guard.service';


@NgModule({
  declarations: [
    ResourcesListComponent,
    CreateResourceComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule,
    NgCircleProgressModule.forRoot({
      radius: 20,
      outerStrokeWidth: 8,
      innerStrokeWidth: 4,
      outerStrokeColor: '#78C000',
      innerStrokeColor: '#C7E596',
      animationDuration: 200,
      maxPercent: 100
    }),
    NgxPaginationModule
  ],
  providers: [ResourcesService, SolveitTeamGuardService],
  exports: [],
})
export class ResourcesModule { }
