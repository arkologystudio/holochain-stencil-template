
use hdk::prelude::*;
use hello_integrity::*;

#[hdk_extern]
pub fn post_hello(hello: HelloWorld) -> ExternResult<ActionHash> {
    let hello_action_hash = create_entry(&EntryTypes::HelloWorld(hello))?;
    let path = Path::from("all_hellos");
    create_link(
        path.path_entry_hash()?,
        hello_action_hash.clone(),
        LinkTypes::AllHellos,
        (),
    )?;
    Ok(hello_action_hash)
}

