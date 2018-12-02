import expect from '../utils/expect';

export interface ICSSProps {
  [property: string]: string;
}

export interface IStates {
  [name: string]: ICSSProps;
}

export interface ICombos {
  [name: string]: (...args: any[]) => object;
}

export interface IThemeConfig {
  base: ICSSProps;
  states?: IStates;
  combos?: ICombos;
}

export interface IChosen {
  states: string[];
  combos: string[];
}

export default class Theme {
  private config: IThemeConfig;
  private chosen: IChosen;

  constructor(config: IThemeConfig, chosen?: IChosen) {
    expect.type('config', config, 'object');
    expect.type('config.base', config.base, 'object');
    expect.type('config.states', config.states, 'object', true);
    expect.type('config.combos', config.combos, 'object', true);
    expect.type('chosen', config, 'object', true);
    this.config = { ...config };
    this.chosen = chosen ? { ...chosen } : { states: [], combos: [] };
  }

  public use(options: { states?: string; combos?: string }): Theme {
    expect.type('options', options, 'object');
    const chosen = {
      states: [...this.chosen.states, ...this.digest(options.states)],
      combos: [...this.chosen.combos, ...this.digest(options.combos)],
    };
    return new Theme(this.config, chosen);
  }

  private digest(options?: string) {
    if (typeof options === 'string') {
      return options.split(',').map(option => option.trim());
    }
    return [];
  }
}
