# ssuit

A scss library for creating modular css


## Install

```cli
npm i ssuit -D
```

## Usage

ssuit consists of several mixins and functions representing modular css structures, e.g. components, modifiers etc, thus it provides an abstraction layer which hides all the ugly shit from your source.

> Note: `ssuit` is intented for being used at application level and is currently not suited for being incorporated into a dedicated scss library

While being designed to be compliant with [SUIT](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md), it can be configured to match classic BEM as well. However, maintained support for BEM is currently not in scope of the project.

Here's how it works at a blush...


### Components

Apart from the component structure itself typically consists of so-called "modifiers", "descendents" as well as "states". All of these are represented by mixins that take a block of scss-code. Apart from that, with every structure, correspondent functions exist by which you retrieve the actual name containing its appropriate delimiters.

```scss
@include component(Button) {
  -webkit-appearance: none;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-width: 1px;
  background: lightgray;
  border-color: lightgray;
  border-style: solid;
  $self: &;

  @include modifier(primary) {
    background: yellow;
    border-color: yellow;
  }

  @include modifier(secondary) {
    background: peachpuff;
    border-color: peachpuff;
  }

  &#{modifier(secondary)} {
    background: peachpuff;
    border-color: peachpuff;
  }

  @include modifier(outline) {
    background: white;
    border-color: lightgray;

    &#{modifier(primary)} {
      border-color: yellow;
    }

    &#{modifier(secondary)} {
      border-color: peachpuff;
    }
  }

  @include descendent(label) {
    text-transform: uppercase;
  }

  @include state(disabled) {
    border-style: groove;
  }

  &#{state(disabled)} {
    background: pink;
  }
}
```

Which compiles to:

```css
.Button {
  -webkit-appearance: none;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-width: 1px;
  background: lightgray;
  border-color: lightgray;
  border-style: solid;
}

.Button--primary {
  background: yellow;
  border-color: yellow;
}

.Button--secondary {
  background: peachpuff;
  border-color: peachpuff;
}

.Button--secondary {
  background: peachpuff;
  border-color: peachpuff;
}

.Button--outline {
  background: white;
  border-color: lightgray;
}

.Button--outline--primary {
  border-color: yellow;
}

.Button--outline--secondary {
  border-color: peachpuff;
}

.Button .Button-label {
  text-transform: uppercase;
}

.Button.is-disabled {
  border-style: groove;
}

.Button.is-disabled {
  background: pink;
}
```

### Utilities

Utilities may optionally have a value as well as a breakpoint identifier, such as `sm`, `md`, `lg`. By default, a value identifier gets concatenated by camelizing while breakpoint is inserted within the utility prefix (typically `u-`) and the actual utility name. However, this may be configured.

```scss
@include utility('background', primary) {
  background-color: yellow;
}

@include utility('background', secondary) {
  background-color: peachpuff;
}

@include utility('background', secondary, $breakpoint: sm) {
  background-color: peachpuff;
}
```

Compiles to:

```css
.u-backgroundPrimary  {
  background-color: yellow;
}

.u-backgroundSecondary  {
  background-color: peachpuff;
}

.u-sm-backgroundSecondary  {
  background-color: peachpuff;
}
```


### Namespace

It is recommended to insert a namespace during further pre-compilation. This could be done by [postcss-namespace](https://www.npmjs.com/package/postcss-class-namespace), [postcss-modules](https://www.npmjs.com/package/postcss-modules) or whatever other tool of your preference. However, there's also a `namespace`-mixin provided by this package which wraps its content within the given selector.

```scss
@include namespace(ns) {
  @include component(Button) {
    font-size: 30px;

    @include modifier(primary) {
      background: yellow;
      border-color: yellow;
      outline: 2px solid peachpuff;
    }
  }
}
```

Which results in:

```css
.ns-Button {
  font-size: 30px;
}

.ns-Button--primary {
  background: yellow;
  border-color: yellow;
  outline: 2px solid peachpuff;
}
```

### Variables

ssuit can be configured by global variables. Please note that if you plan to build some scss-library on top of ssuit, you shouldn't touch variables but instead pass in all your specific parameters as arguments to the individual mixins and functions.

```scss
$namespace: '' !default;
$namespace-delimiter: '-' !default;

$modifier-delimiter: '--' !default;
$modifier-style: '' !default;
$modifier-value-delimiter: '' !default;

$state-prefix: 'is-' !default;

$descendent-delimiter: '-' !default;

$utility-prefix: 'u-' !default;
$utility-style: camelCase !default;
$utility-breakpoint-delimiter: '-' !default;
$utility-value-delimiter: '' !default;
```


## Development

In order to run specs, issue the following from your terminal:

```cli
npm test
```

Run dev-server

```cli
npm start
```

Create a build (for whatever purpose)

```cli
npm run build
```
