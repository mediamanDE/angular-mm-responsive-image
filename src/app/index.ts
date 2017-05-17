import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MmResponsiveImageComponent } from './mm-responsive-image.component';

export * from './mm-responsive-image.component';
export * from './responsive-image.interface';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        MmResponsiveImageComponent
    ],
    exports: [
        MmResponsiveImageComponent
    ]
})
export class MmResponsiveImage {

}

export { ResponsiveImageInterface } from './responsive-image.interface';
