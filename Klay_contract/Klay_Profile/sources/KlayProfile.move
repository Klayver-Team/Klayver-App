module klaycontract_addr::KlayProfile {

    use std::{debug, result};
    use std::string::String;

    // Define a structure for the profile
    struct Profile {
        username: String,
        bio: String,
    }

    // Define a resource to hold user profiles
    resource ProfileStorage {
        profiles: vector<Profile>,
    }

    // Function to initialize the profile storage
    public fun initializeProfileStorage(): ProfileStorage {
        ProfileStorage {
            profiles: vector::empty(),
        }
    }

    // Function to create a new profile
    public fun createProfile(username: String, bio: String): Profile {
        let new_profile = Profile {
            username: username,
            bio: bio,
        };
        let mut storage = getProfileStorage();
        storage.profiles.push_back(new_profile.clone());
        new_profile
    }

    // Function to retrieve a user's profile by username
    public fun getProfileByUsername(username: String): Profile {
        let storage = getProfileStorage();
        for profile in &storage.profiles {
            if profile.username == username {
                return profile.clone();
            }
        }
        Profile {
            username: String::default(),
            bio: String::default(),
        }
    }

    // Function to update a user's profile
    public fun updateProfile(username: String, new_bio: String) {
        let mut storage = getProfileStorage();
        for profile in &mut storage.profiles {
            if profile.username == username {
                profile.bio = new_bio;
                return;
            }
        }
        // If profile not found, emit an error or handle it as needed
    }

    // Function to delete a user's profile
    public fun deleteProfile(username: String) {
        let mut storage = getProfileStorage();
        storage.profiles.retain(|profile| profile.username != username);
    }

    // Helper function to get the profile storage resource
    private fun getProfileStorage(): &ProfileStorage {
        let address = createProfileAddress();
        move_from<Account>(address)
    }

    // Helper function to get the address of the profile storage
    private fun createProfileAddress(): address {
        0x1 
    }
}
