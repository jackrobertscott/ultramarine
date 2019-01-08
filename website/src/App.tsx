import React, { Component } from 'react';
import Button from './creations/Button';

export default class App extends Component {
  public interval?: NodeJS.Timeout;
  public state = {
    color: 'green',
    count: 0,
  };
  // public componentDidMount() {
  //   this.interval = setInterval(() => {
  //     this.setState({
  //       color: this.state.color === 'green' ? 'blue' : 'green',
  //       count: this.state.count + 1,
  //     });
  //   }, 4000);
  // }
  // public componentWillUnmount() {
  //   if (this.interval) {
  //     clearInterval(this.interval);
  //   }
  // }
  public render() {
    return (
      <div>
        <Button color={this.state.color}>Hello world!</Button>
        {this.state.count < 1 && <Button color="green">Hello world!</Button>}
        <Button as="span" version="danger" color="green">
          Hello world!
        </Button>
        <Button version="danger">Hello world!</Button>
      </div>
    );
  }
}
