// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract BalanceCalc {
  event TokenEvent(address sender);

  uint256 public totalShares = 0;
  uint256 public totalSupply = 0;
  uint256 public shares = 0;

  function init(
    uint256 _shares,
    uint256 _totalShares,
    uint256 _totalSupply
  ) public {
    shares = _shares;
    totalShares = _totalShares;
    totalSupply = _totalSupply;
  }

  function balanceOf() public view returns (uint256) {
    return (shares * totalSupply) / totalShares;
  }

  function newBalanceOf() public view returns (uint256) {
    return (shares / totalShares) * totalSupply;
  }

  function mulResult() public view returns (uint256) {
    return (shares * totalSupply);
  }

  function divTotalShares(uint256 input) public view returns (uint256) {
    return (input) / totalShares;
  }
}
