import Ultra from 'ultramarine';

const Text = Ultra.create('span', () => ({
  fontSize: '14px',
  color: '#000',
}));

Text.version('small', () => ({
  fontSize: '10px',
}));

export default Text;
