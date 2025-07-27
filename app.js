let web3;
let userAccount;

async function connectWallet() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      userAccount = accounts[0];
      document.getElementById('wallet-address').innerText = `Wallet: ${userAccount}`;
      document.getElementById('status').innerText = "✅ Wallet connected & registered to CoverX";
    } catch (err) {
      document.getElementById('status').innerText = "❌ Wallet connection failed.";
      console.error(err);
    }
  } else {
    alert("❌ Please install MetaMask to use CoverX.");
  }
}

function sendWithInsurance() {
  const recipient = document.getElementById("recipient").value;
  const amount = document.getElementById("amount").value;

  if (!userAccount || !recipient || !amount) {
    document.getElementById("status").innerText = "⚠️ Fill all fields & connect wallet.";
    return;
  }

  document.getElementById("status").innerText = `💸 Sending ${amount} ETH to ${recipient} with CoverX insurance (simulated).`;
}
