import * as React from 'react';
import jss from 'jss';
// @ts-ignore
import preset from 'jss-preset-default';
import Theme, { ICSSProps, IChosen, IStates, ICombos } from './Theme';

export interface IComposeConfig {
  as: any;
  theme: Theme[];
  extra: ICSSProps;
}

jss.setup(preset());

const createStyles = ({
  base,
  states,
  combos,
  chosen,
}: {
  base: ICSSProps;
  states: IStates;
  combos: ICombos;
  chosen: IChosen;
}) => {
  const chosenStates = chosen.states
    .map(name => states[name] || null)
    .filter(state => state);
  const chosenCombos = chosen.combos
    .map(name => combos[name] || null)
    .filter(state => state);
  /**
   * TODO Create the styles for the component.
   */
  const styles = {
    ultramarine: {
      base,
      chosenStates,
      chosenCombos,
    },
  } as any;
  const { classes } = jss.createStyleSheet(styles).attach();
  return { className: classes.ultramarine };
};

export default function compose({
  theme,
  as = 'div',
  extra = {},
}: IComposeConfig): React.ReactNode {
  /**
   * 1. Create styles as per the theme
   * 2. Attach those styles to dom and get class name
   * 2. Add classname to next element
   */
  const options = theme.map(item => item.render());
  const { className } = createStyles({
    base: options.reduce(
      (option, next) => ({ ...option, ...next.base }),
      extra,
    ),
    states: options.reduce(
      (option, next) => ({ ...option, ...next.states }),
      {},
    ),
    combos: options.reduce(
      (option, next) => ({ ...option, ...next.combos }),
      {},
    ),
    chosen: options.reduce(
      (option, next) => ({
        states: [...option.states, ...next.chosen.states],
        combos: [...option.combos, ...next.chosen.combos],
      }),
      { states: [], combos: [] } as any,
    ),
  });
  if (React.isValidElement(as) as any) {
    return ({ children, ...props }: { children: React.ReactNode[] }) =>
      React.cloneElement(
        as,
        {
          className: [(props as any).className || '', className].join(' '),
          ...props,
        },
        children,
      );
  }
  return ({ children, ...props }: { children: React.ReactNode[] }) =>
    React.createElement(as, { className, ...props }, children);
}
