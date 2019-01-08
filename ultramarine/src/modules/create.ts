import * as React from 'react';
import * as equal from 'fast-deep-equal';
import { StyleSheet } from 'jss';
import cssinjss from '../utils/cssinjs';
import Creation, { IStyler } from './Creation';

export type IRenderer = React.FunctionComponent<any> & {
  version: (name: string, versionStyler: IStyler) => void;
};

/**
 * Create a component with the appropriate class names attached.
 */
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

/**
 * Expose the api to the users and control the rendering of
 * styles on the document.
 */
export default function create(type: string, styler: IStyler) {
  let appliedStyles: unknown;
  let appliedClassName: string;
  let appliedStyleSheet: StyleSheet;
  const creation = new Creation(type, styler);
  const renderer: IRenderer = (props: any) => {
    const { version } = props;
    const { styles: createdStyles, type: createdType } = creation.stylize(
      props,
      version,
    );
    /**
     * Nothing changed in styles so we will just render
     * the component without updating the style sheet.
     */
    if (appliedStyles && equal(createdStyles, appliedStyles)) {
      return renderCreation(createdType, props, appliedClassName);
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
        [createdType]: createdStyles as any,
      })
      .attach();
    appliedStyles = createdStyles;
    appliedStyleSheet = sheet;
    appliedClassName = sheet.classes[createdType];
    return renderCreation(createdType, props, appliedClassName);
  };
  renderer.version = (name: string, versionStyler: IStyler) => {
    creation.version(name, versionStyler);
  };
  return renderer;
}
