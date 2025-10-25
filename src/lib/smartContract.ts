import { ethers } from 'ethers';
import { getProvider, getSigner } from './wallet';

// Smart contract address
const GAME_FACTORY_ADDRESS = '0x83BFde82bd350ad252054F9E88cD3fDADF95EF83';

// ABI for the GameFactoryMinimal contract functions
const GAME_FACTORY_ABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "gameId",
        "type": "uint256"
      }
    ],
    "name": "getGame",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "getGamesByOwner",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getGameCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "gameAddress",
        "type": "address"
      }
    ],
    "name": "verifyGame",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "gameId",
        "type": "uint256"
      }
    ],
    "name": "getGameInfo",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "_gameId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "gameName",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "levelsCount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "gameAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "costOfPlay",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "prizePool",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "totalPlayers",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "getRevenueBreakdown",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "poolShare",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "creatorShare",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "platformShare",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "remaining",
        "type": "uint256"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "gameId",
        "type": "uint256"
      }
    ],
    "name": "getGameLevelsCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "gameId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "levelIndex",
        "type": "uint256"
      }
    ],
    "name": "getGameLevel",
    "outputs": [
      {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "gameId",
        "type": "uint256"
      }
    ],
    "name": "getGamePaymentInfo",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "costOfPlay",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "prizePool",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "totalPlayers",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "contractBalance",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "gameId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "player",
        "type": "address"
      }
    ],
    "name": "getGamePlayerInfo",
    "outputs": [
      {
        "internalType": "bool",
        "name": "hasPlayed",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "totalPaid",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "gameName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "costOfPlay",
        "type": "uint256"
      }
    ],
    "name": "createGame",
    "outputs": [
      {
        "internalType": "address",
        "name": "gameAddress",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "gameName",
        "type": "string"
      },
      {
        "internalType": "string[][]",
        "name": "levels",
        "type": "string[][]"
      },
      {
        "internalType": "uint256",
        "name": "costOfPlay",
        "type": "uint256"
      }
    ],
    "name": "createGameWithLevels",
    "outputs": [
      {
        "internalType": "address",
        "name": "gameAddress",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export interface GameLevel {
  levelIndex: number;
  levelData: string[];
}

export interface SmartContractGame {
  gameId: number;
  gameName: string;
  owner: string;
  levelsCount: number;
  gameAddress: string;
  costOfPlay: string;
  prizePool: string;
  totalPlayers: number;
  levels: GameLevel[];
}

// Get all games from the smart contract (updated for GameFactoryMinimal)
export const getAllGames = async (): Promise<string[]> => {
  try {
    console.log('Getting provider for getAllGames...');
    const provider = getProvider();
    if (!provider) {
      throw new Error('No provider available. Please connect your wallet.');
    }
    console.log('Provider connected:', provider);

    const contract = new ethers.Contract(GAME_FACTORY_ADDRESS, GAME_FACTORY_ABI, provider);
    console.log('Contract instance created:', GAME_FACTORY_ADDRESS);
    
    // Get total game count first
    const gameCount = await contract.getGameCount();
    console.log('Total games:', gameCount.toString());
    
    // Get all game addresses by iterating through game IDs
    const gameAddresses: string[] = [];
    for (let i = 1; i <= Number(gameCount); i++) {
      try {
        const gameAddress = await contract.getGame(i);
        if (gameAddress && gameAddress !== '0x0000000000000000000000000000000000000000') {
          gameAddresses.push(gameAddress);
        }
      } catch (error) {
        console.warn(`Game ${i} not found or error fetching:`, error);
        // Continue with other games
      }
    }
    
    console.log('Retrieved game addresses:', gameAddresses);
    return gameAddresses;
  } catch (error) {
    console.error('Error fetching games:', error);
    throw error;
  }
};

// Get level data for a specific game and level index
export const getGameLevel = async (gameId: number, levelIndex: number): Promise<GameLevel> => {
  try {
    console.log(`Fetching level ${levelIndex} for game ID: ${gameId}`);
    const provider = getProvider();
    if (!provider) {
      throw new Error('No provider available. Please connect your wallet.');
    }

    const contract = new ethers.Contract(GAME_FACTORY_ADDRESS, GAME_FACTORY_ABI, provider);
    const levelDataResult = await contract.getGameLevel(gameId, levelIndex);
    console.log(`Level ${levelIndex} raw data:`, levelDataResult);
    
    // Convert the Result/Proxy to a plain array
    const levelData: string[] = [];
    for (let i = 0; i < levelDataResult.length; i++) {
      levelData.push(levelDataResult[i]);
    }
    
    console.log(`Level ${levelIndex} converted data:`, levelData);
    
    return {
      levelIndex,
      levelData
    };
  } catch (error) {
    console.error(`Error fetching level ${levelIndex} for game ${gameId}:`, error);
    throw error;
  }
};

// Get all levels for a specific game
export const getAllLevelsForGame = async (gameId: number, levelsCount: number): Promise<GameLevel[]> => {
  try {
    console.log(`Fetching all ${levelsCount} levels for game ID: ${gameId}`);
    const levels: GameLevel[] = [];
    
    // Loop from 0 to levelsCount-1 (as specified)
    for (let levelIndex = 0; levelIndex < levelsCount; levelIndex++) {
      try {
        const level = await getGameLevel(gameId, levelIndex);
        levels.push(level);
        console.log(`Successfully fetched level ${levelIndex} for game ${gameId}`);
      } catch (error) {
        console.error(`Failed to fetch level ${levelIndex} for game ${gameId}:`, error);
        // Continue with other levels even if one fails
      }
    }
    
    console.log(`Retrieved ${levels.length} levels for game ${gameId}`);
    return levels;
  } catch (error) {
    console.error(`Error fetching levels for game ${gameId}:`, error);
    throw error;
  }
};

// Get complete game information for a specific game ID (updated for GameFactoryMinimal)
export const getCompleteGameInfo = async (gameId: number): Promise<SmartContractGame> => {
  try {
    console.log(`Fetching complete info for game ID: ${gameId}`);
    const provider = getProvider();
    if (!provider) {
      throw new Error('No provider available. Please connect your wallet.');
    }
    console.log('Provider connected for game info');

    const contract = new ethers.Contract(GAME_FACTORY_ADDRESS, GAME_FACTORY_ABI, provider);
    console.log('Contract instance created for game info');
    
    const gameInfo = await contract.getGameInfo(gameId);
    console.log('Raw game info received:', gameInfo);
    
    const levelsCount = Number(gameInfo.levelsCount);
    console.log(`Game has ${levelsCount} levels, fetching level data...`);
    
    // Fetch all levels for this game
    const levels = await getAllLevelsForGame(gameId, levelsCount);
    
    const formattedGame = {
      gameId: Number(gameInfo._gameId),
      gameName: gameInfo.gameName,
      owner: gameInfo.owner,
      levelsCount: levelsCount,
      gameAddress: gameInfo.gameAddress,
      costOfPlay: ethers.formatEther(gameInfo.costOfPlay),
      prizePool: ethers.formatEther(gameInfo.prizePool),
      totalPlayers: Number(gameInfo.totalPlayers),
      levels: levels
    };
    console.log('Formatted game info with levels:', formattedGame);
    
    return formattedGame;
  } catch (error) {
    console.error(`Error fetching game info for ID ${gameId}:`, error);
    throw error;
  }
};

// Get all games with their complete information including levels
export const getAllGamesWithInfo = async (): Promise<SmartContractGame[]> => {
  try {
    console.log('Fetching all games with complete info including levels...');
    const gameAddresses = await getAllGames();
    console.log('Total game addresses found:', gameAddresses.length);
    
    const games: SmartContractGame[] = [];
    
    // Fetch info for each game (assuming game IDs start from 1)
    for (let i = 1; i <= gameAddresses.length; i++) {
      try {
        console.log(`Fetching complete info for game ${i} of ${gameAddresses.length}`);
        const gameInfo = await getCompleteGameInfo(i);
        games.push(gameInfo);
        console.log(`Successfully added game ${i} info with ${gameInfo.levels.length} levels`);
      } catch (error) {
        console.error(`Failed to fetch info for game ${i}:`, error);
        // Continue with other games even if one fails
      }
    }
    
    console.log('All games retrieved successfully with levels:', games);
    return games;
  } catch (error) {
    console.error('Error fetching all games with info:', error);
    throw error;
  }
};

// Find a game by its contract address
export const findGameByAddress = async (gameAddress: string): Promise<SmartContractGame | null> => {
  try {
    console.log(`Searching for game with address: ${gameAddress}`);
    const allGames = await getAllGamesWithInfo();
    
    const foundGame = allGames.find(game => 
      game.gameAddress.toLowerCase() === gameAddress.toLowerCase()
    );
    
    if (foundGame) {
      console.log(`Found game with address ${gameAddress}:`, foundGame);
      return foundGame;
    } else {
      console.log(`No game found with address: ${gameAddress}`);
      return null;
    }
  } catch (error) {
    console.error(`Error searching for game with address ${gameAddress}:`, error);
    throw error;
  }
};

// Get game by ID or address
export const getGameByIdOrAddress = async (identifier: string): Promise<SmartContractGame> => {
  try {
    console.log(`Getting game by identifier: ${identifier}`);
    
    // Check if identifier is a number (game ID)
    if (/^\d+$/.test(identifier)) {
      const gameId = parseInt(identifier);
      console.log(`Identifier is a game ID: ${gameId}`);
      return await getCompleteGameInfo(gameId);
    }
    
    // Check if identifier is an Ethereum address
    if (/^0x[a-fA-F0-9]{40}$/.test(identifier)) {
      console.log(`Identifier is an Ethereum address: ${identifier}`);
      const game = await findGameByAddress(identifier);
      if (!game) {
        throw new Error(`No game found with address: ${identifier}`);
      }
      return game;
    }
    
    // If neither, try to parse as game ID anyway
    const gameId = parseInt(identifier);
    if (!isNaN(gameId)) {
      console.log(`Trying to parse identifier as game ID: ${gameId}`);
      return await getCompleteGameInfo(gameId);
    }
    
    throw new Error(`Invalid game identifier: ${identifier}`);
  } catch (error) {
    console.error(`Error getting game by identifier ${identifier}:`, error);
    throw error;
  }
};

// Format address for display
export const formatAddress = (address: string): string => {
  console.log('Formatting address:', address);
  const formatted = `${address.slice(0, 6)}...${address.slice(-4)}`;
  console.log('Formatted address:', formatted);
  return formatted;
};

// Get difficulty based on levels count
export const getDifficulty = (levelsCount: number): string => {
  console.log('Getting difficulty for levels count:', levelsCount);
  let difficulty;
  if (levelsCount <= 2) difficulty = 'Easy';
  else if (levelsCount <= 4) difficulty = 'Medium';
  else difficulty = 'Hard';
  console.log('Calculated difficulty:', difficulty);
  return difficulty;
};

// Get difficulty color class
export const getDifficultyColor = (difficulty: string): string => {
  console.log('Getting color for difficulty:', difficulty);
  let color;
  switch (difficulty) {
    case 'Easy':
      color = 'bg-green-600/20 text-green-300';
      break;
    case 'Medium':
      color = 'bg-yellow-600/20 text-yellow-300';
      break;
    case 'Hard':
      color = 'bg-red-600/20 text-red-300';
      break;
    default:
      color = 'bg-purple-600/20 text-purple-300';
  }
  console.log('Selected color class:', color);
  return color;
};

// Get games by owner address
export const getGamesByOwner = async (ownerAddress: string): Promise<number[]> => {
  try {
    console.log(`Getting games for owner: ${ownerAddress}`);
    const provider = getProvider();
    if (!provider) {
      throw new Error('No provider available. Please connect your wallet.');
    }

    const contract = new ethers.Contract(GAME_FACTORY_ADDRESS, GAME_FACTORY_ABI, provider);
    const gameIds = await contract.getGamesByOwner(ownerAddress);
    
    console.log('Games by owner:', gameIds);
    return gameIds.map((id: any) => Number(id));
  } catch (error) {
    console.error('Error fetching games by owner:', error);
    throw error;
  }
};

// Verify if an address is a valid game
export const verifyGame = async (gameAddress: string): Promise<boolean> => {
  try {
    console.log(`Verifying game address: ${gameAddress}`);
    const provider = getProvider();
    if (!provider) {
      throw new Error('No provider available. Please connect your wallet.');
    }

    const contract = new ethers.Contract(GAME_FACTORY_ADDRESS, GAME_FACTORY_ABI, provider);
    const isValid = await contract.verifyGame(gameAddress);
    
    console.log('Game verification result:', isValid);
    return isValid;
  } catch (error) {
    console.error('Error verifying game:', error);
    throw error;
  }
};

// Get revenue breakdown for an amount
export const getRevenueBreakdown = async (amount: string): Promise<{
  poolShare: string;
  creatorShare: string;
  platformShare: string;
  remaining: string;
}> => {
  try {
    console.log(`Getting revenue breakdown for amount: ${amount}`);
    const provider = getProvider();
    if (!provider) {
      throw new Error('No provider available. Please connect your wallet.');
    }

    const contract = new ethers.Contract(GAME_FACTORY_ADDRESS, GAME_FACTORY_ABI, provider);
    const amountInWei = BigInt(amount);
    const breakdown = await contract.getRevenueBreakdown(amountInWei);
    
    const result = {
      poolShare: ethers.formatEther(breakdown.poolShare),
      creatorShare: ethers.formatEther(breakdown.creatorShare),
      platformShare: ethers.formatEther(breakdown.platformShare),
      remaining: ethers.formatEther(breakdown.remaining)
    };
    
    console.log('Revenue breakdown:', result);
    return result;
  } catch (error) {
    console.error('Error getting revenue breakdown:', error);
    throw error;
  }
};

// Get game payment info
export const getGamePaymentInfo = async (gameId: number): Promise<{
  costOfPlay: string;
  prizePool: string;
  totalPlayers: number;
  contractBalance: string;
}> => {
  try {
    console.log(`Getting payment info for game ID: ${gameId}`);
    const provider = getProvider();
    if (!provider) {
      throw new Error('No provider available. Please connect your wallet.');
    }

    const contract = new ethers.Contract(GAME_FACTORY_ADDRESS, GAME_FACTORY_ABI, provider);
    const paymentInfo = await contract.getGamePaymentInfo(gameId);
    
    const result = {
      costOfPlay: ethers.formatEther(paymentInfo.costOfPlay),
      prizePool: ethers.formatEther(paymentInfo.prizePool),
      totalPlayers: Number(paymentInfo.totalPlayers),
      contractBalance: ethers.formatEther(paymentInfo.contractBalance)
    };
    
    console.log('Game payment info:', result);
    return result;
  } catch (error) {
    console.error('Error getting game payment info:', error);
    throw error;
  }
};

// Get player info for a specific game
export const getGamePlayerInfo = async (gameId: number, playerAddress: string): Promise<{
  hasPlayed: boolean;
  totalPaid: string;
}> => {
  try {
    console.log(`Getting player info for game ${gameId} and player ${playerAddress}`);
    const provider = getProvider();
    if (!provider) {
      throw new Error('No provider available. Please connect your wallet.');
    }

    const contract = new ethers.Contract(GAME_FACTORY_ADDRESS, GAME_FACTORY_ABI, provider);
    const playerInfo = await contract.getGamePlayerInfo(gameId, playerAddress);
    
    const result = {
      hasPlayed: playerInfo.hasPlayed,
      totalPaid: ethers.formatEther(playerInfo.totalPaid)
    };
    
    console.log('Player info:', result);
    return result;
  } catch (error) {
    console.error('Error getting player info:', error);
    throw error;
  }
};

// Create a new game with levels and cost (updated for GameFactoryMinimal)
export const createGameWithLevelsAndCost = async (
  gameName: string,
  levels: string[][],
  costOfPlay: string
): Promise<{ success: boolean; gameAddress?: string; transactionHash?: string; error?: string }> => {
  try {
    console.log('Creating game with levels and cost:', { gameName, levels, costOfPlay });
    
    const signer = getSigner();
    if (!signer) {
      throw new Error('No signer available. Please connect your wallet.');
    }

    const contract = new ethers.Contract(GAME_FACTORY_ADDRESS, GAME_FACTORY_ABI, signer);
    console.log('Contract instance created with signer');

    // Convert cost from string to BigInt (assuming it's already in wei)
    const costInWei = BigInt(costOfPlay);
    console.log('Cost in wei:', costInWei.toString());

    // Call the smart contract function (updated function name)
    console.log('Calling createGameWithLevels...');
    const transaction = await contract.createGameWithLevels(
      gameName,
      levels,
      costInWei
    );

    console.log('Transaction sent:', transaction.hash);

    // Wait for transaction confirmation
    const receipt = await transaction.wait();
    console.log('Transaction confirmed:', receipt);

    // Extract the game address from the transaction receipt
    // The GameCreated event should contain the game address
    let gameAddress = '';
    if (receipt.logs && receipt.logs.length > 0) {
      // Parse the logs to find the GameCreated event
      for (const log of receipt.logs) {
        try {
          const parsedLog = contract.interface.parseLog(log);
          if (parsedLog && parsedLog.name === 'GameCreated') {
            gameAddress = parsedLog.args.gameAddress;
            console.log('Game address from event:', gameAddress);
            break;
          }
        } catch (error) {
          // Skip logs that can't be parsed
          continue;
        }
      }
    }

    return {
      success: true,
      gameAddress: gameAddress,
      transactionHash: transaction.hash
    };

  } catch (error) {
    console.error('Error creating game:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}; 