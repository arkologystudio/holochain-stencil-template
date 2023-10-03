<template>
  <div v-if="loading" style="display: flex; flex: 1; align-items: center; justify-content: center">
    <mwc-circular-progress indeterminate></mwc-circular-progress>
  </div>

  <div v-else style="display: flex; flex-direction: column">
    <span v-if="error">Error fetching the hello worlds: {{error.data.data}}.</span>
    <div v-else-if="hashes && hashes.length > 0" style="margin-bottom: 8px">
      <HelloWorldDetail 
        v-for="hash in hashes" 
        :hello-world-hash="hash"
        @hello-world-deleted="fetchHelloWorld()"
      >
      </HelloWorldDetail>
    </div>
    <span v-else>No hello worlds found.</span>
  </div>

</template>

<script lang="ts">
import { defineComponent, inject, toRaw, ComputedRef } from 'vue';
import { decode } from '@msgpack/msgpack';
import { AppAgentClient, NewEntryAction, Record, AgentPubKey, EntryHash, ActionHash } from '@holochain/client';
import '@material/mwc-circular-progress';
import HelloWorldDetail from './HelloWorldDetail.vue';
import { HelloSignal } from './types';

export default defineComponent({
  components: {
    HelloWorldDetail
  },
  data(): { hashes: Array<ActionHash> | undefined; loading: boolean; error: any } {
    return {
      hashes: undefined,
      loading: true,
      error: undefined
    }
  },
  async mounted() {
    await this.fetchHelloWorld();
    toRaw(this.client).on('signal', signal => {
      if (signal.zome_name !== 'hello') return; 
      const payload = signal.payload as HelloSignal;
      if (payload.type !== 'EntryCreated') return;
      if (payload.app_entry.type !== 'HelloWorld') return;
      if (this.hashes) this.hashes.push(payload.action.hashed.hash);
    });
  },
  methods: {
    async fetchHelloWorld() {
      try {
        const records: Array<Record> = await this.client.callZome({
          cap_secret: null,
          role_name: 'hello_world',
          zome_name: 'hello',
          fn_name: 'get_all_hellos',
          payload: null,
        });
        this.hashes = records.map(r => r.signed_action.hashed.hash);
      } catch (e) {
        this.error = e;
      }
      this.loading = false;
    }
  },
  setup() {
    const client = (inject('client') as ComputedRef<AppAgentClient>).value;
    return {
      client,
    };
  },
})
</script>
