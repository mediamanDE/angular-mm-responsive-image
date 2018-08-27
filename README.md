# mm-responsive-image

Responsive image component for Angular.

Wraps the HTML5 [picture element](https://developer.mozilla.org/de/docs/Web/HTML/Element/picture) to make it easier and 
more convenient to use.

[![Build Status](https://travis-ci.org/mediamanDE/angular-mm-responsive-image.svg?branch=master)](https://travis-ci.org/mediamanDE/angular-mm-responsive-image)

![Demo GIF](https://raw.githubusercontent.com/mediamanDE/angular-mm-responsive-image/master/demo.gif)

## Installation

To install the component with [npm](https://www.npmjs.com/) run:

```
$ npm install mm-responsive-image --save
```

## Usage

To use the `mm-responsive-image` component, add it to your `AppModule`:

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import the component
import { MmResponsiveImageComponent } from 'mm-responsive-image';

@NgModule({
  declarations: [
    AppComponent,

    // Specify your component as an declaration
    MmResponsiveImageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once the component is declared, you can start using it:

```
<mm-responsive-image [sources]="[{width: 1280, src: 'http://placehold.it/800x800'}, {width: 860, src: 'http://placehold.it/600x600'}]"
    [fallbackSource]="'http://placehold.it/400x400'"
    [alt]="'Just a placeholder'"></mm-responsive-image>
```

**Note**: There's no need to sort the sources by their width, this will be done by the component itself.

## Polyfill

Because [picture element](http://caniuse.com/#feat=picture) are not supported by all browsers you may need 
to use a polyfill library, like [picturefill](https://github.com/scottjehl/picturefill).

## Inputs

The component accepts the following inputs:

- `sources` An array of sources (`{width: number, src: string}`)
- `fallbackSource` The default image source. If not set, it will be the smallest source from the `sources` array
- `alt` The alt-attribute value of the image

## License

MIT © [mediaman GmbH](mailto:hallo@mediaman.de)
