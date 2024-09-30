const { EthrDID } = require('ethr-did');
const didJWT = require('did-jwt');

const fs = require('fs');

// Use an Ethereum address and private key to create a DID
const privateKey = '0x0c479f4633ffa5ca1ff6da9d4ebbe6183f2a379c4949d33a7fa47048e4c339c4';  // Replace with actual Ethereum private key
const address = '0xa5c82fe6EFEFBD6237bC7aC9e6BB5A424DC5Cd9A';

const did = new EthrDID({ identifier: address, privateKey });

console.log('DID:', did.did);

fs.writeFile('did.txt', did.did, function (err) {
  if (err) return console.log(err);
  console.log('DID saved to did.txt');
});
