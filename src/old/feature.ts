import Theme, { IThemeConfig } from './Theme';

export default function feature(config: IThemeConfig) {
  return new Theme({ ...config });
}
