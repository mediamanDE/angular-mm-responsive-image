# mm-responsive-image

## Installation

To install this library, run:

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

## Inputs

The component accepts the following inputs:

- `sources` An array of sources (`{width: number, src: string}`)
- `fallbackSource` The default image source
- `alt` The alt-attribute value of the image

## License

MIT © [mediaman GmbH](mailto:hallo@mediaman.de)