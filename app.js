const connectWalletBtn = document.getElementById('connectWallet');
const walletStatus = document.getElementById('walletStatus');
const insuranceForm = document.getElementById('insuranceForm');
const formMessage = document.getElementById('formMessage');

let userAccount = null;

connectWalletBtn.addEventListener('click', async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      userAccount = accounts[0];
      walletStatus.innerText = `Connected: ${userAccount}`;
    } catch (error) {
      walletStatus.innerText = 'Connection rejected.';
    }
  } else {
    walletStatus.innerText = 'Please install MetaMask.';
  }
});

insuranceForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!userAccount) {
    formMessage.innerText = 'Please connect your wallet first.';
    return;
  }

  const walletAddress = document.getElementById('walletAddress').value;
  const coverageType = document.getElementById('coverageType').value;
  const amount = document.getElementById('amount').value;

  // Simulated fee deduction
  formMessage.innerText = `Insurance submitted for ${coverageType} on ${walletAddress} for $${amount}. (Mock transaction)`;

  // TODO: Replace with real smart contract interaction or backend call
});
