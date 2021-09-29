const Web3 = require('web3');
const MyContract = require('./MetaCoin/build/contracts/MyContract.json');

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

    web3.eth.getBlockNumber()
        .then(() => console.log('done!'));

    web3.eth.getBlockNumber()
        .then((block) => console.log('block : ', block));
    
    // const result = await contract.methods.getData().call();
    // console.log('Contract getData : ', result);

    /*contract.methods.getData().call()
        .then((result) => {
            console.log('Contract getData : ', result); 
        })
        .catch((error) => {
            console.error('Exception caught : ', error);
        });*/

    const result = await contract.methods.getData().call();
    console.log('Initial result : ', result);
    
    const addresses = await web3.eth.getAccounts();
    console.log('Addresses : ', addresses);

    const receipt = await contract.methods.setData(10).send({
        from: addresses[0],
    });
    console.log('Transaction #1 was broadcasted. Receipt : ', receipt);

    const data1 = await contract.methods.getData().call();
    console.log('Updated result #1 : ', data1);

    contract.methods.setData(20).send({
        from: addresses[0],
    })
        .then(receipt => {
            console.log('Transaction #2 was broadcasted. Receipt : ', receipt);
        })
        .catch(error => {
            console.log('Exception caught while sending TX #2 : ', error);
        }
        );

    setTimeout(function () {
        contract.methods.getData().call()
        .then(receipt => {
            console.log('Updated result #2 : ', receipt);
        });
    }, 1000);

    contract.methods.setData(30).send({
        from: addresses[0],
    })
    .on('receipt', receipt => {
        console.log('Transaction #3 was broadcasted. Receipt : ', receipt);
    })
    .on('confirm', (confirmationNumber, receipt) => {
        console.log('Transaction #3 was confirmed. ConfirmationNumber : ', confirmationNumber);
    })/*
    .on('error', (error, receipt) => {
        console.log('Transaction #3 was failed. Error : ', error);
    });*/
}

init();
