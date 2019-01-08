import Ultra from 'ultramarine';

const Button = Ultra.create('div', ({ color }: { color: string }) => ({
  backgroundColor: color || 'green',
}));

Button.version('danger:button', () => ({
  backgroundColor: 'red',
}));

export default Button;
