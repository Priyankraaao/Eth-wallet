"use client";
import React, { useState } from "react";
import { isValidAddress } from "ethereumjs-util";
import Modal from "../Modal";
import styles from "./styles.module.css";
import WrapperBox from "../WrapperBox";
import web3 from "@/utils/web3Connection";
import getBalance from "@/utils/getBalance";
require("dotenv").config();

const senderAddress = process.env.NEXT_PUBLIC_SENDER_ADDRESS;
const senderAddressPrivateKey =
  process.env.NEXT_PUBLIC_WALLET_ACCOUNT_PRIVATE_KEY;

const TransactionForm = () => {
  const [receiverAddress, setReceiverAddress] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [error, setError] = useState("");
  const [onSuccess, setOnSuccess] = useState(false);

  const transfer = async () => {
    if (!isValidAddress(receiverAddress)) {
      setError("Please Provide Valid Receiver Address");
      return;
    }
    if (!transferAmount) {
      setError("Please Provide Token Amount");
      return;
    }

    const balance = await getBalance(receiverAddress);

    // if (Number(balance) < transferAmount) {
    //   setError("Insufficient Balance");
    //   return;
    // }

    setError("");

    const nonce = await web3.eth.getTransactionCount(senderAddress, "latest");
    const value = web3.utils.toWei(transferAmount.toString(), "ether");

    const transaction = {
      to: receiverAddress,
      value: value,
      gasLimit: 6721975,
      gasPrice: 20000000000,
      nonce: nonce,
    };

    const signTrx = await web3.eth.accounts.signTransaction(
      transaction,
      senderAddressPrivateKey
    );

  const result= await web3.eth.sendSignedTransaction(signTrx.rawTransaction);

    if(result.from===senderAddress.toLowerCase() && result.to===receiverAddress.toLowerCase() && result.status){// not sure about this condition
      setReceiverAddress("");
      setTransferAmount('');
      setOnSuccess(true);     
    }
  };

  const closeModal = () => {
    setOnSuccess(false);
  };

  return (
    <>
      <WrapperBox title="Transfer ERC20 Token">
        <div className={styles.container}>
          <div className={styles.inputSection}>
            <label htmlFor="addressInput" className={styles.label}>
              Recipient's Ethereum Address
            </label>
            <input
              type="text"
              id="addressInput"
              className={styles.input}
              receiverAddress={receiverAddress}
              onChange={(event) => setReceiverAddress(event.target.value)}
              placeholder="0x0000....."
            />
          </div>
          <div className={styles.inputSection}>
            <label htmlFor="tokenInput" className={styles.label}>
              Token Amount
            </label>
            <input
              type="text"
              id="tokenInput"
              className={styles.input}
              transferAmount={transferAmount}
              onChange={(event) => setTransferAmount(event.target.value)}
              placeholder="0.0"
            />
          </div>
          <div>
            <button
              className={styles.button}
              type="submit"
             
              onClick={() => transfer()}
            >
              Transfer
            </button>
          </div>
          <Modal isOpen={onSuccess} onClose={closeModal} />
        </div>
      </WrapperBox>
      {error && <WrapperBox>{error}</WrapperBox>}
    </>
  );
};

export default TransactionForm;
