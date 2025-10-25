"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Gamepad2, Coins, Play, Plus, Wallet, Crown, Timer, Target, Star, Zap } from "lucide-react"
import { getWalletInformation, checkWalletConnection, disconnectWallet } from "@/lib/wallet"

interface WalletInfo {
  address: string;
  network: string;
  chainId: string;
  balance: string;
}

export default function GamingPlatform() {
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

  const featuredGames = [
    {
      id: 1,
      title: "Kaboom Platformer",
      creator: "EthHack Team",
      prize: "100 HBAR",
      players: 1,
      difficulty: "Medium",
      image: "/game-preview.jpg",
      icon: "🎮",
      description: "A classic platformer game with multiple levels, enemies, and power-ups built with Kaboom.js",
      tags: ["Platformer", "Action", "Retro"]
    },
    {
      id: 2,
      title: "Space Adventure",
      creator: "Indie Dev",
      prize: "500 HBAR",
      players: 1,
      difficulty: "Hard",
      image: "/space-game.jpg",
      icon: "🚀",
      description: "Explore the cosmos in this thrilling space adventure game",
      tags: ["Space", "Adventure", "Sci-Fi"]
    },
    {
      id: 3,
      title: "Sky Jumper",
      creator: "CloudNine",
      prize: "800 HBAR",
      players: 2156,
      difficulty: "Hard",
      image: "/placeholder.svg?height=200&width=300",
      icon: "☁️",
      description: "Jump through the clouds in this exciting platformer",
      tags: ["Platformer", "Casual"]
    },
  ]

  const leaderboard = [
    { rank: 1, player: "CryptoGamer", score: 125000, tokens: "2,500 HBAR" },
    { rank: 2, player: "BlockchainBeast", score: 118000, tokens: "1,800 HBAR" },
    { rank: 3, player: "DefiDaredevil", score: 112000, tokens: "1,200 HBAR" },
    { rank: 4, player: "NFTNinja", score: 108000, tokens: "800 HBAR" },
    { rank: 5, player: "MetaverseMaster", score: 105000, tokens: "500 HBAR" },
  ]

  const handleWalletConnect = async () => {
    if (walletInfo) {
      // Disconnect wallet
      disconnectWallet()
      setWalletInfo(null)
      setError(null)
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

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Header */}
      <header className="border-b border-gray-700/30 bg-gray-900/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Gamepad2 className="h-8 w-8 text-gray-400" />
            <span className="text-2xl font-bold text-white">HashJump</span>
          </Link>
          <div className="flex items-center space-x-4">
            {walletInfo && (
              <div className="flex items-center space-x-2 text-gray-300">
                <Coins className="h-5 w-5" />
                <span className="font-semibold">{walletInfo.balance} HBAR</span>
              </div>
            )}
            <Button
              onClick={handleWalletConnect}
              disabled={isConnecting}
              variant={walletInfo ? "secondary" : "default"}
              className="bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
            >
              <Wallet className="h-4 w-4 mr-2" />
              {isConnecting 
                ? "Connecting..." 
                : walletInfo 
                  ? formatAddress(walletInfo.address)
                  : "Connect Wallet"
              }
            </Button>
          </div>
        </div>
      </header>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 mx-4 mt-4 rounded-lg">
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm font-medium mb-8">
            <Zap className="h-4 w-4 mr-2" />
            Powered by Blockchain Technology
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
            Create. Play. <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">Win.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Build hyper-casual platformer games on-chain and compete for real prizes. Fair, transparent, and
            decentralized gaming for everyone.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <Link href="/play">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg px-10 py-6 rounded-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
                disabled={!walletInfo}
              >
                <Play className="h-6 w-6 mr-3" />
                Start Playing
              </Button>
            </Link>
            <Link href="/create">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-white text-lg px-10 py-6 rounded-xl transition-all duration-300 transform hover:scale-105"
                disabled={!walletInfo}
              >
                <Plus className="h-6 w-6 mr-3" />
                Create Game
              </Button>
            </Link>
          </div>
          
          {!walletInfo && (
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-300">
              <Wallet className="h-5 w-5 mr-2" />
              Connect your wallet to start playing and creating games
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-black/40">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">1,250+</div>
              <div className="text-gray-400">Active Players</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-gray-400">Games Created</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">10,000+</div>
              <div className="text-gray-400">HBAR Won</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-gray-400">Tournaments</div>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Practice <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Your Skills</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Master the basics with our practice levels before competing for real prizes
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* Beginner Practice */}
              <Card className="bg-gradient-to-br from-green-900/20 to-green-800/10 border-green-700/50 hover:border-green-500/70 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/10 group">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-lg px-4 py-2">
                      Beginner
                    </Badge>
                    <Zap className="h-8 w-8 text-green-400" />
                  </div>
                  <CardTitle className="text-2xl text-white group-hover:text-green-300 transition-colors">
                    Easy Levels
                  </CardTitle>
                  <CardDescription className="text-gray-400 mt-2">
                    Learn the basics with simple obstacles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Levels</span>
                      <span className="text-white font-semibold">1-3</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Difficulty</span>
                      <Progress value={25} className="w-20 ml-2" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Time Limit</span>
                      <span className="text-white font-semibold flex items-center">
                        <Timer className="h-4 w-4 mr-1" />
                        5 min
                      </span>
                    </div>
                  </div>
                  
                  <Link href="/play">
                    <Button className="w-full mt-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
                      <Play className="h-4 w-4 mr-2" />
                      Start Practice
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Intermediate Practice */}
              <Card className="bg-gradient-to-br from-yellow-900/20 to-orange-800/10 border-yellow-700/50 hover:border-yellow-500/70 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/10 group">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 text-lg px-4 py-2">
                      Intermediate
                    </Badge>
                    <Zap className="h-8 w-8 text-yellow-400" />
                  </div>
                  <CardTitle className="text-2xl text-white group-hover:text-yellow-300 transition-colors">
                    Medium Levels
                  </CardTitle>
                  <CardDescription className="text-gray-400 mt-2">
                    Challenge yourself with complex paths
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Levels</span>
                      <span className="text-white font-semibold">4-7</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Difficulty</span>
                      <Progress value={60} className="w-20 ml-2" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Time Limit</span>
                      <span className="text-white font-semibold flex items-center">
                        <Timer className="h-4 w-4 mr-1" />
                        3 min
                      </span>
                    </div>
                  </div>
                  
                  <Link href="/play">
                    <Button className="w-full mt-6 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white">
                      <Play className="h-4 w-4 mr-2" />
                      Start Practice
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Advanced Practice */}
              <Card className="bg-gradient-to-br from-red-900/20 to-pink-800/10 border-red-700/50 hover:border-red-500/70 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/10 group">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="bg-red-500/20 text-red-300 border-red-500/30 text-lg px-4 py-2">
                      Advanced
                    </Badge>
                    <Zap className="h-8 w-8 text-red-400" />
                  </div>
                  <CardTitle className="text-2xl text-white group-hover:text-red-300 transition-colors">
                    Hard Levels
                  </CardTitle>
                  <CardDescription className="text-gray-400 mt-2">
                    Master mode with expert challenges
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Levels</span>
                      <span className="text-white font-semibold">8-10</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Difficulty</span>
                      <Progress value={90} className="w-20 ml-2" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Time Limit</span>
                      <span className="text-white font-semibold flex items-center">
                        <Timer className="h-4 w-4 mr-1" />
                        2 min
                      </span>
                    </div>
                  </div>
                  
                  <Link href="/play">
                    <Button className="w-full mt-6 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white">
                      <Play className="h-4 w-4 mr-2" />
                      Start Practice
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Practice Tips */}
            <Card className="bg-gray-900/50 border-gray-700/50">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Target className="h-6 w-6 mr-3 text-purple-400" />
                  Practice Mode Benefits
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Gamepad2 className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">No Risk</h4>
                      <p className="text-gray-400 text-sm">Practice without using tokens or risking rewards</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Zap className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Unlimited Attempts</h4>
                      <p className="text-gray-400 text-sm">Try as many times as you need to master each level</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Star className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Build Skills</h4>
                      <p className="text-gray-400 text-sm">Improve your gaming skills before competing</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Leaderboard Section */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Top <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Players</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See who's dominating the leaderboards and competing for the top spots
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gray-900/50 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <Crown className="h-6 w-6 mr-2 text-yellow-400" />
                  Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboard.map((player, index) => (
                    <div key={player.rank} className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          index === 0 ? 'bg-yellow-500 text-black' :
                          index === 1 ? 'bg-gray-400 text-black' :
                          index === 2 ? 'bg-orange-600 text-white' :
                          'bg-gray-600 text-white'
                        }`}>
                          {player.rank}
                        </div>
                        <div>
                          <div className="font-semibold text-white">{player.player}</div>
                          <div className="text-sm text-gray-400">{player.score.toLocaleString()} points</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-yellow-400">{player.tokens}</div>
                        <div className="text-sm text-gray-400">earned</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              What Our <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Community</span> Says
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join thousands of players and creators who are already building the future of gaming
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gray-900/50 border-gray-700/50 hover:border-green-500/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    A
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold text-white">Alex Chen</div>
                    <div className="text-sm text-gray-400">Game Creator</div>
                  </div>
                </div>
                <p className="text-gray-300 italic">
                  "HashJump has revolutionized how I think about game development. The blockchain integration makes everything transparent and fair. I've earned more in a month than I did in a year of traditional game development!"
                </p>
                <div className="flex text-yellow-400 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900/50 border-gray-700/50 hover:border-green-500/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    M
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold text-white">Maria Rodriguez</div>
                    <div className="text-sm text-gray-400">Pro Player</div>
                  </div>
                </div>
                <p className="text-gray-300 italic">
                  "The competitive aspect is incredible! Every game feels fair and the rewards are real. I've been playing for 3 months and already won over 2,000 HBAR. The community is amazing too!"
                </p>
                <div className="flex text-yellow-400 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900/50 border-gray-700/50 hover:border-green-500/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    D
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold text-white">David Kim</div>
                    <div className="text-sm text-gray-400">Indie Developer</div>
                  </div>
                </div>
                <p className="text-gray-300 italic">
                  "Finally, a platform that values creators! The tools are intuitive, the community is supportive, and the earning potential is real. This is the future of gaming."
                </p>
                <div className="flex text-yellow-400 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-cyan-900/20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Jump In?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join the revolution in blockchain gaming. Create, play, and earn with HashJump today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/play">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg px-10 py-6 rounded-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
                disabled={!walletInfo}
              >
                <Play className="h-6 w-6 mr-3" />
                Start Playing Now
              </Button>
            </Link>
            <Link href="/create">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-white text-lg px-10 py-6 rounded-xl transition-all duration-300 transform hover:scale-105"
                disabled={!walletInfo}
              >
                <Plus className="h-6 w-6 mr-3" />
                Create Your Game
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-t from-black via-gray-900 to-gray-800 border-t border-gray-700/30 py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Gamepad2 className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">HashJump</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                The future of hyper-casual gaming on blockchain. Create, play, and win together in a decentralized ecosystem.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors cursor-pointer">
                  <span className="text-white font-bold">D</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <span className="text-white font-bold">T</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors cursor-pointer">
                  <span className="text-white font-bold">R</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-6 text-lg">Platform</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-purple-400 transition-colors flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    How it Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-400 transition-colors flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Game Creator
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-400 transition-colors flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Tournaments
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-400 transition-colors flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Leaderboard
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-6 text-lg">Community</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Discord
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Reddit
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-6 text-lg">Support</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-green-400 transition-colors flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400 transition-colors flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400 transition-colors flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400 transition-colors flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Bug Reports
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700/50 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 mb-4 md:mb-0">
                <p>&copy; 2024 HashJump. All rights reserved. Built on blockchain technology.</p>
              </div>
              <div className="flex space-x-6 text-sm text-gray-400">
                <a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-purple-400 transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
