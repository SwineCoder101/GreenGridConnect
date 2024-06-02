import { ethers, Wallet, Contract } from 'ethers';
import process from 'process';
import 'dotenv/config';

const RPC_URL = "https://volta-rpc.energyweb.org/"
const PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY;
const CONTRACT_ADDRESS = "0x146D65799f535CbAf10656b5a6CdB9484Bd1D3C8";
const TO_ADDRESS = "0x6Aa3b6ca61e114cf675427E9680207BeAf6ddeA3";
const AMOUNT = ethers.utils.parseEther("10000");

const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
const wallet = new Wallet(PRIVATE_KEY, provider);
const abi = [{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const contract = new Contract(CONTRACT_ADDRESS, abi, wallet);

async function main() {
    const tx = await contract.mint(TO_ADDRESS, AMOUNT);
    console.log(tx)
}

main()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e);
        process.exit(1)
    })
