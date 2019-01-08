import React, { FunctionComponent } from 'react';
import Button from './creations/Button';

const App: FunctionComponent<{}> = () => {
  return (
    <div>
      <Button color="blue">Hello world!</Button>
      <Button version="danger">Hello world!</Button>
    </div>
  );
};

export default App;
