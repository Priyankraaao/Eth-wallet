import web3 from "@/utils/web3Connection";

const getBalance = async (address) => {
  const balanceWei = await web3.eth.getBalance(address);
  const balanceEth = web3.utils.fromWei(balanceWei, "ether");

  return balanceEth;
};

export default getBalance;
