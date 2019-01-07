import * as React from 'react';
import * as equal from 'fast-deep-equal';
import { StyleSheet } from 'jss';
import cssinjss from '../utils/cssinjs';
import { IStyler } from './Creation';

function renderCreation(type: string, props: any, className: string) {
  const classNames: string = props.className || '';
  const cleanedClassNames = className
    ? classNames.replace(className, '')
    : classNames;
  const classes = [cleanedClassNames, className].join(' ').trim();
  return React.createElement(type, {
    ...props,
    className: classes,
  });
}

export default function create(type: string, styles: IStyler) {
  let appliedStyles: unknown;
  let appliedClassName: string;
  let appliedStyleSheet: StyleSheet;
  return (...args: any[]) => {
    const [props] = args;
    const createdStyles = styles(props);
    /**
     * Nothing changed in styles so we will just render
     * the component without updating the style sheet.
     */
    if (appliedStyles && equal(createdStyles, appliedStyles)) {
      return renderCreation(type, args[0], appliedClassName);
    }
    /**
     * Remove the old class name and styles.
     */
    if (appliedStyleSheet) {
      appliedStyleSheet.detach();
    }
    /**
     * Create the new classes and attach to the dom.
     */
    const sheet = cssinjss
      .createStyleSheet({
        [type]: createdStyles as any,
      })
      .attach();
    appliedStyles = createdStyles;
    appliedStyleSheet = sheet;
    appliedClassName = sheet.classes[type];
    return renderCreation(type, args[0], appliedClassName);
  };
}
