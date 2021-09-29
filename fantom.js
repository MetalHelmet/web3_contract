/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
const Web3 = require('web3');
const Tx = require('ethereumjs-tx');
const EthUtil = require('ethereumjs-util');
// const Bip39 = require('bip39');
// const Hdkey = require('hdkey');
// const keythereum = require('keythereum');
// const BigInt = require('big-integer');
// const { contractFunctions } = require('./constants');

const contractAddress = '0xce761D788DF608BD21bdd59d6f4B54b2e27F25Bb';
const { contractFunctions } = require('./contract_0xce761D788DF608BD21bdd59d6f4B54b2e27F25Bb');

const REACT_APP_API_URL_WEB3 = 'https://rpc.fantom.network/'
const REACT_APP_API_URL_FANTOM = 'https://api.fantom.network/api/v1/'

let web3 = new Web3(new Web3.providers.HttpProvider(REACT_APP_API_URL_WEB3 || ''));

const getBalance = async (address) => {
	const res = await web3.eth.getBalance(address);
	return res;
}

const restoreWallet = async (privateKey) => {
	const wallet = web3.eth.accounts.privateKeyToAccount(privateKey);
	return wallet;
}

const getOwnerOf = (tokenId) => {
    const web3 = new Web3(new Web3.providers.HttpProvider(REACT_APP_API_URL_WEB3 || ''));
	const sfc = new web3.eth.Contract(contractFunctions, contractAddress);
	sfc.methods.ownerOf(tokenId).call()
    .then(ownerOf => {
        console.log(`ownerOf NFT ${tockenId} : ${ownerOf}`);
    })
    .catch(error => {
        console.log('error : ', error);
    });
}

const getSummoner = (tokenId) => {
    const web3 = new Web3(new Web3.providers.HttpProvider(REACT_APP_API_URL_WEB3 || ''));
	const sfc = new web3.eth.Contract(contractFunctions, contractAddress);
	sfc.methods.summoner(tokenId).call()
    .then(summoner => {
        console.log(`summoner stat for ${tockenId} : `, summoner);
    })
    .catch(error => {
        console.log('error : ', error);
    });
}

const transfer = async ({
	// from,
	// to,
	// value,
	// memo = '',
	// privateKey,
	// gasLimit = 44000,
	// web3Delegate = '',
	// isWeb
}) => {
    const from = '0x3dDbD454E05420911E39fDA284c50c6f72071651';
    const to = '0x9971243EEc1B7dFaB86Bfe6298Bd2f09D5e88135';
    const value = '0.01';
    const memo = '';
    const privKey = '0x913bf97215486b72b295ef02e68c87a5d5765de60a8d68854f5c0afeffdacaac';
    const gasLimit = 44000;
    const web3Delegate = '';
    const isWeb = false;
    console.log('from : ', from);
    console.log('to : ', to);
    console.log('value : ', value);
    console.log('memo : ', memo);
    console.log('privKey : ', privKey);
    console.log('gasLimit : ', gasLimit);
    console.log('web3Delegate : ', web3Delegate);
    console.log('isWeb : ', isWeb);

	const useWeb3 = web3Delegate || web3;
	const nonce = await useWeb3.eth.getTransactionCount('0x3dDbD454E05420911E39fDA284c50c6f72071651');
    console.log('## nonce : ', nonce);
	const gasPrice = await useWeb3.eth.getGasPrice();
    console.log('## gasPrice : ', gasPrice);

	const rawTx = {
		from,
		to,
		value: Web3.utils.toHex(Web3.utils.toWei(value, 'ether')),
		gasLimit: Web3.utils.toHex(gasLimit),
		gasPrice: Web3.utils.toHex(gasPrice),
		nonce: Web3.utils.toHex(nonce),
		data: memo
	};
    console.log('## rawTx : ', rawTx);

	const bufferData = EthUtil.addHexPrefix(privKey);
    console.log('## bufferData : ', bufferData);
	const privateKeyBuffer = EthUtil.toBuffer(privKey);
    console.log('## privateKeyBuffer : ', privateKeyBuffer);
	const tx = new Tx(rawTx);
    console.log('## tx : ', tx);
	tx.sign(privateKeyBuffer);
    console.log('## tx signed : ', tx);
	const serializedTx = tx.serialize();
    console.log('## serializedTx : ', serializedTx);
	const res = await useWeb3.eth.sendSignedTransaction(`0x${serializedTx.toString('hex')}`);
    console.log('## res : ', res);
	if (isWeb) {
		localStorage.setItem('txHash', res.transactionHash);
	}

	return res;
}

// const adventure = async ({
//     tockenId,
// 	from,
// 	to,
// 	value,
// 	memo = '',
// 	privateKey,
// 	gasLimit = 44000,
// 	web3Delegate = '',
// 	isWeb
// }) => {
// 	const useWeb3 = web3Delegate || web3;
// 	const nonce = await useWeb3.eth.getTransactionCount(from);
// 	const gasPrice = await useWeb3.eth.getGasPrice();

// 	const rawTx = { _summoner : tockenId };
	
//     const bufferData = EthUtil.addHexPrefix(privateKey);
// 	const privateKeyBuffer = EthUtil.toBuffer(privateKey);
// 	const tx = new Tx(rawTx);
// 	tx.sign(privateKeyBuffer);
// 	const serializedTx = tx.serialize();
// 	const res = await useWeb3.eth.sendSignedTransaction(`0x${serializedTx.toString('hex')}`);
// 	if (isWeb) {
// 		localStorage.setItem('txHash', res.transactionHash);
// 	}

// 	return res;
// }

const privateKey = '0x913bf97215486b72b295ef02e68c87a5d5765de60a8d68854f5c0afeffdacaac';

/*restoreWallet(privateKey)
    .then(wallet => {
        this.address = wallet.address;
        return wallet.address;
    })
    .then(address => {
        return getBalance(address);
    })
    .then(balance => {
        console.log('address : ', this.address);
        console.log('getBalance : ', balance);
    });*/

/*restoreWallet(privateKey)
    .then(wallet => {
        return wallet.address;
    })
    .then(fromAddress => {
        return transfer(
            '0x3dDbD454E05420911E39fDA284c50c6f72071651',
            '0x9971243EEc1B7dFaB86Bfe6298Bd2f09D5e88135',
            '0.1',
            memo = '',
            privateKey,
            gasLimit = 44000,
            web3Delegate = '',
            false);
    })
    .then(result => {
        console.log('result : ', result);
    })
    .catch(error => {
        console.log('error : ', error);
    });*/

    transfer(
        '0x3dDbD454E05420911E39fDA284c50c6f72071651',
        '0x9971243EEc1B7dFaB86Bfe6298Bd2f09D5e88135',
        '0.1',
        memo = '',
        privateKey,
        gasLimit = 44000,
        web3Delegate = '',
        false)        
    .then(result => {
        console.log('result : ', result);
    })
    .catch(error => {
        console.log('error : ', error);
    });

/*const tockenId = '144043';
getOwnerOf(tockenId);
getSummoner(tockenId);*/

