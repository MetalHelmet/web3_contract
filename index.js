const Web3 = require('web3');
// const Web3 = require('unpkg.com/web3@1.2.4/dist/web3.min.js');

const customProvider = {
    sendAsync: (payload, cb) => {
        console.log('customProvider constructor');
        console.log('payload : ', payload);
        console.log('call cb ...');
        cb(undefined, 100);
        console.log('call cb done');
    }
}

// const provider = new Web.providers.HttpProvider('http://localhost:8545');
// const web3 = new Web3(provider);

const web3 = new Web3(customProvider);

web3.eth.getBlockNumber()
    .then(() => console.log('done!'));