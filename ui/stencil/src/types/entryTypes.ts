import { AgentPubKey } from '@holochain/client';

export interface HelloWorld {
  content: string;
  author: AgentPubKey;
}
