import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import core from '../styles/core';
import custom from '../styles/custom';

export default class Element extends Component {
  static propTypes = {
    /** The HTML element to use. */
    use: PropTypes.any,
  };

  static defaultProps = {
    use: 'div',
  };

  constructor(...args) {
    super(...args);
    this.state = {
      // code...
    };
  }

  /**
   * The styles are stored in a sub property on the
   * element. This is so that those properties do
   * not conflict with other properties on the component.
   */
  render() {
    const { use, children } = this.props;
    const Styled = styled(use)`
      &.ultra-core {
        ${core};
      }
      &.ultra-custom {
        ${props => custom(props.ultra || {})};
      }
    `;
    return (
      <Styled className="ultra-core ultra-custom" {...this.props}>
        {children}
      </Styled>
    );
  }
}
