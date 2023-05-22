import { task } from "hardhat/config";
import { types } from "hardhat/config";
import { getContract } from "../scripts/helper";
import { BalanceCalc } from "../typechain/BalanceCalc";

/**
 * npx hardhat deployHelper  --gasprice 1000000000
 */
task("deployCalc", "deploy contract")
  .addOptionalParam("gasprice", "gas price", 0, types.int)
  .setAction(async ({ rpc, pk, gasprice }, { ethers, run, network }) => {
    const compoundLens = await run("d", {
      name: "BalanceCalc",
      gasprice: gasprice,
    });
    return compoundLens;
  });

task("init", "call init")
  .addOptionalParam("gasprice", "gas price", 0, types.int)
  .setAction(async ({}, { ethers, run, network }) => {
    const contractName = "BalanceCalc";
    const contractAddr = getContract(network.name, contractName);
    console.log(contractName, contractAddr);
    const inst = (await ethers.getContractAt(
      contractName,
      contractAddr
    )) as BalanceCalc;

    const receipt = await inst.init.call(
      "31034972760140347451", // shares
      "71345497450683987267658", // totalShares
      "229887417662941574099846"
    );
    console.log(receipt);
  });

task("calc", "call emitEvent")
  .addOptionalParam("gasprice", "gas price", 0, types.int)
  .setAction(async ({}, { ethers, run, network }) => {
    const contractName = "BalanceCalc";
    const contractAddr = getContract(network.name, contractName);
    console.log(contractName, contractAddr);
    const inst = (await ethers.getContractAt(
      contractName,
      contractAddr
    )) as BalanceCalc;

    const receipt = await inst.calc.staticcall();
    console.log(receipt);
  });
