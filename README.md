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

```js
import { ultra } from 'ultramarine';

const fonts = ultra({
  // code...
});
```

## Overview

A new approach to styling components, taking a more functional approach.

Considerations in design:

- Arrange your styles in groups of functional properties and use those groups to compose component styles.
- Write your styles as JavaScript objects which makes code reuse and refactoring simple.
- Default CSS is removed from all HTML elements so that you don't have to undo styles all the time.
- Properties values can only be strings and numbers to promote good code design.
- Mutations can be created to alter few of the properties and provides flexibility with styles.
- Actions are methods which can map component `props` onto mutations and styles.

```js
import { ultra } from 'ultramarine';

/**
 * Create a group of CSS properties and add some potential mutations.
 */
const paddings = ultra({
  base: { padding: '14px' },
  mutations: {
    tiny: { padding: '16px' },
    small: { padding: '16px' },
    medium: { padding: '16px' },
    big: { padding: '16px' },
  },
});

/**
 * Groups of multiple properties can be created as well.
 */
const fonts = ultra({
  base: {
    lineHeight: '1.15',
    fontFamily: 'inherit',
    fontSize: '100%',
    fontWeight: 'normal',
  },
  mutations: {
    primary: {
      fontSize: '20px',
      fontWeight: 'bold',
    },
    mono: {
      fontFamily: 'monospace',
    },
    active: {
      color: 'blue',
    },
  },
  combos: {
    deactivate: ({ deactivate }) => ({
      active: !deactivate,
      mono: deactivate,
    }),
  },
});
```

Import the themes and use them to construct new components.

```js
import React from 'react';
import { compose } from 'ultramarine';
import { paddings, fonts } from '../themes';
import config from '../config';

/**
 * Create a styled React component with your themes.
 */
const StyledComponent = compose({
  as: 'div',
  theme: [
    paddings,
    fonts.add({
      mutations: {
        primary: config.compressed ? true : false,
      },
      combos: {
        deactivate: true,
      },
    }),
  ],
  extra: {
    backgroundColor: 'green',
  },
});

/**
 * Use the styled react component like normal, or get create an element
 * directly from the theme.
 */
const HelloWorld = ({ active }) => (
  <StyledComponent active={active}>
    <fonts.Instance as="span" mutations={{ mono: true }}>
      Hello world!
    </fonts.Instance>
  </StyledComponent>
);
```

## API

### Config

Each theme is configured with a `config` object:

```js
const theme = ultra(config);
```

This config object will contain all the information required by the theme.

#### `config.base`

- Type: `object`
- Required: `false`

A group of base styles which will applied when this theme is used.

```js
const fonts = ultra({
  base: {
    // styles...
  },
});
```

Example:

```js
const fonts = ultra({
  base: {
    fontSize: '14px',
    lineHeight: '1.5em',
  },
});
```

Properties:

- `base[cssProperty]` [string]: add multiple css properties which are in camelCase as opposed to kebab-case (which is what CSS uses).

#### `config.mutations`

- Type: `object`
- Required: `false`

A set of mutations to the base CSS styles which are applied only when they are needed.

```js
const fonts = ultra({
  mutations: {
    // code...
  },
});
```

Example:

```js
const fonts = ultra({
  mutations: {
    primary: {
      fontSize: '20px',
      fontWeight: 'bold',
    },
    mono: {
      fontFamily: 'monospace',
    },
    active: {
      color: 'blue',
    },
  },
});
```

Properties:

- `mutations[mutationName][cssProperty]` [string]: similar to the `base` property, name your mutations and then provide them CSS variables.

#### `config.combos`

- Type: `object`
- Required: `false`

A set of methods which can take React element props and combine them with mutations to turn those mutations on and off.

```js
const fonts = ultra({
  combos: {
    // code...
  },
});
```

Example:

```js
const fonts = ultra({
  base: {
    color: 'black',
  },
  mutations: {
    mono: {
      fontFamily: 'monospace',
    },
    active: {
      color: 'blue',
    },
  },
  combos: {
    deactivate: ({ deactivate }) => ({
      active: !deactivate,
      mono: deactivate,
    }),
  },
});
```

Properties:

- `combos[comboName]` [func]: a function which recieves props as the first argument and should return a set of mutation names with boolean values relating to if those mutations should be on or off.

### Elements

To use our themes, we can **compose** them into a React element.

```js
const StyledComponent = compose(composeConfig);
```

Notice the difference between `ultra` and `compose` which both have seperate functions.

#### `composeConfig.as`

- Type: `string` | `node`
- Required: `true`

This will be the type of node that will be used to apply the styles to.

```js
const StyledComponent = compose({
  as: 'div',
});
```

#### `composeConfig.theme`

- Type: `array`
- Required: `true`

This is an array of the themes which will be used to compose the visuals of the component.

```js
const StyledComponent = compose({
  theme: [
    // themes...
  ],
});
```

Example:

```js
const StyledComponent = compose({
  theme: [
    paddings,
    fonts.add({
      mutations: {
        primary: config.compressed ? true : false,
      },
      combos: {
        deactivate: true,
      },
    }),
  ],
});
```

As you can see, the entries to the array can be just the theme itself (e.g. `paddings`) or it can specify the mutations and combos you wish to use from the theme (e.g. `fonts.add({})`).

**Note:** the `add` method accepts `mutations` and `combos` as properties. These properties should be objects which specify the mutation or combo to use and a boolean value of wether to include them or not (see the example).

#### `composeConfig.extra`

- Type: `object`
- Required: `false`

This is a group of CSS properties which are can be used to add extra styling to the component when the themes are not enough.

```js
const StyleComponent = compose({
  extra: {
    // css...
  },
});
```

Example:

```js
const StyleComponent = compose({
  extra: {
    backgroundColor: 'green',
    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.3)',
  },
});
```

Properties:

- `extra[cssProperty]` [string]: add multiple css properties which are in camelCase as opposed to kebab-case (which is what CSS uses).

### Usage

To use the themes, simply use the component that is created by the `compose` method in your normal React code.

```js
const Wrap = compose({
  as: 'div',
  theme: [
    fonts.add({
      combos: {
        deactivate: true,
      },
    }),
  ]
});

const HelloWorld = ({ isActive }) => (
  <Wrap deactivate={!isActive}>
    <span>Hello world!</span>
  <Wrap>
);
```

In the above example, the `deactivate` property which is set on the `Wrap` element can be used by any combos which were added to the theme.

#### `theme.Instance`

- Type: `node`

You can quickly create an insance of a theme as a react element with the `theme.Instance` property.

```js
const HelloWorld = ({ isActive }) => (
  <div>
    <fonts.Instance
      mutations={{ mono: true }}
      combos={{ active: true }}
      deactivate={!isActive}
    >
      Hello world!
    </fonts.Instance>
  </div>
);
```

You can see the `mutations` and `combos` properties on the element should correspond to the properties in the `theme.add` method (as shown in above docs).
