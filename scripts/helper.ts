import { Contract, BigNumber, BytesLike, constants } from "ethers";
import * as pathLib from "path";
import * as fs from "fs";
import * as moment from "moment";

export function expandTo18Decimals(n: number): BigNumber {
  return BigNumber.from(n).mul(BigNumber.from(10).pow(18));
}

export function BN(n: number): BigNumber {
  return BigNumber.from(n);
}
export const overrides: any = {
  gasLimit: 8000000,
};

export const MINTER_ROLE: BytesLike =
  "0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6";

export const gasLeft = BN(28975827); //1ba22d3

export function getContract(network: string, name: string): string {
  const nameArr = name.split(":");
  const contractName = nameArr.length > 1 ? nameArr[1] : nameArr[0];
  const path = `./deployments/${network}/`;
  const latest = `${contractName}.json`;
  const fullpath = pathLib.join(__dirname, "..", path, latest);
  if (fs.existsSync(fullpath)) {
    let json = JSON.parse(fs.readFileSync(fullpath).toString());
    const addr = json[json.length - 1].address;
    console.log(`Found contract ${name} at ${addr}`);
    return addr;
  } else {
    console.log(`Contract ${name} not found `);
    return constants.AddressZero;
  }
}

export function listContracts(network: string) {
  const deployDir = `./deployments`;
  const networks = fs.readdirSync(deployDir);
  let result: { [key: string]: string } = {};
  if (networks.includes(network)) {
    const base = pathLib.join(__dirname, "..", "deployments", network);
    const files = fs.readdirSync(base);
    for (const f of files) {
      if (f.endsWith(".json")) {
        const name = f.replace(".json", "");
        const address = JSON.parse(
          fs.readFileSync(pathLib.join(base, f)).toString()
        ).address;
        if (name && address) {
          result[name] = address;
        }
      }
    }
  }
  return result;
}

export function getContractJson(network: string, name: string) {
  const nameArr = name.split(":");
  const contractName = nameArr.length > 1 ? nameArr[1] : nameArr[0];
  const path = `./deployments/${network}/`;
  const latest = `${contractName}.json`;
  const fullpath = pathLib.join(__dirname, "..", path, latest);
  if (fs.existsSync(fullpath)) {
    return JSON.parse(fs.readFileSync(fullpath).toString());
  } else {
    return "";
  }
}

export async function saveDeployment(
  network: string,
  name: string,
  contract: Contract,
  args: Array<any> = [],
  libraries: Object = {}
) {
  const nameArr = name.split(":");
  const contractName = nameArr.length > 1 ? nameArr[1] : nameArr[0];
  const path = `./deployments/${network}/`;
  const file = `${contractName}.json`;

  fs.mkdirSync(path, { recursive: true });

  let content = "[]";
  if (fs.existsSync(path + file)) {
    content = fs.readFileSync(path + file).toString();
  }

  let original = JSON.parse(content);

  let formattedDate = moment(new Date()).format("DD-MMM-YYYY HH:mm:ss");

  let newDeploy = {
    deployedAt: formattedDate,
    address: contract.address,
    constructorArguments: args,
    libraries: libraries,
    contract: name,
  };

  if (Array.isArray(original)) {
    original.push(newDeploy);
    fs.writeFileSync(path + file, JSON.stringify(original, null, 2));
  } else {
    fs.writeFileSync(path + file, JSON.stringify([newDeploy], null, 2));
  }
}
