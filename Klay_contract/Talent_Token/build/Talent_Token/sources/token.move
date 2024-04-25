module Talent_token::token {
    struct Token has key {
        value: u64,
    }

     public fun mint(account: &signer, value: u64) {
        move_to(account, Token { value })
    }

    // Declare a unit test. It takes a signer called `account` with an
    // address value of `0xC0FFEE`.
    #[test(account = @0xaf5b019)]
    fun test_mint_10(account: &signer) acquires Token {
        let addr = 0x1::signer::address_of(account);
        mint(account, 1000);
        // Make sure there is a `Coin` resource under `addr` with a value of `10`.
        // We can access this resource and its value since we are in the
        // same module that defined the `Coin` resource.
        assert!(borrow_global<Token>(addr).value == 100, 0);
    }
}