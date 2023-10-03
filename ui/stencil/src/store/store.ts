import { createStore } from '@stencil/store';
import { AppAgentWebsocket } from '@holochain/client';

const connect = async () => {
  try {
    const url = new URL('ws://127.0.0.1:65000');
    const connectedClient = await AppAgentWebsocket.connect(url, 'hello_world');
    return connectedClient;
  } catch (error) {
    console.error('Error connecting to Holochain: ', error);
  }
};

const { state, onChange } = createStore({
  client: connect(),
});

onChange('client', value => {
  console.log('Client set: ', value);
});

export default state;
