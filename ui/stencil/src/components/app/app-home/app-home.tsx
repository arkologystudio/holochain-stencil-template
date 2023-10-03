import { Component, State, h } from '@stencil/core';
import { AppAgentWebsocket, AppAgentCallZomeRequest, AgentPubKey } from '@holochain/client';
import { HelloWorld } from '../../../../../types/entryTypes';
import store from '../../../store/store';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  scoped: true,
})
export class AppHome {
  @State() hellos: HelloWorld[] = [];

  async componentWillLoad() {
    await this.getHellos();
    setInterval(this.getHellos, 5000);
  }

  sayHello = async () => {
    try {
      const client: AppAgentWebsocket = await store.client;
      const content: HelloWorld = { content: 'Hello World!', author: client.myPubKey };

      const req: AppAgentCallZomeRequest = {
        role_name: 'hello_world',
        zome_name: 'hello',
        fn_name: 'post_hello',
        payload: content,
      };
      await client.callZome(req);
      await this.getHellos();
    } catch (error) {
      console.error('Error posting hello world', error);
    }
  };

  getHellos = async () => {
    try {
      const client = await store.client;

      const req: AppAgentCallZomeRequest = {
        role_name: 'hello_world',
        zome_name: 'hello',
        fn_name: 'get_all_hellos',
        payload: null,
      };
      const hellos = await client.callZome(req);
      this.hellos = hellos && hellos.length > 0 ? [...hellos] : [];
    } catch (error) {
      console.error('Error getting hellos', error);
    }
  };

  keyToString = (key: AgentPubKey) => {
    const keyString = key.toString();
    return `${keyString.slice(0, 7)} (...) ${keyString.slice(keyString.length - 7, keyString.length)}`;
  };

  render() {
    return (
      <div class="app-home">
        <h1>Holochain Stencil Template</h1>
        <p>with &lt;3 from Arkology Studio</p>
        <br />
        <div>
          <ion-button shape="round" fill="outline" onClick={this.sayHello}>
            Say Hello
          </ion-button>
          <br />
          <p>Who's said hello:</p>
          <ion-list className="list">
            {this.hellos.map(item => (
              <ion-item className="list-item">
                <ion-label className="list-label">{item.content}</ion-label>
                <ion-label className="list-label"> Agent: {this.keyToString(item.author)}</ion-label>
              </ion-item>
            ))}
          </ion-list>
        </div>
      </div>
    );
  }
}
