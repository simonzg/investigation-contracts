import { Overrides } from "ethers";
import { task } from "hardhat/config";
import { types } from "hardhat/config";
import { saveDeployment } from "../../scripts/helper";

/**
npx hardhat d \
--name "contract name" \
--args "constructor args" \
--gasprice 1000000000
 */
task("d", "deploy contract")
  .addParam("name", "contract name")
  .addOptionalParam("args", "constructor args", [], types.json)
  .addOptionalParam("gasprice", "gas price", 0, types.int)
  .setAction(
    async ({ name, args, rpc, pk, gasprice }, { ethers, web3, network }) => {
      // const { provider } = ethers;
      const wallet = (await ethers.getSigners())[0];
      // const wallet = new ethers.Wallet(pk, provider);
      // console.log("account:", wallet.address);

      console.log(`Deploying ${name}`);
      console.log(
        "Account balance: " +
          ethers.utils.formatUnits(await wallet.getBalance(), 18)
      );

      // const gasPrice = gasprice == 0 ? await web3.eth.getGasPrice() : gasprice.toString();
      // console.log('Gas price: ' + gasPrice);

      let _override: Overrides;
      _override = {
        // gasPrice: BigNumber.from(gasPrice),
        // gasLimit: 20000000,
      };

      const contract = await (
        await (
          await ethers.getContractFactory(name, wallet)
        ).deploy(...args, _override)
      ).deployed();
      console.log(`Deployed ${name} at:`, contract.address);
      await saveDeployment(network.name, name, contract, ...args);
      return contract;
    }
  );
