import { newSpecPage } from '@stencil/core/testing';
import { LoadingSpinner } from '../loading-spinner';

describe('loading-spinner', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LoadingSpinner],
      html: `<loading-spinner></loading-spinner>`,
    });
    expect(page.root).toEqualHtml(`
      <loading-spinner>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </loading-spinner>
    `);
  });
});
