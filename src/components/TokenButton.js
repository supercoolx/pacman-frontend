import Web3 from "web3";
import axios from "axios";
import { useState } from "react";
import { useSDK } from "@metamask/sdk-react";
import { BACKEND_API } from "../config/config";
import ERC20ABI from "../abi/Token.json";
import ContractABI from "../abi/PacmanContract.json";

const TokenButton = ({ callback, ...props }) => {

    const tokenAddress = '0x5ce190050dbb2222e15fec8f3ba4cfa5c7f1e2ba';
    const contractAddress = '0x1106Af36bC08EA66AD5748C8124E5d1384913353';

	const { account } = useSDK();
    const [isLoading, setLoading] = useState(false);

    const handleSendToken = async () => {
        if (isLoading) return;
        setLoading(true);
        try {
            if (!window.ethereum) {
                alert('Please install MetaMask or another Ethereum wallet.');
                return;
            }

            const web3 = new Web3(window.ethereum);
            const accounts = await web3.eth.getAccounts();
            if (!accounts[0]) {
                setLoading(false);
                alert('Connect your wallet');
            }
            const fromAddress = accounts[0];

            // Create an instance of the ERC-20 token contract
            const token = new web3.eth.Contract(ERC20ABI, tokenAddress);
            // const contract = new web3.eth.Contract(ContractABI, contractAddress);

            // Request token transfer
            const amount = web3.utils.toWei('100', 'ether');

            const tx = await token.methods.transfer(contractAddress, amount).send({ from: fromAddress });
            // console.log('Approve successful! Transaction Hash: ' + approveTx.transactionHash);

            // const playTx = await contract.methods.play().send({ from: fromAddress });
            console.log('Transaction successful! Transaction Hash: ' + tx.transactionHash);
            // await axios.post(BACKEND_API + "/pay", {
            //     tgId: '123123123',
            //     wallet: account,
            //     txHash: tx.transactionHash
            // })
            // .then(console.log);

            setLoading(false);
            callback();
        } catch (error) {
            console.error('Error sending tokens:', error);
            alert(error.message);
            setLoading(false);
        }
    };

    return (
        <button onClick={handleSendToken} {...props} >
            { isLoading ? 'Loading' : props.children }
        </button>
    );
};

export default TokenButton;