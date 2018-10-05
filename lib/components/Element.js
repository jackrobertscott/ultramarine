import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import core from '../styles/core';
import custom from '../styles/custom';

/**
 * The styles are stored in a sub property on the
 * element. This is so that those properties do
 * not conflict with other properties on the component.
 */
const Element = styled(({ use, ...props }) =>
  React.createElement(use, props),
).attrs({
  className: 'ultra-core ultra-custom',
})`
  &.ultra-core {
    ${core};
  }
  &.ultra-custom {
    ${({ ultra = {} }) => custom(ultra)};
  }
`;

Element.propTypes = {
  use: PropTypes.any,
};

Element.defaultProps = {
  use: 'div',
};

export default Element;
