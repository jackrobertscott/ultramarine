# ultramarine

> 🐳 Functional styling for React components.

## Installation

Using npm:

```shell
npm i --save ultramarine
```

Using yarn:

```shell
yarn add ultramarine
```

Then import the helper classes where needed.

```ts
import { Creation } from 'ultramarine';
```

## Overview

We took a new, more functional approach to styling components.

Considerations in design:

- Styles are arranged per-component, which is similar to the BEM system.
- We use CSS-in-JS so that code reuse can be performed easily with variables between files.
- Props which are placed on the React component can be accessed easily in function set on the `styles` property.
- The default element can be easily changed between versions.

The coolest feature by far (or at least we think so) is that all of the in-browser default styles - which are added to elements such as inputs - are reset to nothing. That way, no matter which element that you use (e.g. `button`, `input`, `div`), they will all initially look the same and have the same styles. You will need to add styles to make them look good. That's good because it means you never have to *remove* the bloody default styles each time you style an element.

Instead, you're starting with a clean slate every time!

```ts
import Ultra from 'ultramarine';

const Button = Ultra.create('div', ({ active }) => ({
  backgroundColor: active ? 'green' : 'yellow',
  color: 'yellow',
  padding: '1em',
}));

Button.version('danger:button', () => ({
  backgroundColor: 'red',
  hover: {
    color: 'lightRed',
  },
  '&:nth-child(3n)': {
    color: 'darkRed',
  },
}));

Button.version('big', () => ({
  padding: '3em',
}));

export default Button;
```

Then you just need to import that component and start using it.

```ts
import React, { FunctionComponent } from 'react';
import { Button, Layout } from '../creations';

interface IHelloWorldProps {
  active: boolean;
}

const HelloWorld: FunctionComponent<IHelloWorldProps> = ({ active }) => (
  <Card>
    <Layout version="rows">
      <Button version="danger big" active={active} />
    </Layout>
  </Card>
);

export default HelloWorld;
```

How clean is that... I just want to kiss the computer sometimes 😍

## API

### `const Button = new Creation()`

Each time you would like to create a new element and start styling it, import the creation class and add you styles in the `styles` property.

```ts
import Ultra from 'ultramarine';

const Button = Ultra.create('div', ({ active }) => ({
  backgroundColor: active ? 'green' : 'yellow',
  color: 'yellow',
  padding: '1em',
}));

export default Button;
```

### `Button.version()`

When you want to create a new version of a creation component, add in the styles and give it a name you can reference in React.

```ts
Button.version('danger:button', () => ({
  backgroundColor: 'red',
  hover: {
    color: 'lightRed',
  },
  '&:nth-child(3n)': {
    color: 'darkRed',
  },
}));
```

The name of the version follows the pattern `name:element` so that you can easily change the element type if you desire. If you don't want to change the default element of the creation, then leave it out e.g. `Button.version('big')` vs `Button.version('big:a')`.

### `<Button />`

To use the button, you simple add it into the dom.

```
import Button from '../creations/Button';

interface IHelloWorldProps {
  active: boolean;
}

const HelloWorld: FunctionComponent<IHelloWorldProps> = ({ active }) => (
  <Card>
    <Button version="danger otherVersion" active={active} />
  </Card>
);
```

## Authors

- Jack Scott [@jacrobsco](https://twitter.com/jacrobsco) - I tweet about startups and coding.
