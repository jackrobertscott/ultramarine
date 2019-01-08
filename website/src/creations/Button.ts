import Ultra from 'ultramarine';

const Button = Ultra.create('div', ({ color }: { color: string }) => ({
  backgroundColor: color || 'green',
  '&:hover': {
    color: 'yellow',
  },
}));

Button.version('danger:button', () => ({
  backgroundColor: 'red',
  '&:hover': {
    color: 'green',
  },
}));

export default Button;
