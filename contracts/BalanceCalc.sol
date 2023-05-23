// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./math/WadRayMath.sol";

contract BalanceCalc {
  event TokenEvent(address sender);
  event DepositEvent(
    uint256 shares,
    uint256 amount,
    uint256 totalShares,
    uint256 totalSupply
  );
  event WithdrawEvent(
    uint256 shares,
    uint256 amount,
    uint256 totalShares,
    uint256 totalSupply
  );

  uint256 public totalShares = 0;
  uint256 public totalSupply = 0;

  function init(uint256 _totalShares, uint256 _totalSupply) public {
    totalShares = WadRayMath.wadToRay(_totalShares);
    totalSupply = _totalSupply;
  }

  function sharesOf(uint256 amount) public view returns (uint256) {
    return
      WadRayMath.rayDiv(WadRayMath.rayMul(amount, totalShares), totalSupply);
  }

  function deposit(uint256 amount) public returns (uint256) {
    uint256 shares = sharesOf(amount);
    totalShares = totalShares + shares;
    totalSupply = totalSupply + amount;
    emit DepositEvent(shares, amount, totalShares, totalSupply);
    return shares;
  }

  function withdraw(uint256 shares) public returns (uint256) {
    uint256 amount = balanceOf(shares);
    totalShares = totalShares - shares;
    totalSupply = totalSupply - amount;
    emit WithdrawEvent(shares, amount, totalShares, totalSupply);
    return amount;
  }

  function balanceOf(uint256 shares) public view returns (uint256) {
    return
      WadRayMath.rayDiv(WadRayMath.rayMul(shares, totalSupply), totalShares);
  }
}
