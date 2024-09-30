const Web3 = require('web3');
const web3 = new Web3('https://sepolia.etherscan.io/tx/0x32ab96928665b62f66e15a91d8ceac8153fbd5dc76070e4ffe99e7c0c8cd586e');
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "recordHash",
				"type": "string"
			}
		],
		"name": "storeRecordHash",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "recordHash",
				"type": "string"
			}
		],
		"name": "verifyRecordHash",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const contractAddress = '0x774681112CA46D95657A0bbf58185ECc18c519A5';

const contract = new web3.eth.Contract(contractABI, contractAddress);
const patientId = "did:ethr:0xa5c82fe6EFEFBD6237bC7aC9e6BB5A424DC5Cd9A";
const hash = "005f184c7cbea3965c4d833b161b67528ce7e26152620a18f17a4e8df1e7a10a";

// Store the hash on-chain
contract.methods.storeRecordHash(hash).send({ from: '0x2d908459aFB405E61604A529360D3eca18748eF8' })
    .then(function(receipt){
        console.log("Transaction successful:", receipt);
    });


