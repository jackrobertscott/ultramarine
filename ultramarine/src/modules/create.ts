import * as React from 'react';
import Creation, { IStyler, IMeta } from './Creation';
import Sheets from './Sheets';
import clean from './clean';
import cssinjss from '../utils/cssinjs';

const cleanStyles = cssinjss
  .createStyleSheet({ clean }, { meta: 'ultramarine' })
  .attach();

/**
 * Create a component with the appropriate class names attached.
 */
function renderCreation(type: string, props: any, className: string) {
  const classNames: string = props.className || '';
  const resetClass: string = cleanStyles.classes.clean;
  const cleanedClassNames = className
    ? classNames.replace(resetClass, '').replace(className, '')
    : classNames.replace(resetClass, '');
  const classes = [cleanedClassNames, className, resetClass].join(' ').trim();
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
  const sheets = new Sheets();
  const creation = new Creation(defaultType, styler);
  return class Renderer extends React.Component<IRendererProps> {
    public static version = (name: string, versionStyler: IStyler) => {
      creation.version(name, versionStyler);
    };
    public context: IMeta & {
      id?: string;
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
      if (this.context.id) {
        /**
         * This may cause errors if there are two elements that have the same
         * styles and then one of them is unmounted:
         *
         * sheets.remove(this.context.id);
         */
      }
    }
    public render() {
      const { version } = this.props;
      const { type, styles } = creation.stylize(this.props, version);
      const { id, className } = sheets.add(styles);
      this.updateContext({ type, styles, id, className });
      return renderCreation(type, this.props, className);
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
