// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ERC20{  //here the interface is the commaom template , by passing the token generation address on the instance , the contacrt will be communicate from here by using this interface
    function transfer(address reciptant , uint256 amount) external returns(bool);  //transfer token from caller to sender
    function balanceOf(address account) external view returns(uint256);  //checkking the balance of token on the specific addres
    function allowance(address owner , uint256 spender) external view returns(uint256);
    function approve(address spender , uint256 amount) external returns(bool);
    function transferFrom(address sender , address reciptant , uint256 amount) external returns(bool); //transafer from one address to another address
    function symbol() external view returns(string memory); ////symbol of the token
    function totalSupply() external view returns(uint256);   //total supply of the token
    function name()external view returns(string memory);  //name of the token
}

contract TokenICO{
    address public owner;
    address public tokenAddress;  //the token address is the holding address of the token , here it is the ERC20 contract.
    uint256 public tokenSalePrice;
    uint256 public soldTokens;

    modifier onlyOwner(){
require(msg.sender==owner,"This function is only called by owner");
_;
    }

    constructor(){
        owner=msg.sender;  //eg66-> address
    }

    function uptateToken(address _tokenAddress) public onlyOwner(){
        tokenAddress=_tokenAddress;
    }

    function updateTokenSalePrice(uint256 _TokenPrice)public onlyOwner(){
        tokenSalePrice=_TokenPrice;
    }

    function multiply(uint256 x, uint256 y)internal pure returns(uint256 z){
        require(y==0 || (z=x*y)/y==x);
    }



    function buyToken(uint256 _tokenAmount)public payable{
        require(msg.value==multiply(_tokenAmount , tokenSalePrice),"Insufficent fund to buy the token");

    //creating the instance with the for the erc20 token which is created on the another contract.
    ERC20 token =ERC20(tokenAddress);
    require(_tokenAmount <=token.balanceOf(address(this)) , "there is no sufficeint tokens"); 

    token.transfer(msg.sender, _tokenAmount*1e18);
    payable(owner).transfer(msg.value);

    soldTokens+=_tokenAmount;
    }




    function getTokenDetails() public view returns(string memory name, string memory symbol ,uint256 balance , uint256 supply , uint256 tokenprice , address tokenaddress){
//creating the instance of the token
ERC20 token = ERC20(tokenAddress);
return(
    token.name(),
    token.symbol(),
    token.balanceOf(address(this)),
    token.totalSupply(),
    tokenSalePrice,
    tokenAddress
);
}


    //donating amount to the owner

    function transferToOwner(uint256 _amount)external payable{
        require(msg.value>=_amount, "Insufficent funnd sent");

        (bool success , )=owner.call{value:msg.value}("");
        require(success, "Transaction failed");
    }

    function transferEther(address _receiver,uint256 _amount)external payable{
        require(msg.value>=_amount, "Insufficent funnd sent");

        (bool success , )=_receiver.call{value:_amount}("");
        require(success, "Transaction failed");
    }

    function withdrawAllTokens()public onlyOwner(){
        ERC20 token = ERC20(tokenAddress);
        uint256 tokenBalance=token.balanceOf(address(this));
        require(tokenBalance>0 , "there is no token to transfer");
        require(token.transfer(owner ,tokenBalance ),"transaction got failed");


    }

}


//points to remember on this smartcontract
//for transfering the amount
//call-----> (bool success , )=owner.call{value:msg.value}("");
//transfer------> payable(owner).transfer(_amount);

