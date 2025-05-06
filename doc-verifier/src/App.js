import React, { useState } from "react";
import Web3 from "web3";
import { QRCodeCanvas } from "qrcode.react";
import SHA256 from "crypto-js/sha256";
import { Buffer } from "buffer";

const CONTRACT_ADDRESS = "import ABI address here"; 
const ABI = ["input ABI here"];

function App() {
  const [account, setAccount] = useState("");
  const [hash, setHash] = useState("");
  const [status, setStatus] = useState("");
  const [qrVisible, setQrVisible] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      } catch (error) {
        console.error("User rejected the connection:", error);
      }
    } else {
      alert("Please install MetaMask");
    }
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const arrayBuffer = reader.result;
      const wordArray = SHA256(Buffer.from(arrayBuffer)).toString();
      setHash(wordArray);
    };
    reader.readAsArrayBuffer(file);
  };

  const register = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
      await contract.methods.registerDocument(hash).send({ from: account });
      setStatus("✅ Document registered on the blockchain!");
      setQrVisible(true);
    } catch (error) {
      console.error("Registration failed:", error);
      setStatus("❌ Registration failed");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h2>Blockchain Document Verifier</h2>
      <button onClick={connectWallet}>🔗 Connect Wallet</button>
      <p><strong>Wallet:</strong> {account || "Not connected"}</p>
      <input type="file" onChange={handleFile} />
      <button onClick={register} disabled={!hash}>📝 Register Document</button>
      <p>{status}</p>
      {qrVisible && (
        <>
          <h4>📦 Verification QR Code:</h4>
          <QRCodeCanvas value={`https://yourdomain.com/verify?hash=${hash}`} />
          <p style={{ fontSize: "0.8rem", color: "gray" }}>Hash: {hash}</p>
        </>
      )}
    </div>
  );
}

export default App;
