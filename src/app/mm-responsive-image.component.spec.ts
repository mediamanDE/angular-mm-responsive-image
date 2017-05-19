import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MmResponsiveImageComponent } from './mm-responsive-image.component';
import { ResponsiveImageInterface } from './responsive-image.interface';

describe('MmResponsiveImageComponent', () => {
    const sourcesMock: Array<ResponsiveImageInterface> = [
        {
            width: 800,
            src: 'http://placehold.it/800x800'
        },
        {
            width: 1000,
            src: 'http://placehold.it/1000x1000'
        },
        {
            width: 400,
            src: 'http://placehold.it/400x400'
        },
        {
            width: 600,
            src: 'http://placehold.it/600x600'
        }
    ];
    let component: MmResponsiveImageComponent;
    let fixture: ComponentFixture<MmResponsiveImageComponent>;
    let compiled;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MmResponsiveImageComponent
            ]
        });

        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(MmResponsiveImageComponent);
            compiled = fixture.debugElement;
            component = fixture.componentInstance;

            fixture.detectChanges();
        });
    }));

    describe('::sources', () => {
        it('should have the correct default value', () => {
            expect(component.sources).toEqual([]);
        });
    });

    describe('::fallbackSource', () => {
        it('should have the correct default value', () => {
            expect(component.fallbackSource).toEqual('');
        });
    });

    describe('::alt', () => {
        it('should have the correct default value', () => {
            expect(component.alt).toEqual('');
        });
    });

    describe('::ngOnChanges', () => {
        it('should sort the ::sources property by width', () => {
            component.sources = sourcesMock;

            component.ngOnChanges();

            expect(component.sources[0].width).toBe(1000);
            expect(component.sources[1].width).toBe(800);
            expect(component.sources[2].width).toBe(600);
            expect(component.sources[3].width).toBe(400);
        });

        it('should take the smallest image as the ::fallbackSource if it was not set explicitly', () => {
            component.sources = sourcesMock;

            component.ngOnChanges();

            expect(component.fallbackSource).toBe(component.sources[3].src);
        });

        it('should not set the ::fallbackSource if there are no ::sources', () => {
            component.ngOnChanges();

            expect(component.fallbackSource).toBe('');
        });
    });

    it('should have a picture element with sources from the ::sources property', () => {
        const pictureEl = compiled.query(By.css('.mm-responsive-image'));

        component.sources = sourcesMock;
        fixture.detectChanges();

        const sourceEls = pictureEl.queryAll(By.css('source'));

        expect(sourceEls.length).toBe(sourcesMock.length);

        expect(sourceEls[0].nativeElement.getAttribute('srcset')).toBe(sourcesMock[0].src);
        expect(sourceEls[0].nativeElement.getAttribute('media')).toBe(`(min-width: ${component.sources[0].width}px)`);

        expect(sourceEls[1].nativeElement.getAttribute('srcset')).toBe(sourcesMock[1].src);
        expect(sourceEls[1].nativeElement.getAttribute('media')).toBe(`(min-width: ${component.sources[1].width}px)`);

        expect(sourceEls[2].nativeElement.getAttribute('srcset')).toBe(sourcesMock[2].src);
        expect(sourceEls[2].nativeElement.getAttribute('media')).toBe(`(min-width: ${component.sources[2].width}px)`);

        expect(sourceEls[3].nativeElement.getAttribute('srcset')).toBe(sourcesMock[3].src);
        expect(sourceEls[3].nativeElement.getAttribute('media')).toBe(`(min-width: ${component.sources[3].width}px)`);
    });

    it('should have a fallback image from the ::fallbackSource property', () => {
        const pictureEl = compiled.query(By.css('.mm-responsive-image'));
        const fallbackImageEl = pictureEl.query(By.css('img'));

        component.fallbackSource = 'http://placehold.it/50x50';

        fixture.detectChanges();

        expect(fallbackImageEl.nativeElement.getAttribute('srcset')).toBe(component.fallbackSource);
    });

    it('should populat the images alt attributes', () => {
        const pictureEl = compiled.query(By.css('.mm-responsive-image'));
        const fallbackImageEl = pictureEl.query(By.css('img'));

        component.alt = 'Responsive image';

        fixture.detectChanges();

        expect(fallbackImageEl.nativeElement.getAttribute('alt')).toBe(component.alt);
    });
});
