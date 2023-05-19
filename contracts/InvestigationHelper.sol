// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract InvestigationHelper {
  event TokenEvent(address sender);

  function echo(string memory input) public pure returns (string memory) {
    return input;
  }

  function emitEvent() public {
    emit TokenEvent(msg.sender);
  }
}
