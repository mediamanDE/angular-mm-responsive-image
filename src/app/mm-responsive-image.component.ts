import { Component, Input, OnChanges } from '@angular/core';
import { ResponsiveImageInterface } from './responsive-image.interface';

@Component({
    selector: 'mm-responsive-image',
    template: `<picture class="mm-responsive-image">
                    <source *ngFor="let source of sources"
                            [srcset]="source.src"
                            [media]="'(min-width: ' + source.width + 'px)'">
                    <img [srcset]="fallbackSource" [alt]="alt">
                </picture>`
})
export class MmResponsiveImageComponent implements OnChanges {

    /**
     * The image sources
     *
     * @type {Array<ResponsiveImageInterface>}
     */
    @Input() sources: Array<ResponsiveImageInterface> = [];

    /**
     * Fallback image source
     * If not set, it will be the smallest source from the ::sources array
     *
     * @type {string}
     */
    @Input() fallbackSource: string = '';

    /**
     * The images alt text
     *
     * @type {string}
     */
    @Input() alt: string = '';

    /**
     * @inheritDoc
     */
    ngOnChanges() {
        this.sources.sort((a: ResponsiveImageInterface, b: ResponsiveImageInterface) => b.width - a.width);

        if (!this.fallbackSource && this.sources.length) {
            this.fallbackSource = this.sources[(this.sources.length - 1)].src;
        }
    }
}
