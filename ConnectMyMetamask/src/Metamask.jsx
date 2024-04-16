import React,{useState} from 'react';
import {ethers} from 'ethers';

const Metamask=()=>{

    const[errorMessage, setErrorMessage]= useState(null)
    const[defaultAccount, setDefaultAccount]= useState(null)
    const[userBalance, setUserBalance]= useState(null)

    const ConnectWallet=()=>{
        if(window.ethereum){
            window.ethereum.request({method: 'eth_requestAccounts'})  //if Metamask is already installed in your browser,this line will 
                                                                      // send request to metamask account
            .then(result=>{
                accountChanged([result[0]])
            })
        }
        else{
            setErrorMessage("Install Metamask")
        }

    }

    const accountChanged= (accountName)=>{
        setDefaultAccount(accountName)
        if(accountName){
            getUserBalance(accountName)

        }
        else{
            getUserBalance('0')
        }
        
    }

    const getUserBalance=(accountAddress)=>{
        window.ethereum.request({method:'eth_getBalance', params:[String(accountAddress)]})
        .then(balance=>{
            setUserBalance(ethers.utils.formatEther(balance));
        })
    }





    return(
        <div>
            <h1>Connect to my Metamask Wallet</h1>
            <button onClick={ConnectWallet}> Connect Button</button>
            <h3>Address : {defaultAccount}</h3>
            <h3>Balance: {userBalance}</h3>
            {errorMessage}


        </div>
        

    )


}

export default Metamask;