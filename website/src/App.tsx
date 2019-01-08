import React, { FunctionComponent, Component } from 'react';
import Button from './creations/Button';

export default class App extends Component {
  public interval?: NodeJS.Timeout;
  public state = {
    color: 'green',
  };
  public componentDidMount() {
    // this.interval = setInterval(() => {
    //   this.setState({ color: this.state.color === 'green' ? 'blue' : 'green' });
    // }, 4000);
  }
  public componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
  public render() {
    return (
      <div>
        <Button color={this.state.color}>Hello world!</Button>
        <Button version="danger">Hello world!</Button>
      </div>
    );
  }
}
