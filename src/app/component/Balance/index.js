"use client";
import React, { useState } from "react";
import WrapperBox from "../WrapperBox";
import styles from "./styles.module.css";
import { isValidAddress } from "ethereumjs-util";
import web3 from "@/utils/web3Connection";

const BalanceForm = () => {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getBalance = async () => {
    setLoading(true);
    try {
      if (!isValidAddress(address)) {
        setError("Please Enter Valid Ethereum Address");
        setLoading(false);
        setBalance("");
        return;
      }

      const balanceWei = await web3.eth.getBalance(address);
      const balanceEth = web3.utils.fromWei(balanceWei, "ether");

      setBalance(balanceEth);
      setLoading(false);
      setError("");
    } catch (error) {
      console.error("Error fetching balance:", error);
      setBalance("");
      setError("Error fetching balance");
      setLoading(false);
    }
  };

  return (
    <>
      <WrapperBox title="ERC20 Token Balance">
        <div>
          <div className={styles.inputSection}>
            <label htmlFor="inputField" className={styles.label}>
              Ethereum Address
            </label>
            <input
              id="inputField"
              type="text"
              placeholder="Enter Ethereum address"
              value={address}
              className={styles.input}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <button
              className={styles.button}
              type="submit"
              disabled={loading}
              onClick={getBalance}
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
        </div>
      </WrapperBox>
      {balance && <WrapperBox>Balance: {balance} ETH</WrapperBox>}
      {error && <WrapperBox key={address}>{error}</WrapperBox>}
    </>
  );
};

export default BalanceForm;
