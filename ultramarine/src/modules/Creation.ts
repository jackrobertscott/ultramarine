export interface ICSS {
  [property: string]: string | number | ICSS;
}

export type IType = any;

export interface IMeta {
  styles: ICSS;
  type: IType;
}

export type IStyler = (props: any) => ICSS;

export interface IVersion {
  name: string;
  styler: IStyler;
}

export default class Creation {
  private defaultType: IType;
  private defaultStyler: IStyler;
  private versions: Map<string, IVersion>;
  constructor(type: IType, styler: IStyler) {
    this.defaultType = type;
    this.defaultStyler = styler;
    this.versions = new Map();
  }
  /**
   * Adds a new version to the creation. The meta string can
   * include a type after a ":" character i.e. "exampleVersion:div".
   */
  public version(name: string, styler: IStyler): Creation {
    this.versions.set(name, {
      name,
      styler,
    });
    return this;
  }
  /**
   * Take a property object and use it to generate the styles
   * for the creation.
   */
  public stylize(props: any, versionNames?: string): IMeta {
    if (versionNames) {
      versionNames
        .trim()
        .split(' ')
        .forEach(name => {
          if (!this.versions.has(name)) {
            const message = `The version "${name}" does not exist on the creation element.`;
            throw new Error(message);
          }
        });
    }
    const versionStyles = versionNames
      ? versionNames
          .trim()
          .split(' ')
          .map(name => this.versions.get(name))
          .map(version => (version ? version.styler(props) : {}))
          .reduce((accum, next) => ({ ...accum, ...next }), {})
      : {};
    const type = props.as || this.defaultType;
    const baseStyles = this.defaultStyler(props || {});
    const styles = Object.keys(versionStyles).reduce((css, property) => {
      if (property in css === false) {
        const message = `The property "${property}" does not exist in the initial styles of the element: [${Object.keys(
          baseStyles,
        ).join(', ')}].`;
        throw new Error(message);
      }
      css[property] = versionStyles[property];
      return css;
    }, baseStyles);
    return {
      styles,
      type,
    };
  }
}
