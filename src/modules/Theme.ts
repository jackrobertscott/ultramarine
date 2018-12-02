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
  private base: ICSSProps;
  private states: IStates;
  private combos: ICombos;
  private chosen: IChosen;

  constructor({ base, states, combos }: IThemeConfig, chosen?: IChosen) {
    expect.type('config.base', base, 'object', true);
    expect.type('config.states', states, 'object', true);
    expect.type('config.combos', combos, 'object', true);
    this.base = base || {};
    this.states = states || {};
    this.combos = combos || {};
    this.chosen = {
      states: (chosen && chosen.states) || [],
      combos: (chosen && chosen.combos) || [],
    };
  }

  public render() {
    return {
      base: this.base,
      states: this.states,
      combos: this.combos,
      chosen: this.chosen,
    };
  }

  public use({ states, combos }: { states?: string; combos?: string }): Theme {
    const chosen = {
      states: [...this.chosen.states, ...this.digest(states)],
      combos: [...this.chosen.combos, ...this.digest(combos)],
    };
    return this.clone(chosen);
  }

  private clone(chosen: IChosen): Theme {
    const config = {
      base: { ...this.base },
      states: { ...this.states },
      combos: { ...this.combos },
    };
    return new Theme(config, { ...(chosen || this.chosen) });
  }

  private digest(options?: string) {
    if (typeof options === 'string') {
      return options.split(',').map(option => option.trim());
    }
    return [];
  }
}
