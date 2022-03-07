var Web3 = require("web3");
var fs = require("fs");
/* var web3 = new Web3("http://127.0.0.1:7545");

contract_address = "0xa0b734c7448dd6b6639c0e691e1bc54a879d282c";

const jsonString = fs.readFileSync("build/contracts/Pixel.json");
const pixel_abi = JSON.parse(jsonString);
const contract = new web3.eth.Contract(pixel_abi, contract_address);
console.log(pixel_abi);
const account_priv =
  "2a762ea63cc7b4ff4e5a21b42a30ba18a27f6308503752b009555cfb6a089668";
const account = web3.eth.accounts.privateKeyToAccount(account_priv);
web3.eth.accounts.signTransaction({
  to: contract_address,
  value: "1000000000",
  data: "THIS IS A PIXEL!",
  gas: 2000000
}, account_priv);

const tx = contract.methods.accept_pixel("THIS IS A PIXEL"); */

async function run() {
  const web3 = new Web3(
    new Web3.providers.HttpProvider("http://127.0.0.1:7545")
  );
  //   console.log(await web3.eth.net.isListening());

  const jsonString = fs.readFileSync(
    "deploy_contract/build/contracts/Pixel.json"
  );
  const parsed = JSON.parse(jsonString);
  const pixel_abi = parsed.abi;
  const contract_address = "0xa0b734c7448dd6b6639c0e691e1bc54a879d282c";
  const contract = new web3.eth.Contract(pixel_abi, contract_address);
  const account_priv =
    "2a762ea63cc7b4ff4e5a21b42a30ba18a27f6308503752b009555cfb6a089668";
  const account = web3.eth.accounts.privateKeyToAccount(account_priv);
  const transaction1 = contract.methods.accept_pixel("THIS IS A PIXEL!");
  const receipt = await send(web3, account, transaction1);
  console.log(receipt);
}

async function send(web3, account, transaction) {
  console.log(
    await transaction
      .estimateGas({
        from: account.address,
        nonce: await web3.eth.getTransactionCount(account.address),
        gas: 5000000,
        gasPrice: "5000000",
      })
      .then(function (gasAmount) {
        console.log(gasAmount);
      })
      .catch(function (error) {
        console.log(error);
      })
  );
  console.log("got here?");

  const options = {
    to: transaction._parent._address,
    data: transaction.encodeABI(),
    nonce: web3.eth.getTransactionCount(account.address),
    gas: 5000000,
    gasPrice: "50000000",
    value: "20000000000000000",
  };
  const signed = await web3.eth.accounts.signTransaction(
    options,
    account.privateKey
  );
  const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);
  return receipt;
}

/* await transaction.estimateGas({
  from: account.address,
  nonce: await web3.eth.getTransactionCount(account.address),
}); */
run();
