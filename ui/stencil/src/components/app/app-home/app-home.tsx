import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  scoped: true,
})
export class AppHome {
  componentWillLoad() {}

  render() {
    return (
      <div class="app-home">
        <h1>Holochain Stencil Template</h1>
      </div>
    );
  }
}
