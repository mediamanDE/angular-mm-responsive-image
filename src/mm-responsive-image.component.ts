import { Component, Input, OnChanges, ElementRef, ViewChild } from '@angular/core';
import { ResponsiveImageInterface } from './responsive-image.interface';
declare var picturefill: any;

@Component({
    selector: 'mm-responsive-image',
    template: `<picture #picture class="mm-responsive-image">
                    <source *ngFor="let source of sources"
                            [srcset]="source.src"
                            [media]="'(min-width: ' + source.width + 'px)'">
                    <img [srcset]="fallbackSource" [alt]="alt">
                </picture>`
})
export class MmResponsiveImageComponent implements OnChanges {

    /**
     * The picture element
     */
    @ViewChild('picture') pictureEl: ElementRef;

    /**
     * The image sources
     */
    @Input() sources: Array<ResponsiveImageInterface> = [];

    /**
     * Fallback image source
     * If not set, it will be the smallest source from the ::sources array
     */
    @Input() fallbackSource: string = '';

    /**
     * The images alt text
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

        // Use a polyfill if the component is used in a legacy browser
        if (typeof picturefill === 'function') {
            setTimeout(() => {
                const sourceEls = this.pictureEl.nativeElement.querySelectorAll('source');
                const fallbackEl = this.pictureEl.nativeElement.querySelector('img');

                Array.prototype.forEach.call(sourceEls, (sourceEl: HTMLSourceElement, i: number) => {
                    sourceEl.setAttribute('srcset', this.sources[i].src);
                });
                fallbackEl.setAttribute('srcset', this.fallbackSource);

                picturefill({reevaluate: true});
            });
        }
    }
}
