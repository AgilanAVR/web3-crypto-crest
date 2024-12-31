const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
  return ethers.parseUnits(n.toString(), 'ether');
};

describe('testdemo', async () => {
  // State variables
  let owner;
  let token;

  before(async () => {
    // Setup accounts
    [owner , user1 , user2] = await ethers.getSigners();
    //deploying the token contract
    const Token = await ethers.getContractFactory('Token');
    token = await Token.deploy();
    const t_address=await token.getAddress();
    console.log(`token address at ${t_address}`);

    //depploying the ico contract
    const Ico = await ethers.getContractFactory('TokenICO');
    icoContract = await Ico.deploy();
    const t_ico_address=await icoContract.getAddress();
    console.log(`token address at ${t_ico_address}`);


    //transactions

    //updadting the token address
    const tokenAdress=await token.getAddress();
    let transaction =await icoContract.uptateToken(tokenAdress);
    await transaction.wait();
 

    //updarting the token sale price
    transaction=await icoContract.updateTokenSalePrice(tokens(0.001));
    await transaction.wait();


    //sending the partial token to the contract
    transaction=await token.transfer(t_ico_address , '5000000000000000000000');  //sending 5000 tokens from owner
    console.log("transfered");


    //buying token
    transaction=await icoContract.connect(user1).buyToken(10 ,{value:tokens(0.01)});
    await transaction.wait();

    transaction=await icoContract.connect(user2).buyToken(29 ,{value:tokens(0.029)});
    await transaction.wait();


    // -----------------> completed on the dapp


    //donating the amount to the owner
    transaction=await icoContract.connect(user1).transferToOwner('10000000000000000000',{value:'10000000000000000000'});
    await transaction.wait();


    //transfering the amount from one user to another user
    transaction=await icoContract.connect(owner).transferEther(user1.address , '10000000000000000000' , {value:'10000000000000000000'} );
    await transaction.wait();


    //withdrawing all tokens to the owner from the contract
    transaction =await icoContract.withdrawAllTokens();
    await transaction.wait();

 
 

  });


  //test cases...

 
  it('token count', async () => {
    let count = await token.totalSupply();
    console.log(ethers.formatEther(count)); // "100000.0"
  });

  it('account balance', async () => {
    const token_address=await token.getAddress();
    console.log(token_address);
    let token_balance = await token.balanceOf('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
    console.log(token_balance.toString());
  });


      // it('owner', async () => {
  //   const add = await icoContract.owner();
  //   console.log(add);
  //   expect(add).to.equal(owner.address);
  // });

  // it('state variables', async () => {
  //   const o_address = await icoContract.owner();
  //   const t_address = await icoContract.tokenAddress();
  //   const t_price = await icoContract.tokenSalePrice();
  //   const t_sold = await icoContract.soldTokens();
  //   console.log(o_address);
  //   console.log(t_address);
  //   console.log(ethers.formatEther(t_price));
  //   console.log(t_sold.toString());
  // });

  it('get token details', async () => {
    const details=await icoContract.getTokenDetails();
    console.log(details.name);  //TokenMarket
    console.log(details.symbol);  //TMT
    console.log(ethers.formatEther(details.balance)); //4990
    console.log(ethers.formatEther(details.supply));  //10000
    console.log(ethers.formatEther(details.tokenprice)); //0.001 ETH
    console.log(details.tokenaddress); //0xc6e7DF5E7b4f2A278906862b61205850344D4e7d
 });

 it('checking owner address', async () => {
  const p_tokens=await token.balanceOf(owner.address);
  console.log(ethers.formatEther(p_tokens));

});

 

 it('checking buyer-1 address', async () => {
  const p_tokens=await token.balanceOf(user1.address);
  console.log(ethers.formatEther(p_tokens));

});

it('checking buyer-2 address', async () => {
const p_tokens=await token.balanceOf(user2.address);
console.log(ethers.formatEther(p_tokens));

});

it('checking balance after donation', async () => {
const o_account=await ethers.provider.getBalance(owner.address);
const u1_account=await ethers.provider.getBalance(user1.address);

 console.log(ethers.formatEther(o_account));
 console.log(ethers.formatEther(u1_account));


});


});


//------------------------------>

// const { expect } = require('chai');
// const { ethers } = require('hardhat');

// const tokens = (n) => {
//   return ethers.parseUnits(n.toString(), 'ether');
// };

// describe('testdemo', async () => {
//   let owner, user1, user2, token, icoContract;

//   before(async () => {
//     // Setup accounts
//     [owner, user1, user2] = await ethers.getSigners();

//     // Deploy the token contract
//     const Token = await ethers.getContractFactory('Token');
//     token = await Token.deploy();
//     const t_address = await token.getAddress();
//     console.log(`Token deployed at: ${t_address}`);

//     // Deploy the ICO contract
//     const Ico = await ethers.getContractFactory('TokenICO');
//     icoContract = await Ico.deploy();
//     const t_ico_address = await icoContract.getAddress();
//     console.log(`ICO deployed at: ${t_ico_address}`);

//     // Updating the token address in the ICO contract
//     const tokenAddress = await token.getAddress();
//     let transaction = await icoContract.uptateToken(tokenAddress);  // Fix typo from 'uptateToken'
//     await transaction.wait();

//     // Updating the token sale price
//     transaction = await icoContract.updateTokenSalePrice(tokens(0.001));
//     await transaction.wait();

//     // Transfer 5000 tokens from owner to ICO contract
//     transaction = await token.transfer(t_ico_address, tokens(5000)); // Using tokens() function for consistency
//     await transaction.wait();
//     console.log('5000 tokens transferred to ICO contract');

//     // Buying tokens for user1 and user2
//     transaction = await icoContract.connect(user1).buyToken(10, { value: tokens(0.01) });
//     await transaction.wait();

//     transaction = await icoContract.connect(user2).buyToken(29, { value: tokens(0.029) });
//     await transaction.wait();

//     // Donating Ether to owner from user1
//     transaction = await icoContract.connect(user1).transferToOwner(tokens(10), { value: tokens(10) });
//     await transaction.wait();
//   });

//   it('should return the correct total token supply', async () => {
//     let totalSupply = await token.totalSupply();
//     expect(ethers.formatEther(totalSupply)).to.equal('100000.0'); // Add assertion for total supply
//   });

//   it('should return the correct account balance', async () => {
//     const tokenAddress = await token.getAddress();
//     console.log(`Token Address: ${tokenAddress}`);
//     const ownerBalance = await token.balanceOf(owner.address);
//     console.log(`Owner balance: ${ethers.formatEther(ownerBalance)}`);
//   });

//   it('should return the correct token details from ICO', async () => {
//     const details = await icoContract.getTokenDetails();
//     expect(details.name).to.equal('TokenMarket');
//     expect(details.symbol).to.equal('TMT');
//     expect(ethers.formatEther(details.balance)).to.equal('4990'); // 5000 - 10 (user1) - 29 (user2)
//     expect(ethers.formatEther(details.supply)).to.equal('10000');
//     expect(ethers.formatEther(details.tokenprice)).to.equal('0.001');
//     expect(details.tokenaddress).to.equal(await token.getAddress());
//   });

//   it('should return the correct token balance of owner', async () => {
//     const ownerBalance = await token.balanceOf(owner.address);
//     expect(ethers.formatEther(ownerBalance)).to.equal('95000.0'); // 100000 - 5000 transferred to ICO
//   });

//   it('should return the correct token balance of buyer-1', async () => {
//     const user1Balance = await token.balanceOf(user1.address);
//     expect(ethers.formatEther(user1Balance)).to.equal('10.0');
//   });

//   it('should return the correct token balance of buyer-2', async () => {
//     const user2Balance = await token.balanceOf(user2.address);
//     expect(ethers.formatEther(user2Balance)).to.equal('29.0');
//   });

//   it('should return the correct Ether balance after donation', async () => {
//     const ownerBalance = await ethers.provider.getBalance(owner.address);
//     const user1Balance = await ethers.provider.getBalance(user1.address);

//     console.log(`Owner balance: ${ethers.formatEther(ownerBalance)}`);
//     console.log(`User1 balance: ${ethers.formatEther(user1Balance)}`);

//     // Optionally, you can add assertions based on initial balance snapshots.
//   });

//   // Uncomment additional tests as needed:
//   // it('should return the correct ICO owner address', async () => {
//   //   const icoOwner = await icoContract.owner();
//   //   expect(icoOwner).to.equal(owner.address);
//   // });

//   // it('should withdraw all tokens to the owner from the contract', async () => {
//   //   const transaction = await icoContract.withdrawAllTokens();
//   //   await transaction.wait();
//   //   const icoBalance = await token.balanceOf(icoContract.address);
//   //   expect(ethers.formatEther(icoBalance)).to.equal('0.0');
//   // });

//   // it('should transfer Ether between accounts', async () => {
//   //   const transaction = await icoContract.connect(owner).transferEther(user1.address, tokens(10), { value: tokens(10) });
//   //   await transaction.wait();
//   //   const user1NewBalance = await ethers.provider.getBalance(user1.address);
//   //   console.log(`User1 new balance: ${ethers.formatEther(user1NewBalance)}`);
//   // });
// });
