import Web3 from 'web3';

const web3ProviderUrl = process.env.NEXT_PUBLIC_WEB3_PROVIDER_URL;
const web3 = new Web3(new Web3.providers.HttpProvider(web3ProviderUrl));

export default web3;