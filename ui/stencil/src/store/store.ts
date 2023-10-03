import { createStore } from '@stencil/store';
import { AppAgentWebsocket } from '@holochain/client';

const connect = async () => {
  try {
    console.log('Connecting to Holochain ..');
    const url = new URL('ws://127.0.0.1:65000');
    const connectedClient = await AppAgentWebsocket.connect(url, 'hello_world');
    console.log('Connection successful.');
    return connectedClient;
  } catch (error) {
    console.error('Error connecting to Holochain: ', error);
  }
};

const { state, onChange } = createStore({
  client: connect(),
});

onChange('client', value => {
  console.log('Holochain client changed: ', value);
});

export default state;
