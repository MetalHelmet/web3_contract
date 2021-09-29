const Web3 = require('web3');
const MyContract = require('./MetaCoin/build/contracts/SendEther.json');

const init = async () => {
    var web3 = new Web3('http://localhost:7545');

    const id = await web3.eth.net.getId();
    console.log('Network id : ', id);
    const deployedNetwork = MyContract.networks[id];
    console.log('Deployed Network id : ', deployedNetwork);
    const contract = new web3.eth.Contract(
        MyContract.abi,
        deployedNetwork.address
    );
    console.log('Deployed Network.address : ', deployedNetwork.address);

    const addresses = await web3.eth.getAccounts();
    console.log('Addresses : ', addresses);

    await contract.methods.sendEther().send({
        from: addresses[0],
        value: '700000000000000000'
    });

    console.log(await contract.methods.functionCalled().call());

    await web3.eth.sendTransaction({
        from: addresses[0],
        to: contract.options.address,
        value: '70000000000'
    });
    console.log(await contract.methods.functionCalled().call());

    await web3.eth.sendTransaction({
        from: addresses[0],
        to: addresses[1],
        value: '7000000000000000000'
    });
    console.log(await contract.methods.functionCalled().call());

}

init();
