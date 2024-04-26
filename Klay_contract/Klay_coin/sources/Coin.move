module klay_coin::coin {
    use std::signer;
    use std::string::utf8;

    use aptos_framework::coin::{Self, MintCapability, BurnCapability};

    const ERR_NOT_ADMIN: u64 = 1;

    const ERR_COIN_INITIALIZED: u64 = 2;

    const ERR_COIN_NOT_INITIALIZED: u64 = 2;

    /// COIN struct is a parameter to be used as a generic, coin itself is a resource of type `Coin<COIN>`
    struct UserCoin {}

    struct Capabilities has key { mint_cap: MintCapability<UserCoin>, burn_cap: BurnCapability<UserCoin> }

    /// Initializes the COIN struct as a Coin in the Aptos network.
    public entry fun initialize(coin_admin: &signer) {
        assert!(signer::address_of(coin_admin) == @coin_address, ERR_NOT_ADMIN);
        assert!(!coin::is_coin_initialized<UserCoin>(), ERR_COIN_INITIALIZED);

        let (burn_cap, freeze_cap, mint_cap) =
            coin::initialize<UserCoin>(
                coin_admin,
                utf8(b"UserCoin"),
                utf8(b"USER_COIN"),
                6,
                true
            );
        coin::destroy_freeze_cap(freeze_cap);

        let caps = Capabilities { mint_cap, burn_cap };
        move_to(coin_admin, caps);
    }

    public entry fun register(user: signer) {
        coin::register<UserCoin>(&user);
    }

    /// Mints an `amount` of Coin<COIN> and deposits it to the address `to_addr`.
    public entry fun mint(coin_admin: &signer, to_addr: address, amount: u64) acquires Capabilities {
        assert!(signer::address_of(coin_admin) == @coin_address, ERR_NOT_ADMIN);
        assert!(coin::is_coin_initialized<UserCoin>(), ERR_COIN_INITIALIZED);

        let caps = borrow_global<Capabilities>(@coin_address);
        let coins = coin::mint(amount, &caps.mint_cap);
        coin::deposit(to_addr, coins);
    }

    /// Burns an `amount` of `Coin<COIN>` from user's balance.
    public entry fun burn(user: &signer, amount: u64) acquires Capabilities {
        assert!(coin::is_coin_initialized<UserCoin>(), ERR_COIN_INITIALIZED);

        let coin = coin::withdraw<UserCoin>(user, amount);
        let caps = borrow_global<Capabilities>(@coin_address);
        coin::burn(coin, &caps.burn_cap);
    }
}
