import { expect } from 'chai';
import { Theme } from '..';

describe('Theme', () => {
  it('should create a instance of Theme', () => {
    const theme = Theme.create({});
    expect(theme).to.be.instanceOf(Theme);
  });
});
