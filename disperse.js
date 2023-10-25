// This version is for disperse.app
const ethers = require("ethers");
const fs = require("fs");

const main = async () => {
  let addresses = [];
  try {
    //const ktp = "0xc6C0C0f54a394931a5b224c8b53406633e35eeE7";
    const totalQty = 1000; // Change this number accordingly

    // check if restake file exists
    if (!fs.existsSync("./disperse_adr.csv")) await storeData("");

    for (let i = 0; i <= totalQty; i++) {
      const wallet = ethers.Wallet.createRandom();
      const random = Math.floor(Math.random() * 10) + 1;
      const x = random / (10 * totalQty);

      const item = {
        receiver: wallet.address,
        amount: x,
      };
      addresses.push(item);
    }
    storeData(addresses);
  } catch (error) {
    console.error(error);
  }
};

// Data Storage Function
const storeData = async (addresses) => {
  const data = formatCSV(addresses);
  fs.writeFile("./disperse_adr.csv", data, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Data stored:", addresses);
    }
  });
};

// Transform JSON to CSV
const formatCSV = (items) => {
  let csv = "";
  // Loop the array of objects
  for (let row = 0; row < items.length; row++) {
    let keysAmount = Object.keys(items[row]).length;
    let keysCounter = 0;
    // If this is the first row, generate the headings
    if (row === 0) {
      // // Loop each property of the object
      // for (let key in items[row]) {
      //   // This is to not add a comma at the last cell
      //   // The '\r\n' adds a new line
      //   csv += key + (keysCounter + 1 < keysAmount ? "," : "\r\n");
      //   keysCounter++;
      // }
    } else {
      for (let key in items[row]) {
        csv += items[row][key] + (keysCounter + 1 < keysAmount ? "," : "\r\n");
        keysCounter++;
      }
    }
    keysCounter = 0;
  }
  console.log(csv);
  return csv;
};

main();
