// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library GameMath {
    // Revenue split percentages (in basis points for precision)
    uint256 public constant POOL_PERCENTAGE = 5000;     // 50%
    uint256 public constant CREATOR_PERCENTAGE = 2000;  // 20%
    uint256 public constant PLATFORM_PERCENTAGE = 2000; // 20%
    uint256 public constant REMAINING_PERCENTAGE = 1000; // 10%
    
    function getRevenueBreakdown(uint256 amount) 
        internal 
        pure 
        returns (
            uint256 poolShare,
            uint256 creatorShare,
            uint256 platformShare,
            uint256 remaining
        ) 
    {
        poolShare = (amount * POOL_PERCENTAGE) / 10000;
        creatorShare = (amount * CREATOR_PERCENTAGE) / 10000;
        platformShare = (amount * PLATFORM_PERCENTAGE) / 10000;
        remaining = amount - poolShare - creatorShare - platformShare;
    }
    
    function calculatePoolShare(uint256 amount) internal pure returns (uint256) {
        return (amount * POOL_PERCENTAGE) / 10000;
    }
    
    function calculateCreatorShare(uint256 amount) internal pure returns (uint256) {
        return (amount * CREATOR_PERCENTAGE) / 10000;
    }
    
    function calculatePlatformShare(uint256 amount) internal pure returns (uint256) {
        return (amount * PLATFORM_PERCENTAGE) / 10000;
    }
}
