import { task } from "hardhat/config";
import { types } from "hardhat/config";
import { getContract } from "../scripts/helper";
import { InvestigationHelper } from "../typechain/InvestigationHelper";

/**
 * npx hardhat deployHelper  --gasprice 1000000000
 */
task("deployHelper", "deploy contract")
  .addOptionalParam("gasprice", "gas price", 0, types.int)
  .setAction(async ({ rpc, pk, gasprice }, { ethers, run, network }) => {
    const compoundLens = await run("d", {
      name: "InvestigationHelper",
      gasprice: gasprice,
    });
    return compoundLens;
  });

task("emit", "call emitEvent")
  .addOptionalParam("gasprice", "gas price", 0, types.int)
  .setAction(async ({}, { ethers, run, network }) => {
    const contractName = "InvestigationHelper";
    const contractAddr = getContract(network.name, contractName);
    console.log(contractName, contractAddr);
    const inst = (await ethers.getContractAt(
      contractName,
      contractAddr
    )) as InvestigationHelper;

    const receipt = await inst.emitEvent.call();
    console.log(receipt);
  });
