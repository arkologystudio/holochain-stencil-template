import { Component, State, h } from '@stencil/core';
import { AppAgentWebsocket } from '@holochain/client';
import { Route, match } from 'stencil-router-v2';
import { Router } from '../../../globals/router';
import state from '../../../store/store';

const options = {
  exact: true, // match the exact URL
  strict: true, // match the URL with strict matching rules
};

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  scoped: true,
})
export class AppRoot {
  @State() client: AppAgentWebsocket;
  @State() loading: boolean = false;

  async componentWillLoad() {
    this.client = await state.client;
  }

  render() {
    return (
      <div class="app-root">
        <main>
          <Router.Switch>
            <Route path={match(`/`, options)}>{!this.loading && this.client ? <app-home /> : <ion-spinner name="dots"></ion-spinner>}</Route>
          </Router.Switch>
        </main>
      </div>
    );
  }
}
