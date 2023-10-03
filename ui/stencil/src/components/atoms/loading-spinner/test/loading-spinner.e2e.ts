import { newE2EPage } from '@stencil/core/testing';

describe('loading-spinner', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<loading-spinner></loading-spinner>');

    const element = await page.find('loading-spinner');
    expect(element).toHaveClass('hydrated');
  });
});
