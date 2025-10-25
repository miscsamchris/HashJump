"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Gamepad2, Trophy, Coins, Users, Play, Crown, Wallet, RefreshCw, Search, Filter, Star, Zap } from "lucide-react"
import { getWalletInformation, checkWalletConnection, disconnectWallet } from "@/lib/wallet"
import { getAllGamesWithInfo, SmartContractGame, formatAddress, getDifficulty, getDifficultyColor } from "@/lib/smartContract"

interface WalletInfo {
  address: string;
  network: string;
  chainId: string;
  balance: string;
}

export default function PlayPage() {
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [smartContractGames, setSmartContractGames] = useState<SmartContractGame[]>([])
  const [isLoadingGames, setIsLoadingGames] = useState(false)
  const [gamesError, setGamesError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all")

  // Check if wallet is already connected on component mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const connection = await checkWalletConnection()
        if (connection) {
          setWalletInfo(connection)
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error)
      }
    }
    
    checkConnection()
  }, [])

  // Load smart contract games when wallet is connected
  useEffect(() => {
    if (walletInfo) {
      loadSmartContractGames()
    }
  }, [walletInfo])

  const loadSmartContractGames = async () => {
    setIsLoadingGames(true)
    setGamesError(null)
    
    try {
      const games = await getAllGamesWithInfo()
      setSmartContractGames(games)
    } catch (error: any) {
      setGamesError(error.message || "Failed to load games from smart contract")
      console.error("Error loading smart contract games:", error)
    } finally {
      setIsLoadingGames(false)
    }
  }

  const handleWalletConnect = async () => {
    if (walletInfo) {
      disconnectWallet()
      setWalletInfo(null)
      setError(null)
      setSmartContractGames([])
      return
    }

    setIsConnecting(true)
    setError(null)

    try {
      const connection = await getWalletInformation()
      setWalletInfo(connection)
    } catch (error: any) {
      setError(error.message || "Failed to connect wallet")
      console.error("Wallet connection error:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  const formatAddressDisplay = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const practiceGames = [
    {
      id: 1,
      title: "Jump Start",
      creator: "HashJump Team",
      difficulty: "Easy",
      levels: 3,
      players: 5234,
      icon: "🎮",
      description: "Perfect for beginners. Learn the basics of jumping and timing.",
      gameKey: "0x001"
    },
    {
      id: 2,
      title: "Sky Runner",
      creator: "HashJump Team",
      difficulty: "Medium",
      levels: 5,
      players: 3421,
      icon: "☁️",
      description: "Navigate through clouds and master mid-air movements.",
      gameKey: "0x002"
    },
    {
      id: 3,
      title: "Spike Master",
      creator: "HashJump Team",
      difficulty: "Hard",
      levels: 7,
      players: 1876,
      icon: "⚡",
      description: "Expert level challenge with precise timing required.",
      gameKey: "0xABC"
    },
  ]

  const filteredBlockchainGames = smartContractGames.filter((game) => {
    const matchesSearch = game.gameName.toLowerCase().includes(searchQuery.toLowerCase())
    if (selectedDifficulty === "all") return matchesSearch
    const difficulty = getDifficulty(game.levelsCount).toLowerCase()
    return matchesSearch && difficulty === selectedDifficulty.toLowerCase()
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Header */}
      <header className="border-b border-gray-700/30 bg-gray-900/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Gamepad2 className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">HashJump</span>
          </Link>
          <div className="flex items-center space-x-4">
            {walletInfo && (
              <div className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700/50">
                <Coins className="h-5 w-5 text-yellow-400" />
                <span className="font-semibold text-white">{walletInfo.balance} HBAR</span>
              </div>
            )}
            <Button
              onClick={handleWalletConnect}
              disabled={isConnecting}
              variant={walletInfo ? "secondary" : "default"}
              className={walletInfo ? "bg-gray-700 hover:bg-gray-600" : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"}
            >
              <Wallet className="h-4 w-4 mr-2" />
              {isConnecting 
                ? "Connecting..." 
                : walletInfo 
                  ? formatAddressDisplay(walletInfo.address)
                  : "Connect Wallet"
              }
            </Button>
          </div>
        </div>
      </header>

      {/* Error Message */}
      {error && (
        <div className="container mx-auto px-4 mt-4">
          <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg flex items-center justify-between">
            <p className="text-sm">{error}</p>
            <button onClick={() => setError(null)} className="text-red-300 hover:text-red-100">✕</button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Play & <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">Earn</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Choose from practice games to sharpen your skills or compete in blockchain games for real rewards
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/create">
                <Button size="lg" variant="outline" className="border-2 border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-white">
                  Create Your Own Game
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <Tabs defaultValue="practice" className="w-full">
            <div className="flex items-center justify-between mb-8">
              <TabsList className="bg-gray-900/50 border border-gray-700/50">
                <TabsTrigger 
                  value="practice" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600"
                >
                  <Gamepad2 className="h-4 w-4 mr-2" />
                  Practice Games
                </TabsTrigger>
                <TabsTrigger 
                  value="blockchain"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600"
                >
                  <Trophy className="h-4 w-4 mr-2" />
                  Blockchain Games
                </TabsTrigger>
              </TabsList>

              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search games..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-gray-900/50 border-gray-700/50 text-white w-64"
                  />
                </div>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="px-4 py-2 bg-gray-900/50 border border-gray-700/50 rounded-md text-white"
                >
                  <option value="all">All Difficulties</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>

            {/* Practice Games Tab */}
            <TabsContent value="practice" className="mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {practiceGames.map((game) => {
                  const difficultyColor = 
                    game.difficulty === "Easy" ? "bg-green-600/20 text-green-300 border-green-500/30" :
                    game.difficulty === "Medium" ? "bg-yellow-600/20 text-yellow-300 border-yellow-500/30" :
                    "bg-red-600/20 text-red-300 border-red-500/30"
                  
                  return (
                    <Card
                      key={game.id}
                      className="bg-gray-900/50 border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 group overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-2xl"></div>
                      
                      <CardHeader className="pb-4 relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-5xl">{game.icon}</div>
                          <Badge className={difficultyColor}>
                            {game.difficulty}
                          </Badge>
                        </div>
                        <CardTitle className="text-2xl text-white group-hover:text-purple-300 transition-colors">
                          {game.title}
                        </CardTitle>
                        <CardDescription className="text-gray-400">
                          by {game.creator}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="relative z-10">
                        <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                          {game.description}
                        </p>
                        
                        <div className="grid grid-cols-3 gap-3 mb-4 p-3 bg-gray-800/30 rounded-lg">
                          <div className="text-center">
                            <Trophy className="h-5 w-5 text-purple-400 mx-auto mb-1" />
                            <div className="text-xs text-gray-400">Levels</div>
                            <div className="text-sm font-semibold text-white">{game.levels}</div>
                          </div>
                          <div className="text-center">
                            <Users className="h-5 w-5 text-blue-400 mx-auto mb-1" />
                            <div className="text-xs text-gray-400">Players</div>
                            <div className="text-sm font-semibold text-white">{game.players.toLocaleString()}</div>
                          </div>
                          <div className="text-center">
                            <Star className="h-5 w-5 text-yellow-400 mx-auto mb-1" />
                            <div className="text-xs text-gray-400">Free</div>
                            <div className="text-sm font-semibold text-white">Practice</div>
                          </div>
                        </div>
                        
                        <Button 
                          asChild
                          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg"
                        >
                          <Link href={`/game/${game.gameKey}`}>
                            <Play className="h-4 w-4 mr-2" />
                            Play Now
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            {/* Blockchain Games Tab */}
            <TabsContent value="blockchain" className="mt-8">
              <div className="mb-6 flex items-center justify-between bg-gray-900/50 border border-gray-700/50 rounded-lg p-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1 flex items-center">
                    <Crown className="h-5 w-5 mr-2 text-yellow-400" />
                    Smart Contract Games
                  </h3>
                  <p className="text-gray-400 text-sm">Compete for real prizes on the blockchain</p>
                </div>
                <Button
                  onClick={loadSmartContractGames}
                  disabled={!walletInfo || isLoadingGames}
                  variant="outline"
                  className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isLoadingGames ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </div>

              {!walletInfo && (
                <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-700/50">
                  <CardContent className="p-12 text-center">
                    <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Wallet className="h-10 w-10 text-purple-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Connect Your Wallet</h3>
                    <p className="text-gray-400 mb-6 max-w-md mx-auto">
                      Connect your wallet to view and play blockchain games with real rewards and compete for prize pools
                    </p>
                    <Button
                      onClick={handleWalletConnect}
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      <Wallet className="h-5 w-5 mr-2" />
                      Connect Wallet
                    </Button>
                  </CardContent>
                </Card>
              )}

              {gamesError && (
                <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 mb-6 rounded-lg">
                  <p className="text-sm">{gamesError}</p>
                </div>
              )}

              {isLoadingGames && (
                <div className="text-center py-20">
                  <RefreshCw className="h-12 w-12 text-purple-400 animate-spin mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">Loading games from blockchain...</p>
                </div>
              )}

              {walletInfo && !isLoadingGames && filteredBlockchainGames.length === 0 && !gamesError && (
                <Card className="bg-gray-900/50 border-gray-700/50">
                  <CardContent className="p-12 text-center">
                    <Gamepad2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold text-white mb-2">No Games Found</h3>
                    <p className="text-gray-400">
                      {searchQuery || selectedDifficulty !== "all" 
                        ? "No games match your search criteria"
                        : "No games are currently deployed on the smart contract"}
                    </p>
                  </CardContent>
                </Card>
              )}

              {filteredBlockchainGames.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBlockchainGames.map((game) => {
                    const difficulty = getDifficulty(game.levelsCount)
                    const difficultyColor = getDifficultyColor(difficulty)
                    
                    return (
                      <Card
                        key={game.gameId}
                        className="bg-gray-900/50 border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 group overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full blur-2xl"></div>
                        
                        <CardHeader className="pb-4 relative z-10">
                          <div className="flex items-center justify-between mb-4">
                            <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                              <Coins className="h-3 w-3 mr-1" />
                              {game.prizePool} HBAR
                            </Badge>
                            <Badge className={difficultyColor}>
                              {difficulty}
                            </Badge>
                          </div>
                          <CardTitle className="text-2xl text-white group-hover:text-purple-300 transition-colors">
                            {game.gameName}
                          </CardTitle>
                          <CardDescription className="text-gray-400">
                            by {formatAddress(game.owner)}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="relative z-10">
                          <div className="grid grid-cols-3 gap-3 mb-4 p-3 bg-gray-800/30 rounded-lg">
                            <div className="text-center">
                              <Trophy className="h-5 w-5 text-yellow-400 mx-auto mb-1" />
                              <div className="text-xs text-gray-400">Cost</div>
                              <div className="text-sm font-semibold text-white">{game.costOfPlay} HBAR</div>
                            </div>
                            <div className="text-center">
                              <Users className="h-5 w-5 text-blue-400 mx-auto mb-1" />
                              <div className="text-xs text-gray-400">Players</div>
                              <div className="text-sm font-semibold text-white">{game.totalPlayers}</div>
                            </div>
                            <div className="text-center">
                              <Zap className="h-5 w-5 text-purple-400 mx-auto mb-1" />
                              <div className="text-xs text-gray-400">Levels</div>
                              <div className="text-sm font-semibold text-white">{game.levelsCount}</div>
                            </div>
                          </div>
                          
                          <div className="mb-4 p-2 bg-purple-900/20 rounded-lg border border-purple-800/30">
                            <div className="text-xs text-gray-500">
                              ID: {game.gameId} • {formatAddress(game.gameAddress)}
                            </div>
                          </div>
                          
                          <Button 
                            asChild
                            className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white shadow-lg"
                          >
                            <Link href={`/blockchain-game/${game.gameAddress}`}>
                              <Play className="h-4 w-4 mr-2" />
                              Play for Rewards
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-t from-black via-gray-900 to-gray-800 border-t border-gray-700/30 py-16 px-4 mt-20">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Gamepad2 className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">HashJump</span>
          </div>
          <p className="text-gray-400 mb-4">
            The future of hyper-casual gaming on blockchain
          </p>
          <div className="text-gray-500 text-sm">
            &copy; 2024 HashJump. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}