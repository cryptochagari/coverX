let userAccount;

const connectBtn = document.getElementById('connectBtn');
const walletAddressDisplay = document.getElementById('walletAddress');
const insuranceForm = document.getElementById('insuranceForm');
const status = document.getElementById('status');

connectBtn.onclick = async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      userAccount = accounts[0];
      walletAddressDisplay.innerText = `Connected: ${userAccount}`;
      await registerWallet(userAccount);
    } catch (error) {
      status.innerText = 'Connection failed.';
    }
  } else {
    alert('Please install MetaMask.');
  }
};

insuranceForm.onsubmit = async (e) => {
  e.preventDefault();

  const recipient = document.getElementById('receiver').value;
  const amountEth = parseFloat(document.getElementById('amount').value);
  const insuranceFee = amountEth * 0.02; // 2% insurance fee
  const totalAmount = amountEth + insuranceFee;

  status.innerText = `Sending ${totalAmount} ETH (includes 2% insurance) to ${recipient}...`;

  try {
    const tx = await ethereum.request({
      method: 'eth_sendTransaction',
      params: [{
        from: userAccount,
        to: recipient,
        value: (totalAmount * 1e18).toString(16)
      }]
    });

    status.innerText = `Transaction sent! Hash: ${tx}`;
  } catch (err) {
    status.innerText = 'Transaction failed.';
  }
};

async function registerWallet(wallet) {
  console.log(`Auto-registering wallet: ${wallet}`);
  // In production: store wallet in backend smart contract or database
}
