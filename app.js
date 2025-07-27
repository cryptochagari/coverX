async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      alert(`Wallet connected: ${accounts[0]}`);
    } catch (error) {
      console.error("Connection Error:", error);
    }
  } else {
    alert("MetaMask not detected");
  }
}

function registerInsurance() {
  const wallet = document.getElementById('walletAddress').value;
  if (wallet) {
    alert(`Insurance registered for wallet: ${wallet}`);
    // Simulate storing to blockchain or database
  } else {
    alert("Please enter your wallet address.");
  }
}

function checkClaimStatus() {
  const code = document.getElementById('claimCode').value;
  const result = document.getElementById('statusResult');

  if (code === "ABC123") {
    result.innerText = "✅ Approved and Paid";
    result.style.color = "lightgreen";
  } else if (code === "PENDING") {
    result.innerText = "🕒 Pending Review";
    result.style.color = "orange";
  } else {
    result.innerText = "❌ Invalid Claim Code";
    result.style.color = "red";
  }
}

document.getElementById('connectBtn').addEventListener('click', connectWallet);
