// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HealthRecordVerifier {
    mapping(string => bool) private records;

    function storeRecordHash(string memory recordHash) public {
        records[recordHash] = true;
    }

    function verifyRecordHash(string memory recordHash) public view returns (bool) {
        return records[recordHash];
    }
}
