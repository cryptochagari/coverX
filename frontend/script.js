let web3;
let contract;
let userAccount;

const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS_HERE";
const abi = []; // Load ABI in next section

async function connectWallet() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const accounts = await web3.eth.getAccounts();
    userAccount = accounts[0];

    contract = new web3.eth.Contract(abi, contractAddress);

    // Auto-register
    const registered = await contract.methods.isRegistered(userAccount).call();
    if (!registered) {
      await contract.methods.register().send({ from: userAccount });
      document.getElementById("status").innerText = "Registered successfully.";
    } else {
      document.getElementById("status").innerText = "Already registered.";
    }
  } else {
    alert("Please install MetaMask!");
  }
}

async function send() {
  const recipient = document.getElementById("recipient").value;
  const amount = document.getElementById("amount").value;

  const valueInWei = web3.utils.toWei(amount, "ether");

  try {
    await contract.methods.sendWithInsurance(recipient).send({
      from: userAccount,
      value: valueInWei
    });
    document.getElementById("status").innerText = "Transaction sent with insurance!";
  } catch (err) {
    document.getElementById("status").innerText = "Transaction failed.";
    console.error(err);
  }
}
