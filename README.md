<!-- README.md for Blockchain Document Verification dApp -->

<h1>📄 Blockchain Document Verification dApp</h1>

<p>A decentralized application (dApp) built with React and Solidity that allows users to register and verify document authenticity using the Ethereum blockchain. Documents are hashed on the client-side using SHA-256 and stored immutably on-chain. A QR code is generated for quick sharing and verification.</p>

---

<h2>🚀 Features</h2>
<ul>
  <li>✅ Document fingerprinting using SHA-256 hashing</li>
  <li>🔐 Smart contract registration using MetaMask</li>
  <li>📦 QR code generation for easy verification</li>
  <li>⚡ Pure frontend — no backend required</li>
</ul>

---

<h2>📁 Project Structure</h2>
<pre>
├── public/
├── src/
│   ├── App.js           # Main React component and contains ABI and contract address
├── package.json
└── README.md
</pre>

---

<h2>🧰 Tech Stack</h2>
<ul>
  <li><strong>Frontend:</strong> React, Web3.js, MetaMask, qrcode.react</li>
  <li><strong>Blockchain:</strong> Ethereum (Sepolia testnet), Solidity</li>
</ul>

---

<h2>📦 Setup Instructions</h2>

<pre>
1. Clone the repository:
   git clone https://github.com/Dinesh1599/Block-Chain-Data-Verification
   cd Blockchain-Document-Verifier

2. Install dependencies:
   npm install

3. Start the development server:
   npm start
</pre>

<h4>💡 Don't forget to:</h4>
<ul>
  <li>Replace the placeholder <code>CONTRACT_ADDRESS</code> in <code>App.js</code> with your Remix-deployed contract address</li>
  <li>Paste your ABI JSON into the <code>ABI</code> constant</li>
</ul>

---

<h2>🌍 Deploying Publicly</h2>

<h4>1. Deploy the Smart Contract</h4>
<ul>
  <li>Use <strong>Remix IDE</strong> with "Injected Web3" environment</li>
  <li>Connect MetaMask (on Sepolia testnet)</li>
  <li>Deploy the contract and copy the address</li>
</ul>

<h4>2. Update Your React App</h4>
<ul>
  <li>Paste the deployed contract address and ABI into <code>App.js</code></li>
</ul>

<h4>3. Deploy React to Netlify</h4>
<pre>
# Netlify
npm run build
netlify deploy
</pre>

---

<h2>🔐 Smart Contract</h2>
<pre><code>// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract DocumentRegistry {
    struct Document {
        string docHash;
        address owner;
        uint timestamp;
    }

    mapping(string => Document) public documents;

    function registerDocument(string memory docHash) public {
        require(bytes(docHash).length > 0, "Hash required");
        documents[docHash] = Document(docHash, msg.sender, block.timestamp);
    }

    function verifyDocument(string memory docHash) public view returns (bool) {
        return documents[docHash].timestamp != 0;
    }
}</code></pre>

---

<h2>🧠 Future Enhancements</h2>
<ul>
  <li>🔍 Add owner-based access control</li>
  <li>📂 IPFS storage integration</li>
  <li>🧾 Display timestamps in readable format</li>
</ul>

---
