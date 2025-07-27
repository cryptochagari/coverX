let web3;
let contract;
let account;

const contractAddress = "PASTE_YOUR_DEPLOYED_CONTRACT_ADDRESS_HERE";
let abi = [];

window.addEventListener("load", async () => {
  const res = await fetch("abi.json");
  abi = await res.json();

  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    contract = new web3.eth.Contract(abi, contractAddress);
  } else {
    alert("Please install MetaMask");
  }

  document.getElementById("connectButton").onclick = connectWallet;
  document.getElementById("registerButton").onclick = register;
  document.getElementById("sendButton").onclick = sendInsured;
});

async function connectWallet() {
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  account = accounts[0];
  document.getElementById("walletAddress").innerText = `Connected: ${account}`;
}

async function register() {
  try {
    await contract.methods.register().send({ from: account });
    alert("Registered successfully!");
  } catch (err) {
    console.error(err);
    alert("Already registered or error occurred");
  }
}

async function sendInsured() {
  const recipient = document.getElementById("recipient").value;
  const amount = document.getElementById("amount").value;

  if (!recipient || !amount) return alert("Please fill all fields");

  const weiAmount = web3.utils.toWei(amount, "ether");

  try {
    await contract.methods.insuredTransfer(recipient).send({
      from: account,
      value: weiAmount
    });
    alert("Transfer complete with CoverX insurance!");
  } catch (err) {
    console.error(err);
    alert("Transfer failed");
  }
}
