const { Wallet } = require('ethers');
const { MerkleTree } = require('merkletreejs');
const SHA256 = require('crypto-js/sha256');

// Function to generate Ethereum addresses and private keys
function generateEthereumAddressesWithPrivateKeys(count) {
    const wallets = [];

    for (let i = 0; i < count; i++) {
        const wallet = Wallet.createRandom();
    

        wallets.push({
            address: wallet.address,
            privateKey: wallet.privateKey,
        });
    }

    return wallets;
}

const numberOfAddresses = 2;
const generatedWallets = generateEthereumAddressesWithPrivateKeys(numberOfAddresses);

console.log('Generated Ethereum Addresses and Private Keys:', generatedWallets);

// Create Merkle tree
const merkleTree = new MerkleTree(generatedWallets.map(wallet => SHA256(wallet.address)), SHA256);

// Verify all addresses
for (let i = 0; i < numberOfAddresses; i++) {
    const wallet = generatedWallets[i];
    const leafHash = SHA256(wallet.address);
    const proof = merkleTree.getProof(leafHash);

    // Verify the proof
    const root = merkleTree.getRoot().toString('hex');
    const isVerified = merkleTree.verify(proof, leafHash, root);

    console.log(`Verification Result for Ethereum Address ${i + 1}:`, isVerified);
}
