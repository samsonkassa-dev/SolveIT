import { NgModule } from '@angular/core';

import { SolveitMgmtService } from './solveitMgmt.service';
import { Resource } from './resource/resource.component';
import { ShareResource } from './resource/shareResource/shareResource.component';
import { ViewResource } from './resource/viewResource/viewResource.component';

@NgModule({
    declarations: [
      Resource,
      ShareResource,
      ViewResource
    ],
    imports: [

    ],
    providers: [SolveitMgmtService],
    exports: []
})

export class SolveitMgmtModule {

}
