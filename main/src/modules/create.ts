import * as React from 'react';

export type ICSS = (
  props: any,
) => {
  [name: string]: string;
};

export default function create(type: string, styles: ICSS) {
  return React.createElement(type, {});
}
