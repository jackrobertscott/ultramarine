export default {
  colors: new Map()
    .set('light', {
      solid: '#FFFFFF',
      faded: '#FFFFFF',
      fonts: '#000000',
    })
    .set('dark', {
      solid: '#000000',
      faded: '#555555',
      fonts: '#FFFFFF',
    })
    .set('ghost', {
      solid: '#ECEFF1',
      faded: '#607D8B',
      fonts: '#000000',
    }),

  sizes: new Map()
    .set('slim', {
      sides: ['4px', '8px'],
      radius: '3px',
    })
    .set('nice', {
      sides: ['10px', '14px'],
      radius: '5px',
    })
    .set('mega', {
      sides: ['30px', '34px'],
      radius: '15px',
    }),

  shadows: new Map()
    .set('simple', '3px 3px 3px 0 rgba(0, 0, 0, 0.3)')
    .set('phantom', '0 20px 20px -10px rgba(0, 0, 0, 0.3)'),
};
