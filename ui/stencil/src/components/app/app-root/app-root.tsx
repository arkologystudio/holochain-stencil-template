import { Component, State, h } from '@stencil/core';
import { AppAgentWebsocket } from '@holochain/client';
import { Route, match } from 'stencil-router-v2';
import { Router } from '../../../globals/router';

const options = {
  exact: true, // only match the exact URL
  strict: true, // match the URL with strict matching rules
};

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  scoped: true,
})
export class AppRoot {
  @State() client: AppAgentWebsocket;
  @State() loading: boolean = true;
  componentWillLoad() {
    this.connect();
  }

  componentDidLoad() {}

  connect = async () => {
    try {
      const url = new URL('ws://127.0.0.1:65000');
      const connectedClient = await AppAgentWebsocket.connect(url, 'data-commons-prototype');
      console.log('Connected to Holochain.');

      this.client = connectedClient;
      this.loading = false;
    } catch (error) {
      console.error('Error connecting to Holochain: ', error);
    }
  };

  render() {
    return (
      <div>
        <main>
          <Router.Switch>
            <Route path={match(`/`, options)}>{!this.loading ? <app-home /> : <loading-spinner />}</Route>
          </Router.Switch>
        </main>
      </div>
    );
  }
}
