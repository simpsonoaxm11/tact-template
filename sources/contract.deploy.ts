import * as fs from "fs";
import * as path from "path";
import { Address, contractAddress } from "@ton/core";
import { SampleTactContract } from "./output/sample_SampleTactContract";
import { prepareTactDeployment } from "@tact-lang/deployer";

(async () => {
    // Parameters
    let testnet = true;
    //合约的pkg 类似abi
    let packageName = "sample_SampleTactContract.pkg";
    //准备部署合约的钱包地址(owner)
    let owner = Address.parse("0QDxjvzJ0agQacXJqzaWulCfFT_6WQxbOsidRuc4l1o_dWFH"); 
    //调用合约的init方法
    let init = await SampleTactContract.init(owner);

    // Load required data
    let address = contractAddress(0, init);
    let data = init.data.toBoc();
    let pkg = fs.readFileSync(path.resolve(__dirname, "output", packageName));

    // Prepareing
    console.log("Uploading package...");
    let prepare = await prepareTactDeployment({ pkg, data, testnet });

    // Deploying
    console.log("============================================================================================");
    console.log("Contract Address"); //testnet contract Address ==> kQBB7AihYfBkjdLd7DA5F7Sv53pF4a2Ngj1K0lhU6IjK2dAh  EQBB7AihYfBkjdLd7DA5F7Sv53pF4a2Ngj1K0lhU6IjK2Wur
    console.log("============================================================================================");
    console.log();
    console.log(address.toString({ testOnly: testnet }));
    console.log();
    console.log("============================================================================================");
    console.log("Please, follow deployment link");
    console.log("============================================================================================");
    console.log();
    console.log(prepare);
    console.log();
    console.log("============================================================================================");
})();
