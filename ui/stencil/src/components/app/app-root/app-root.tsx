import { Component, State, h } from '@stencil/core';
import { AppAgentWebsocket } from '@holochain/client';
import { Route, match } from 'stencil-router-v2';
import { Router } from '../../../globals/router';
import state from '../../../store/store';

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
  @State() loading: boolean = false;

  async componentWillLoad() {
    // this.connect();
    console.log('Store: ', state);
    this.client = await state.client;

    console.log('Client: ', this.client);
  }

  connect = async () => {
    try {
      const url = new URL('ws://127.0.0.1:65000');
      const connectedClient = await AppAgentWebsocket.connect(url, 'hello_world');
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
            <Route path={match(`/`, options)}>{!this.loading && this.client ? <app-home /> : <loading-spinner />}</Route>
            {/* <Route path={match(`/`, options)}>{this.client ? <app-home /> : <loading-spinner />}</Route> */}
          </Router.Switch>
        </main>
      </div>
    );
  }
}
