// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Game.sol";
import "./GameMath.sol";

contract GameFactoryMinimal {
    // Immutable constants for gas optimization
    uint256 public immutable DEFAULT_COST;
    address public immutable PLATFORM_ADDRESS;
    
    uint256 private gameCounter;
    mapping(uint256 => address) public games;
    mapping(address => uint256[]) public gamesByOwner;
    mapping(address => bool) public isGame;
    
    event GameCreated(
        uint256 indexed gameId,
        address indexed gameAddress,
        address indexed owner,
        string gameName
    );
    
    constructor(address _platformAddress) {
        DEFAULT_COST = 0.01 ether;
        PLATFORM_ADDRESS = _platformAddress;
        gameCounter = 0;
    }
    
    // Single consolidated game creation function
    function createGame(
        string memory gameName,
        uint256 costOfPlay
    ) public returns (address gameAddress) {
        gameCounter++;
        
        // Use DEFAULT_COST if costOfPlay is 0
        if (costOfPlay == 0) {
            costOfPlay = DEFAULT_COST;
        }
        
        Game newGame = new Game(
            gameCounter,
            gameName,
            msg.sender,
            address(this),
            costOfPlay
        );
        
        gameAddress = address(newGame);
        games[gameCounter] = gameAddress;
        gamesByOwner[msg.sender].push(gameCounter);
        isGame[gameAddress] = true;
        
        emit GameCreated(gameCounter, gameAddress, msg.sender, gameName);
        
        return gameAddress;
    }
    
    // Create game with levels
    function createGameWithLevels(
        string memory gameName,
        string[][] memory levels,
        uint256 costOfPlay
    ) public returns (address gameAddress) {
        gameAddress = createGame(gameName, costOfPlay);
        Game game = Game(payable(gameAddress));
        game.addMultipleLevels(levels);
        return gameAddress;
    }
    
    // Essential getters only
    function getGame(uint256 gameId) external view returns (address) {
        require(games[gameId] != address(0), "Game does not exist");
        return games[gameId];
    }
    
    function getGamesByOwner(address owner) external view returns (uint256[] memory) {
        return gamesByOwner[owner];
    }
    
    function getGameCount() external view returns (uint256) {
        return gameCounter;
    }
    
    function verifyGame(address gameAddress) external view returns (bool) {
        return isGame[gameAddress];
    }
    
    // Single comprehensive game info function
    function getGameInfo(uint256 gameId) external view returns (
        uint256 _gameId,
        string memory gameName,
        address owner,
        uint256 levelsCount,
        address gameAddress,
        uint256 costOfPlay,
        uint256 prizePool,
        uint256 totalPlayers
    ) {
        require(games[gameId] != address(0), "Game does not exist");
        
        Game game = Game(payable(games[gameId]));
        (_gameId, gameName, owner, levelsCount, costOfPlay, prizePool, totalPlayers) = game.getCompleteGameInfo();
        gameAddress = games[gameId];
        
        return (_gameId, gameName, owner, levelsCount, gameAddress, costOfPlay, prizePool, totalPlayers);
    }
    
    // Revenue breakdown using library
    function getRevenueBreakdown(uint256 amount) external pure returns (
        uint256 poolShare,
        uint256 creatorShare,
        uint256 platformShare,
        uint256 remaining
    ) {
        return GameMath.getRevenueBreakdown(amount);
    }
    
    // Game level access
    function getGameLevelsCount(uint256 gameId) external view returns (uint256) {
        require(games[gameId] != address(0), "Game does not exist");
        Game game = Game(payable(games[gameId]));
        return game.getLevelsCount();
    }
    
    function getGameLevel(uint256 gameId, uint256 levelIndex) external view returns (string[] memory) {
        require(games[gameId] != address(0), "Game does not exist");
        Game game = Game(payable(games[gameId]));
        return game.getLevel(levelIndex);
    }
    
    // Payment info
    function getGamePaymentInfo(uint256 gameId) external view returns (
        uint256 costOfPlay,
        uint256 prizePool,
        uint256 totalPlayers,
        uint256 contractBalance
    ) {
        require(games[gameId] != address(0), "Game does not exist");
        Game game = Game(payable(games[gameId]));
        return game.getPaymentInfo();
    }
    
    function getGamePlayerInfo(uint256 gameId, address player) external view returns (
        bool hasPlayed,
        uint256 totalPaid
    ) {
        require(games[gameId] != address(0), "Game does not exist");
        Game game = Game(payable(games[gameId]));
        return game.getPlayerInfo(player);
    }
}
