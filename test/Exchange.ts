import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Exchange", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployExchange() {
    const EXCHANGE_RATE = 5;

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();
    const FooFactory = await ethers.getContractFactory("FooToken");
    const foo = await FooFactory.deploy();

    const BarFactory = await ethers.getContractFactory("BarToken");
    const bar = await BarFactory.deploy();

    const ExchangeFactory = await ethers.getContractFactory("Exchange");
    const exchange = await ExchangeFactory.deploy(foo.address, bar.address, 5);

    await foo.setExchange(exchange.address);
    await bar.setExchange(exchange.address);

    return {foo, bar, exchange, owner, otherAccount};
  }

  describe("Funding", function () {
    it("should fund an account on the first call", async function () {
      const {foo, bar, exchange, otherAccount} = await loadFixture(deployExchange);
      await foo.connect(otherAccount).fund();
      expect(await foo.balanceOf(otherAccount.address)).to.be.gt(0)
    });

    it("should fail to fund a second time", async function () {
      const {foo, bar, exchange, otherAccount} = await loadFixture(deployExchange);
      await foo.connect(otherAccount).fund();
      expect(await foo.balanceOf(otherAccount.address)).to.be.gt(0);

      expect(foo.connect(otherAccount).fund()).to.be.revertedWith("FooToken: address already funded");
    });
  });

  describe("Minting", function () {
    it("should not mint from any address that isn't the exchange", async function () {
      const {foo, bar, exchange, otherAccount} = await loadFixture(deployExchange);
      await expect(foo.mint(otherAccount.address, "10000000000000000000")).to.be.reverted;
      await expect(bar.mint(otherAccount.address, "10000000000000000000")).to.be.reverted;
    });
  });

  describe("Swap", function () {
    it("should swap a for b", async function () {
      const {foo, bar, exchange, otherAccount} = await loadFixture(deployExchange);
      await foo.connect(otherAccount).fund();
      await foo.connect(otherAccount).approve(exchange.address, ethers.utils.parseUnits("10", 18));
      await exchange.connect(otherAccount).swap(foo.address, bar.address, ethers.utils.parseUnits("10", 18));

      expect(
        (await bar.balanceOf(otherAccount.address)).toString()
      ).to.be.equal(
        ethers.utils.parseUnits("10", 18).mul(5).toString()
      );
    });

    it("should swap b for a", async function () {
      const {foo, bar, exchange, otherAccount} = await loadFixture(deployExchange);
      await foo.connect(otherAccount).fund();
      await foo.connect(otherAccount).approve(exchange.address, ethers.utils.parseUnits("10", 18));
      await exchange.connect(otherAccount).swap(foo.address, bar.address, ethers.utils.parseUnits("10", 18));

      expect(
        (await bar.balanceOf(otherAccount.address)).toString()
      ).to.be.equal(
        ethers.utils.parseUnits("10", 18).mul(5).toString()
      );
      await bar.connect(otherAccount).approve(exchange.address, ethers.utils.parseUnits("10"))
      await expect(
        exchange.connect(otherAccount).swap(bar.address, foo.address, ethers.utils.parseUnits("10", 18))
      ).to.emit(exchange, "Swap");

      expect(
        (await bar.balanceOf(otherAccount.address)).toString()
      ).to.be.equal(
        (ethers.utils.parseUnits("10", 18).mul(5)).sub(ethers.utils.parseUnits("10", 18)).toString()
      )
    });
  })
});
