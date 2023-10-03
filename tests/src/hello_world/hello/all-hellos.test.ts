import { assert, test } from "vitest";

import { runScenario, pause, CallableCell } from '@holochain/tryorama';
import { NewEntryAction, ActionHash, Record, AppBundleSource,  fakeActionHash, fakeAgentPubKey, fakeEntryHash } from '@holochain/client';
import { decode } from '@msgpack/msgpack';

import { createHelloWorld } from './common.js';

test('create a HelloWorld and get all hellos', async () => {
  await runScenario(async scenario => {
    // Construct proper paths for your app.
    // This assumes app bundle created by the `hc app pack` command.
    const testAppPath = process.cwd() + '/../workdir/holochain-stencil-template.happ';

    // Set up the app to be installed 
    const appSource = { appBundleSource: { path: testAppPath } };

    // Add 2 players with the test app to the Scenario. The returned players
    // can be destructured.
    const [alice, bob] = await scenario.addPlayersWithApps([appSource, appSource]);

    // Shortcut peer discovery through gossip and register all agents in every
    // conductor of the scenario.
    await scenario.shareAllAgents();

    // Bob gets all hellos
    let collectionOutput: Record[] = await bob.cells[0].callZome({
      zome_name: "hello",
      fn_name: "get_all_hellos",
      payload: null
    });
    assert.equal(collectionOutput.length, 0);

    // Alice creates a HelloWorld
    const createdRecord: Record = await createHelloWorld(alice.cells[0]);
    assert.ok(createdRecord);
    
    await pause(1200);
    
    // Bob gets all hellos again
    collectionOutput = await bob.cells[0].callZome({
      zome_name: "hello",
      fn_name: "get_all_hellos",
      payload: null
    });
    assert.equal(collectionOutput.length, 1);
    assert.deepEqual(createdRecord, collectionOutput[0]);    
  });
});

