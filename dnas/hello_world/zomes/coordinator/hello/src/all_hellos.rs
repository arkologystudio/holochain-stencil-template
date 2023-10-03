use hdk::prelude::*;
use hello_integrity::*;
#[hdk_extern]
pub fn get_all_hellos(_: ()) -> ExternResult<Vec<HelloWorld>> {
    let path = Path::from("all_hellos");
    let links = get_links(path.path_entry_hash()?, LinkTypes::AllHellos, None)?;
    let get_input: Vec<GetInput> = links
        .into_iter()
        .map(|link| GetInput::new(
            ActionHash::from(link.target).into(),
            GetOptions::default(),
        ))
        .collect();
    let records = HDK.with(|hdk| hdk.borrow().get(get_input))?;
    let records: Vec<Record> = records.into_iter().filter_map(|r| r).collect();
    

    let hellos: Vec<HelloWorld> = records
        .into_iter()
        .map(|record| {
            let hello: HelloWorld = record
                .entry()
                .to_app_option()
                .map_err(|e| wasm_error!(e))?
                .ok_or(wasm_error!(WasmErrorInner::Guest("Cannot get record".into())))?;
            Ok(hello)
        })
        .collect::<ExternResult<Vec<HelloWorld>>>()?;
    
    Ok(hellos)


}
