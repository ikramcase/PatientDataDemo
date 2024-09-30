const HealthRecordVerifier = artifacts.require("HealthRecordVerifier");

module.exports = function (deployer) {
    deployer.deploy(HealthRecordVerifier);
};
