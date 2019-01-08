import Ultra from 'ultramarine';

const Shape = Ultra.create('div', () => ({
  backgroundColor: '#ffffff',
  boxShadow: 'none',
  borderRadius: '0',
  padding: 0,
}));

Shape.version('card', () => ({
  boxShadow: '0 3px 10px rgba(0, 0, 0, 0.05)',
  borderRadius: '3px',
  padding: '20px',
}));

export default Shape;
