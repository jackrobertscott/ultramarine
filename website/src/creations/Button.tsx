import * as React from 'react';
import Ultra from 'ultramarine';

const Button = Ultra.create('div', ({ color }: { color: string }) => ({
  backgroundColor: color || 'green',
  '&:hover': {
    color: 'yellow',
  },
}));

const ButtonNew = ({ children, ...props }: any) => (
  <button {...props}>{children}</button>
);

Button.version(
  'danger',
  () => ({
    backgroundColor: 'red',
    '&:hover': {
      color: 'green',
    },
  }),
  ButtonNew,
);

export default Button;
