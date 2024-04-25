module Talent_token::token {
    use 0x1::Signer;
    use 0x1::Vector;
    use 0x1::Errors;

    struct Token has key, store {
        value: u64,
        owner: address,
    }

    public fun initialize(account: &signer) {
        let token = Token {
            value: 0,
            owner: Signer::address_of(account),
        };
        move_to(account, token);
    }

    public fun mint(account: &signer, value: u64) {
        let token = borrow_global_mut<Token>(Signer::address_of(account));
        token.value = token.value + value;
    }

    public fun transfer(sender: &signer, recipient: address, amount: u64) {
        let sender_token = borrow_global_mut<Token>(Signer::address_of(sender));
        let recipient_token = borrow_global_mut<Token>(recipient);

        if (sender_token.value < amount) {
            Errors::limit_exceeded(0);
        }

        sender_token.value = sender_token.value - amount;
        recipient_token.value = recipient_token.value + amount;
    }

    public fun get_balance(account: address): u64 acquires Token {
        return borrow_global<Token>(account).value;
    }
}