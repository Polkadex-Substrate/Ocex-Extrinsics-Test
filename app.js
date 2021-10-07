const { WsProvider, ApiPromise, Keyring } = require('@polkadot/api')
const wsProvider = new WsProvider("ws://localhost:9994");
const types = require('./types');

const signAndSendTx = (extrinsic, account) => {
    return new Promise((resolve, reject) => {
        extrinsic.signAndSend(account, ({ events = [], status }) => {
            if (status.isFinalized) {
                events.forEach(({ event: { data, method, section }, phase }) => {
                    console.log('', phase.toString(), `: ${section}.${method}`, data.toString());
                });
                console.log(`Transaction finalized at blockHash ${status.asFinalized}`);
                resolve()
            }
            else {
                console.log(`Current status is ${status}`);
            }
        }).catch(error => {
            reject(error)
        })
    })
}
async function main() {
    const api = await ApiPromise.create({ provider: wsProvider, types });
    const keyring = new Keyring({ type: 'sr25519' });
    const main = keyring.addFromUri('//Alice');
    const proxy = keyring.addFromUri('//Charlie');

    // console.log("register extrinsic...")
    // const registerEx = api.tx.polkadexOcex.register(main.address);
    // await signAndSendTx(registerEx, main);

    // console.log('register proxy extrinsic...')
    // const registerProxyEx = api.tx.polkadexOcex.addProxy(main.address, proxy.address)
    // await signAndSendTx(registerProxyEx, main);

    console.log('deposit extrinsic...')
    const depositEx = api.tx.polkadexOcex.deposit(proxy.address, { "BTC": null }, 50000000);
    await signAndSendTx(depositEx, main);
}

main().catch(console.error).finally(() => process.exit());
