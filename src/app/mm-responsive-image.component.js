"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MmResponsiveImageComponent = (function () {
    function MmResponsiveImageComponent() {
        /**
         * The image sources
         *
         * @type {Array<ResponsiveImageInterface>}
         */
        this.sources = [];
        /**
         * Fallback image source
         * If not set, it will be the smallest source from the ::sources array
         *
         * @type {string}
         */
        this.fallbackSource = '';
        /**
         * The images alt text
         *
         * @type {string}
         */
        this.alt = '';
    }
    /**
     * @inheritDoc
     */
    MmResponsiveImageComponent.prototype.ngOnChanges = function () {
        var _this = this;
        this.sources.sort(function (a, b) { return b.width - a.width; });
        if (!this.fallbackSource && this.sources.length) {
            this.fallbackSource = this.sources[(this.sources.length - 1)].src;
        }
        // Use a polyfill if the component is used in a legacy browser
        if (typeof picturefill === 'function') {
            setTimeout(function () {
                var sourceEls = _this.pictureEl.nativeElement.querySelectorAll('source');
                var fallbackEl = _this.pictureEl.nativeElement.querySelector('img');
                Array.prototype.forEach.call(sourceEls, function (sourceEl, i) {
                    sourceEl.setAttribute('srcset', _this.sources[i].src);
                });
                fallbackEl.setAttribute('srcset', _this.fallbackSource);
                picturefill({ reevaluate: true });
            });
        }
    };
    return MmResponsiveImageComponent;
}());
__decorate([
    core_1.ViewChild('picture'),
    __metadata("design:type", core_1.ElementRef)
], MmResponsiveImageComponent.prototype, "pictureEl", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], MmResponsiveImageComponent.prototype, "sources", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MmResponsiveImageComponent.prototype, "fallbackSource", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MmResponsiveImageComponent.prototype, "alt", void 0);
MmResponsiveImageComponent = __decorate([
    core_1.Component({
        selector: 'mm-responsive-image',
        template: "<picture #picture class=\"mm-responsive-image\">\n                    <source *ngFor=\"let source of sources\"\n                            [srcset]=\"source.src\"\n                            [media]=\"'(min-width: ' + source.width + 'px)'\">\n                    <img [srcset]=\"fallbackSource\" [alt]=\"alt\">\n                </picture>"
    })
], MmResponsiveImageComponent);
exports.MmResponsiveImageComponent = MmResponsiveImageComponent;
//# sourceMappingURL=mm-responsive-image.component.js.map