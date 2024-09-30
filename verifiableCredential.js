const { createVerifiableCredentialJwt, verifyCredential } = require('did-jwt-vc');
const { EthrDID } = require('ethr-did');
// const { Resolver } = require('did-resolver');
// const { getResolver } = require('ethr-did-resolver');
const fs = require('fs');


// Use the issuer's Ethereum private key to create the issuer DID
const privateKey = '0x0c479f4633ffa5ca1ff6da9d4ebbe6183f2a379c4949d33a7fa47048e4c339c4';  // Replace with actual private key
const address = '0xa5c82fe6EFEFBD6237bC7aC9e6BB5A424DC5Cd9A';         // Replace with actual Ethereum address

// Debugging: Check the inputs
console.log('Private Key:', privateKey);
console.log('Address:', address);

const issuerDID = new EthrDID({ identifier: address, privateKey });


// Create a resolver
// const resolver = new Resolver(getResolver());


// Credential payload for a health record
const credentialPayload = {
  sub: 'did:ethr:0xa5c82fe6EFEFBD6237bC7aC9e6BB5A424DC5Cd9A', // Subject DID (the patient)
  nbf: Math.floor(Date.now() / 1000),  // Not before time (optional)
  vc: {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    type: ['VerifiableCredential', 'HealthRecord'],
    credentialSubject: {
      id: 'did:ethr:0xa5c82fe6EFEFBD6237bC7aC9e6BB5A424DC5Cd9A',  // DID of the subject
      healthRecord: {
        condition: 'Diabetes Type 2',
        issuedDate: '2024-09-26',
        doctor: 'Dr. John Smith'
      }
    }
  }
};

// Sign the Verifiable Credential
(async () => {
  const verifiableCredentialJwt = await createVerifiableCredentialJwt(credentialPayload, {
    did: issuerDID.did, // Issuer DID
    signer: issuerDID.signer // Signer function
  });
  
  console.log('Verifiable Credential JWT:', verifiableCredentialJwt);

  // Optionally verify the signed credential
  // const verifiedCredential = await verifyCredential(verifiableCredentialJwt, {
  //   resolver: { resolve: (did) => issuerDID.resolveDID(did) }  // DID resolver
  // });

  // Optionally verify the signed credential
  // const verifiedCredential = await verifyCredential(verifiableCredentialJwt, {
  //   resolver: resolver // Use the created resolver
  // });

  // console.log('Verified Credential:', verifiedCredential);

  //write the JWT in a txt file
  fs.writeFile('VC.txt', verifiableCredentialJwt, function (err) {
    if (err) return console.log(err);
    console.log('VC saved to VC.txt');
  });
  
})();
