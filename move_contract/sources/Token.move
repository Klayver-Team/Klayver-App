module move_contract::Token {
    use 0x0::Signer;
    use 0x0::Vector;
    use 0x0::Errors;

    struct Token has drop {
        value: u64,
        balances: vector<u64>,
    }

    public fun initialize(account: &signer, initial_supply: u64) {
        let token = Token {
            value: initial_supply,
            balances: Vector::empty<u64>(),
        };
        move_to(account, token);
    }

    public fun mint(account: &signer, amount: u64) {
        let token = borrow_global_mut<Token>(Signer::address_of(account));
        token.value = token.value + amount;
        Vector::push_back<u64>(&mut token.balances, amount);
    }

    public fun transfer(from: &signer, to: address, amount: u64) {
        let sender_balance = borrow_global_mut<Token>(Signer::address_of(from));
        let receiver_balance = borrow_global_mut<Token>(to);

        let sender_index = Vector::index_of<u64>(&sender_balance.balances, amount);
        let receiver_index = Vector::index_of<u64>(&receiver_balance.balances, 0);

        if (sender_index == Vector::EMPTY_INDEX) {
            Errors::limit_exceeded(0);
        }

        Vector::remove<u64>(&mut sender_balance.balances, sender_index);
        Vector::push_back<u64>(&mut receiver_balance.balances, amount);
    }

    public fun balance_of(account: address): u64 {
        let token = borrow_global<Token>(account);
        let total_balance: u64 = 0;
        for balance in &token.balances {
            total_balance = total_balance + balance;
        }
        total_balance
    }
}