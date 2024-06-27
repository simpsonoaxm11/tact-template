
import { Address, contractAddress,toNano } from "@ton/core";
import { TonClient4, WalletContractV4 } from "@ton/ton";
import { SampleTactContract } from "./output/sample_SampleTactContract";
import { mnemonicToPrivateKey } from "@ton/crypto";
import { ContractSystem } from "@tact-lang/emulator";

const Sleep =(ms: number)=>{
    return new Promise(resolve=> setTimeout(resolve,ms))
}

(async () => {
    const client = new TonClient4({
        endpoint: "https://sandbox-v4.tonhubapi.com", // 🔴 Test-net API endpoint
    });

    //助记词丢在这里
    const mnemonic = " airport much anxiety taxi loan field update stone later matter camera quarter credit enough rough month found liquid stadium surround dwarf gain bright blame";
    const key = await mnemonicToPrivateKey(mnemonic.split(" "));
    const wallet = WalletContractV4.create({ publicKey: key.publicKey,workchain:0 });

    const walletContract = client.open(wallet);
    const walletSender = walletContract.sender(key.secretKey); 

    //地址
    let owner = Address.parse("0QDxjvzJ0agQacXJqzaWulCfFT_6WQxbOsidRuc4l1o_dWFH");
    let init = await SampleTactContract.init(owner);
    let contract_address = contractAddress(0,init);
    let contract = SampleTactContract.fromAddress(contract_address);
    let contract_open = client.open(contract);

    //send message to contract 
    await contract_open.send(walletSender,{value: toNano(1)},"increment");    
    await Sleep(3000);
    let counter = contract_open.getCounter();
    console.log("Count Value:" + counter)
})();
