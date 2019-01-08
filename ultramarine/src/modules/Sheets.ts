import * as hash from 'object-hash';
import { StyleSheet } from 'jss';
import { ICSS } from './Creation';
import cssinjss from '../utils/cssinjs';

export default class Sheets {
  private manager: Map<string, StyleSheet>;
  constructor() {
    this.manager = new Map();
  }
  /**
   * Take a styles object and add it to the dom in a stylesheet
   * if it doesn't already exist.
   */
  public add(styles: ICSS): { id: string; className: string } {
    let sheet: StyleSheet;
    const id = hash(styles);
    const shortId = `um-${id.slice(0, 9)}`;
    if (this.manager.has(id)) {
      sheet = this.manager.get(id) as StyleSheet;
    } else {
      const data = {
        [shortId]: styles,
      };
      const options = { meta: 'ultramarine' };
      sheet = cssinjss.createStyleSheet(data, options).attach();
      this.manager.set(id, sheet);
    }
    return {
      id,
      className: sheet.classes[shortId],
    };
  }
  /**
   * Remove the stylesheet from the dom.
   */
  public remove(id: string) {
    if (this.manager.has(id)) {
      const sheet = this.manager.get(id) as StyleSheet;
      sheet.detach();
      this.manager.delete(id);
    }
  }
}
