import * as React from 'react';
import * as equal from 'fast-deep-equal';
import { StyleSheet } from 'jss';
import cssinjss from '../utils/cssinjs';
import Creation, { IStyler, IMeta } from './Creation';

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

export interface IRendererProps {
  version?: string;
  [property: string]: any;
}

/**
 * Expose the api to the users and control the rendering of
 * styles on the document.
 */
export default function create(defaultType: string, styler: IStyler) {
  const creation = new Creation(defaultType, styler);
  return class Renderer extends React.Component<IRendererProps> {
    public static version = (name: string, versionStyler: IStyler) => {
      creation.version(name, versionStyler);
    };
    public context: IMeta & {
      sheets?: StyleSheet;
      className?: string;
    };
    constructor(props: any) {
      super(props);
      const { type, styles } = creation.stylize(props, props.version);
      this.context = {
        type,
        styles,
      };
    }
    public componentWillUnmount() {
      if (this.context.sheets) {
        this.context.sheets.detach();
      }
    }
    public render() {
      const { version } = this.props;
      const { type, styles } = creation.stylize(this.props, version);
      const { sheets, className } = this.attachStyles({ type, styles });
      this.updateContext({ type, styles, sheets, className });
      return renderCreation(type, this.props, className);
    }
    /**
     * Remove an old stylesheet (if one is found) and then create a new
     * style sheet.
     */
    public attachStyles({
      type,
      styles,
    }: IMeta): { sheets: StyleSheet; className: string } {
      if (
        this.context.sheets &&
        this.context.className &&
        equal(styles, this.context.styles) &&
        equal(type, this.context.type)
      ) {
        return {
          sheets: this.context.sheets,
          className: this.context.className,
        };
      }
      if (this.context.sheets) {
        this.context.sheets.detach();
      }
      const sheets = cssinjss
        .createStyleSheet({
          [type]: styles,
        })
        .attach();
      return {
        sheets,
        className: sheets.classes[type],
      };
    }
    /**
     * Patch the context of the item easily.
     */
    public updateContext(overrides: { [property: string]: any }): void {
      this.context = {
        ...this.context,
        ...overrides,
      };
    }
  };
}
