module klaycontract_addr::Klay {

    use aptos_framework::event;
    use std::string::String;
    use std::signer;
    use aptos_std::table::{self, Table};
    use aptos_framework::vector;
    use aptos_framework::coin;

    // Define a resource to hold the state of the contract
    struct KlayContentResource has drop, copy {
        klay_id_counter: u64,
        klays: vector<KlayPost>,
        id_to_klay: Table<u64, KlayPost>,
    }

    struct KlayPost has key, store, drop, copy {
        post_id: u64,
        address: address,
        content: String,
        image: String,
        number_of_supporters: u64,
    }

    // Initialize the contract state
    public fun initialize(account: &signer) {
        let klay_content_resource = KlayContentResource {
            klay_id_counter: 0,
            klays: vector::empty(),
            id_to_klay: table::empty(),
        };
        move_to(account, klay_content_resource);
    }

// Entry function to create a new KlayPost
public entry fun createKlay(account: &signer, _content: String, _image: String) {
    let signer_address: address = signer::address_of(account);
    let mut resource: &mut KlayContentResource;
    resource = borrow_global_mut<KlayContentResource>(signer_address);
    let counter = resource.klay_id_counter + 1;
    let klay_content = KlayPost {
        post_id: counter,
        address: signer_address,
        content: _content,
        image: _image,
        number_of_supporters: 0, // Starting with 0 supporters
    };
    vector::push_back(&mut resource.klays, klay_content);
    table::insert(&mut resource.id_to_klay, counter, klay_content);
    resource.klay_id_counter = counter;
}


    // Entry function to support a KlayPost
    public entry fun supportKlay(account: &signer, post_id: u64) {
        let signer_address: address = signer::address_of(account);
        let mut content = borrow_global_mut<KlayContentResource>(signer_address);
        let klay_post = match table::find(&content.id_to_klay, &post_id) {
            Some(klay) => klay,
            None => {
                event::emit(event::Error {
                    code: 404,
                    message: "KlayPost not found".to_string(),
                });
                return;
            }
        };
        // Increment the number of supporters for the KlayPost
        klay_post.number_of_supporters += 1;
        // Update the KlayPost in the table
        table::insert(&mut content.id_to_klay, post_id, klay_post);
    }

    // Function to retrieve a KlayPost by its ID
    public fun getKlayById(account: &signer, post_id: u64) -> KlayPost {
        let signer_address: address = signer::address_of(account);
        let  content = borrow_global<KlayContentResource>(signer_address);
        match table::find(&content.id_to_klay, &post_id) {
            Some(klay) => klay,
            None => {
                event::emit(event::Error {
                    code: 404,
                    message: "KlayPost not found".to_string(),
                });
                // Return a dummy KlayPost to avoid compiler error, replace this with your error handling logic
                KlayPost {
                    post_id: 0,
                    address: signer_address,
                    content: String::default(),
                    image: String::default(),
                    number_of_supporters: 0,
                }
            }
        }
    }

    // Function to get the total number of KlayPosts
    public view fun getTotalKlays(account: &signer) -> u64 {
        let signer_address: address = signer::address_of(account);
        let content = borrow_global<KlayContentResource>(signer_address);
        vector::length(&content.klays)
    }
}
