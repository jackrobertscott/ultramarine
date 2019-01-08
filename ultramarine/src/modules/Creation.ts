export interface ICSS {
  [property: string]: string | ICSS;
}

export type IType = any;

export interface IMeta {
  styles: ICSS;
  type: IType;
}

export type IStyler = (props: any) => ICSS;

export interface IVersion {
  name: string;
  type?: IType;
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
  public version(name: string, styler: IStyler, type?: IType): Creation {
    this.versions.set(name, {
      name,
      styler,
      type,
    });
    return this;
  }
  /**
   * Take a property object and use it to generate the styles
   * for the creation.
   */
  public stylize(props: any, versionName?: string): IMeta {
    if (versionName && !this.versions.has(versionName)) {
      const message = `The version "${versionName}" does not exist on the creation element.`;
      throw new Error(message);
    }
    const baseStyles = this.defaultStyler(props || {});
    const version = versionName ? this.versions.get(versionName) : undefined;
    const versionStyles = version ? version.styler(props) : {};
    const type = props.as || (version && version.type) || this.defaultType;
    const styles = Object.keys(versionStyles).reduce((css, property) => {
      if (property in css === false) {
        const message = `The property "${property}" of version "${versionName}" does not exist in the initial styles of the element.`;
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
