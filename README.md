# Ocex-extrinsics-test
 tests Register, addProxy, Deposit extrinsics for Ocex pallet 

## What it does
connection to wss://openfinex.polkadex.trade
- Register `//Alice` (with sr25519 keyring) to the polkadex node
- Add `//Charlie` (with ed25519 keyring) as the proxy to Alice
- Deposits 5 unit of BTC.

## How to run 
```
npm install
node index.js
```
