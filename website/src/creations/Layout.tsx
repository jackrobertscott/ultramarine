import Ultra from 'ultramarine';

const Layout = Ultra.create('div', () => ({
  display: 'flex',
  flexGrow: 1,
  flexDirection: 'row',
  width: 'auto',
  margin: 'auto',
  '& > *': {
    flexGrow: 1,
  },
}));

Layout.version('rows', () => ({
  flexDirection: 'row',
}));

Layout.version('columns', ({ spaced }: any) => ({
  flexDirection: 'column',
  '& > *': {
    marginBottom: spaced && '20px',
  },
}));

Layout.version('container', () => ({
  width: '600px',
  margin: '20px auto',
}));

export default Layout;
