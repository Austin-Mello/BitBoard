var Web3 = require("web3");
var fs = require("fs");
const express = require("express");
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  //get requests to the root ("/") will route here
  //   console.log(req);
  res.sendFile("index.html", { root: __dirname }); //server responds by sending the index.html file to the client's browser
});

app.get("/pixel_tx", (req, res) => {
  console.log(create_pixel_tx(req.query.address, req.query.pixel_info));
});

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});

function create_pixel_tx(account, pixel_data) {
  const web3 = new Web3(
    new Web3.providers.HttpProvider("http://127.0.0.1:7545")
  );
  const jsonString = fs.readFileSync("Pixel.json");
  const parsed = JSON.parse(jsonString);
  const pixel_abi = parsed.abi;
  const contract_address = "0xa0b734c7448dd6b6639c0e691e1bc54a879d282c";
  const contract = new web3.eth.Contract(pixel_abi, contract_address);
  const transaction = contract.methods.accept_pixel(pixel_data);
  return {
    to: transaction._parent._address,
    data: transaction.encodeABI(),
    nonce: web3.eth.getTransactionCount(account),
    gas: 5000000,
    gasPrice: "50000000",
    value: "20000000000000000",
  };
}
