# test-extrinsics
 test extrinsics for ocex pallet 

##What it does
connection to wss://openfinex.polkadex.trade
- Register `//Alice` (with sr2559 keyring) to the polkadex node
- Add `//Charlie` (with ed2559 keyring) as the proxy to Alice
- Deposits 5 unit of BTC.
##How to run 
```
npm install
node index.js
```
