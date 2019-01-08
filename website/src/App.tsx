import React, { Component } from 'react';
import Text from './creations/Text';
import Layout from './creations/Layout';
import Shape from './creations/Shape';

export default class App extends Component {
  public render() {
    return (
      <Layout version="container columns" spaced={true}>
        <Shape version="card">
          <Text>Hello world!</Text>
        </Shape>
        <Shape as="button" version="card">
          <Text>Hello second world!</Text>
        </Shape>
      </Layout>
    );
  }
}
