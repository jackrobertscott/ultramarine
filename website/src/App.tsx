import React, { FunctionComponent } from 'react';
import Ultra from 'ultramarine';

const Example = Ultra.create('div', () => ({}));

console.log(Example);

const App: FunctionComponent<{}> = () => {
  return <div>Hello world!</div>;
};

export default App;
