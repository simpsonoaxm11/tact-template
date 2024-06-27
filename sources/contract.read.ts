import * as fs from "fs";
import * as path from "path";
import { Address, contractAddress } from "@ton/core";
import { TonClient4 } from "@ton/ton";
import { SampleTactContract } from "./output/sample_SampleTactContract";
import { prepareTactDeployment } from "@tact-lang/deployer";

(async () => {
    const client = new TonClient4({
        endpoint: "https://sandbox-v4.tonhubapi.com", // 🔴 Test-net API endpoint
    });

    //测试网 
    let testnet = true;
    //要访问的合约的pkg 类似abi
    let packageName = "sample_SampleTactContract.pkg";
    //owner地址
    let owner = Address.parse("0QDxjvzJ0agQacXJqzaWulCfFT_6WQxbOsidRuc4l1o_dWFH");
    let init = await SampleTactContract.init(owner);
    //得到合约地址
    let contract_address = contractAddress(0, init);

    // Prepareing
    console.log("Reading Contract Info...");
    console.log(contract_address);

    // Input the contract address
    //得到合约对象
    let contract = await SampleTactContract.fromAddress(contract_address);
    let contract_open = await client.open(contract);
    //访问合约的变变量
    console.log("Counter Value: " + (await contract_open.getCounter()));
})();
