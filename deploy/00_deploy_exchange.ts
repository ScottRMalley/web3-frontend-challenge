import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  console.log("00: deploying exchange");
  const {deployments, getNamedAccounts, ethers} = hre;
  const {deployer} = await getNamedAccounts();
  const {deploy} = deployments;

  let foo = await deploy("FooToken", {
    from: deployer,
    log: true,
    autoMine: true
  });
  console.log(`deployed foo token to: ${foo.address}\n`);

  let bar = await deploy("BarToken", {
    from: deployer,
    log: true,
    autoMine: true,
  });
  console.log(`deployed bar token to: ${bar.address}\n`);

  let exchange = await deploy("Exchange", {
    from: deployer,
    args: [foo.address, bar.address, 5],
    log: true,
    autoMine: true,
  });
  console.log(`deployed exchange to: ${exchange.address}\n`);

  console.log("setting exchange contract addresses on tokens");
  let fooInstance = await ethers.getContractFactory("FooToken").then(factory => factory.attach(foo.address));
  await fooInstance.setExchange(exchange.address);

  let barInstance = await ethers.getContractFactory("BarToken").then(factory => factory.attach(bar.address));
  await barInstance.setExchange(exchange.address);
}

export default func;