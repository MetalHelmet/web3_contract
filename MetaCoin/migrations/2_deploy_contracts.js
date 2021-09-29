const ConvertLib = artifacts.require("ConvertLib");
const MetaCoin = artifacts.require("MetaCoin");
const MyContract = artifacts.require("MyContract");
const SendEther = artifacts.require("SendEther");


module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);
  deployer.deploy(MyContract);
  deployer.deploy(SendEther);
};
