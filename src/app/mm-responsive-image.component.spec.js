"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var mm_responsive_image_component_1 = require("./mm-responsive-image.component");
describe('MmResponsiveImageComponent', function () {
    var sourcesMock = [
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
    var component;
    var fixture;
    var compiled;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                mm_responsive_image_component_1.MmResponsiveImageComponent
            ]
        });
        testing_1.TestBed.compileComponents().then(function () {
            fixture = testing_1.TestBed.createComponent(mm_responsive_image_component_1.MmResponsiveImageComponent);
            compiled = fixture.debugElement;
            component = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));
    describe('::sources', function () {
        it('should have the correct default value', function () {
            expect(component.sources).toEqual([]);
        });
    });
    describe('::fallbackSource', function () {
        it('should have the correct default value', function () {
            expect(component.fallbackSource).toEqual('');
        });
    });
    describe('::alt', function () {
        it('should have the correct default value', function () {
            expect(component.alt).toEqual('');
        });
    });
    describe('::ngOnChanges', function () {
        it('should sort the ::sources property by width', function () {
            component.sources = sourcesMock;
            component.ngOnChanges();
            expect(component.sources[0].width).toBe(1000);
            expect(component.sources[1].width).toBe(800);
            expect(component.sources[2].width).toBe(600);
            expect(component.sources[3].width).toBe(400);
        });
    });
    it('should have a picture element with sources from the ::sources property', function () {
        var pictureEl = compiled.query(platform_browser_1.By.css('.mm-responsive-image'));
        component.sources = sourcesMock;
        fixture.detectChanges();
        var sourceEls = pictureEl.queryAll(platform_browser_1.By.css('source'));
        expect(sourceEls.length).toBe(sourcesMock.length);
        expect(sourceEls[0].nativeElement.getAttribute('srcset')).toBe(sourcesMock[0].src);
        expect(sourceEls[0].nativeElement.getAttribute('media')).toBe("(min-width: " + component.sources[0].width + "px)");
        expect(sourceEls[1].nativeElement.getAttribute('srcset')).toBe(sourcesMock[1].src);
        expect(sourceEls[1].nativeElement.getAttribute('media')).toBe("(min-width: " + component.sources[1].width + "px)");
        expect(sourceEls[2].nativeElement.getAttribute('srcset')).toBe(sourcesMock[2].src);
        expect(sourceEls[2].nativeElement.getAttribute('media')).toBe("(min-width: " + component.sources[2].width + "px)");
        expect(sourceEls[3].nativeElement.getAttribute('srcset')).toBe(sourcesMock[3].src);
        expect(sourceEls[3].nativeElement.getAttribute('media')).toBe("(min-width: " + component.sources[3].width + "px)");
    });
    it('should have a fallback image from the ::fallbackSource property', function () {
        var pictureEl = compiled.query(platform_browser_1.By.css('.mm-responsive-image'));
        var fallbackImageEl = pictureEl.query(platform_browser_1.By.css('img'));
        component.fallbackSource = 'http://placehold.it/50x50';
        fixture.detectChanges();
        expect(fallbackImageEl.nativeElement.getAttribute('srcset')).toBe(component.fallbackSource);
    });
    it('should populat the images alt attributes', function () {
        var pictureEl = compiled.query(platform_browser_1.By.css('.mm-responsive-image'));
        var fallbackImageEl = pictureEl.query(platform_browser_1.By.css('img'));
        component.alt = 'Responsive image';
        fixture.detectChanges();
        expect(fallbackImageEl.nativeElement.getAttribute('alt')).toBe(component.alt);
    });
});
//# sourceMappingURL=mm-responsive-image.component.spec.js.map