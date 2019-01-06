import theme from '../theme';

/**
 *  <Element
 *    colors={{
 *      theme: 'dark', // must match a theme
 *      state: 'solid', // must match a theme state
 *      fonts: 'green', // a color, defaults to theme font color
 *    }}
 *  />
 */
const handleColors = ({ colors }) => {
  switch (typeof colors) {
    case 'string':
      if (theme.colors.has(colors)) {
        const chosen = theme.colors.get(colors);
        return `
          background-color: ${chosen.solid};
          color: ${chosen.fonts};
        `;
      }
      return null;
    case 'object':
      if (typeof colors.theme === 'string' && theme.colors.has(colors.theme)) {
        const chosen = theme.colors.get(colors.theme);
        return `
          background-color: ${chosen[colors.state || 'solid']};
          color: ${colors.fonts || chosen.fonts};
        `;
      }
      return null;
    default:
      return null;
  }
};

/**
 *  <Element
 *    [margin|padding]={{
 *      left: '20px',
 *      top: 10,
 *      bottom: 'slim',
 *    }}
 *  />
 */
const handleSize = cssProperty => props => {
  const data = props[cssProperty];
  switch (typeof data) {
    case 'string':
      if (theme.sizes.has(data)) {
        return `${cssProperty}: ${theme.sizes.get(data).sides.join(' ')};`;
      }
      return `${cssProperty}: ${data};`;
    case 'number':
      return `${cssProperty}: ${data}px;`;
    case 'object':
      return Object.keys(data)
        .map(key => {
          if (typeof data[key] === 'string') {
            if (theme.sizes.has(data[key])) {
              if (['top', 'bottom'].includes(key)) {
                return `${cssProperty}-${key}: ${
                  theme.sizes.get(data[key]).sides[0]
                };`;
              }
              if (['left', 'right'].includes(key)) {
                return `${cssProperty}-${key}: ${
                  theme.sizes.get(data[key]).sides[1]
                };`;
              }
            }
            return `${cssProperty}-${key}: ${data[key]};`;
          }
          if (typeof data[key] === 'number') {
            return `${cssProperty}-${key}: ${data[key]}px;`;
          }
          return null;
        })
        .filter(exists => exists)
        .join('\n');
    default:
      return null;
  }
};

/**
 *  <Element
 *    radius={{
 *      left: '20px',
 *      top: 10,
 *      bottom: 'slim',
 *    }}
 *  />
 */
const handleRadius = ({ radius }) => {
  const data = radius;
  const cssProperty = 'border-radius';
  switch (typeof data) {
    case 'string':
      if (theme.sizes.has(data)) {
        return `${cssProperty}: ${theme.sizes.get(data).radius};`;
      }
      return `${cssProperty}: ${data};`;
    case 'number':
      return `${cssProperty}: ${data}px;`;
    case 'object':
      // code...
      return null;
    default:
      return null;
  }
};

/**
 *  <Element
 *    shadow="phantom"
 *  />
 */
const handleShadow = ({ shadow }) => {
  const data = shadow;
  const cssProperty = 'box-shadow';
  switch (typeof data) {
    case 'string':
      if (theme.shadows.has(data)) {
        return `${cssProperty}: ${theme.shadows.get(data)};`;
      }
      return `${cssProperty}: ${data};`;
    default:
      return null;
  }
};

/**
 *  <Element
 *    structure={{
 *      justify: 'center',
 *      align: 'start',
 *    }}
 *  />
 */
const handleStructure = ({ structure }) => {
  const formatProperty = prop =>
    ['start', 'end'].includes(prop)
      ? `flex-${prop}`
      : ['around', 'between', 'evenly'].includes(prop)
        ? `space-${prop}`
        : prop;
  const css = ['display: flex;'];
  switch (typeof structure) {
    case 'string':
      // code...
      return null;
    case 'object':
      if (typeof structure.justify === 'string') {
        css.push(`justify-content: ${formatProperty(structure.justify)}`);
      }
      if (typeof structure.align === 'string') {
        css.push(`align-items: ${formatProperty(structure.align)}`);
      }
      return [
        ...css,
        ...Object.keys(structure)
          .filter(key => ['grow', 'shrink', 'basis', 'direction'].includes(key))
          .map(key => `flex-${key}: ${structure[key]};`),
      ].join('\n');
    default:
      return null;
  }
};

/**
 * Compile all properties into one place.
 */
export default props => `
  ${handleColors(props)};
  ${handleSize('margin')(props)};
  ${handleSize('padding')(props)};
  ${handleRadius(props)};
  ${handleShadow(props)};
  ${handleStructure(props)};
`;
