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


@NgModule({
  declarations: [
    ResourcesListComponent,
    CreateResourceComponent,
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
    })
  ],
  providers: [ResourcesService],
  exports: [],
})
export class ResourcesModule { }
