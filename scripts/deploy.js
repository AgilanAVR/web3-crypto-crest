const hre = require("hardhat");

async function main() {

    // let owner;
    // [owner] = await hre.ethers.getSigners();

    //deploying the TMT token contract
  
    const token = await hre.ethers.getContractFactory("Token");
    const Token = await token.deploy();
    const t_address=await Token.getAddress();
    console.log(`token address at ${t_address}`);


    //deploing the ICO contract
    const Ico = await hre.ethers.getContractFactory('TokenICO');
    icoContract = await Ico.deploy();
    const t_ico_address=await icoContract.getAddress();
    console.log(`token address at ${t_ico_address}`);


    //setting the token address
    let transaction =await icoContract.uptateToken(t_address);
    await transaction.wait();
    console.log("token setted");

  
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });