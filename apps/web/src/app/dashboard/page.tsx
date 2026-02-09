"use client"

import { GitBranch, Inbox, Eye, Search, ArrowUpRight, CheckCircle2, Code2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { mockContactRequests, mockDevelopers } from "@/data/mock-data"
import { DeveloperRadarChart } from "@/components/discover/radar-chart"
import { IconAnalyze, IconEye } from "@tabler/icons-react"
import { Developer } from "@/types"
import Link from "next/link"

function getDeveloperStats(developer: Developer) {
   return [
      { label: "Profile Views", value: "1,204", trend: "+12%", icon: Eye },
      { label: "Search Appearances", value: "342", trend: "+5%", icon: Search },
      { label: "Code Score", value: developer.score, trend: "+2", icon: Code2 },
   ]
}

export default function DashboardPage() {
   const developer = mockDevelopers[0]
   const pendingRequests = mockContactRequests.filter(r => r.status === "pending")
   const stats = getDeveloperStats(developer)

   return (
      <div className="container mx-auto p-6 max-w-7xl space-y-8">
         {/* Header */}
         <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
               <h1 className="text-2xl font-bold tracking-tight text-white">
                  Welcome back, {developer.name.split(" ")[0]}
               </h1>
               <p className="text-zinc-400 text-sm">
                  Here is what's happening with your profile today.
               </p>
            </div>
            <div className="flex items-center gap-2">
               <Link href="/dashboard/analysis">
                  <Button variant="outline" size="sm" className="p-4 rounded-lg">
                     <IconAnalyze className="mr-2 h-4 w-4" />
                     New Analysis
                  </Button>
               </Link>

               <Link href={`/profile/${developer.username}`}>
                  <Button size="sm" className="p-4 rounded-md" variant="outline">
                     <IconEye className="mr-2 h-4 w-4" />
                     View Public Profile
                  </Button>
               </Link>
            </div>
         </div>

         {/* KPI Cards */}
         <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map(stat => (
               <Card key={stat.label} className="bg-neutral-900 border-white/5 border-2">
                  <CardContent className="p-6 flex items-center justify-between">
                     <div className="space-y-1">
                        <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                           {stat.label}
                        </p>
                        <div className="flex items-baseline gap-2">
                           <span className="text-2xl font-bold text-white">{stat.value}</span>
                           <span className="text-xs font-medium text-emerald-500">
                              {stat.trend}
                           </span>
                        </div>
                     </div>
                     <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                        <stat.icon className="h-5 w-5" />
                     </div>
                  </CardContent>
               </Card>
            ))}
         </div>

         {/* Bento Grid Layout */}
         <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* LEFT COLUMN (8/12) */}
            <div className="md:col-span-8 space-y-6">
               {/* 1. Skill Radar Chart */}
               <Card className="bg-neutral-900 border-white/5 border-2">
                  <CardHeader>
                     <CardTitle className="text-lg">Competency Matrix</CardTitle>
                     <CardDescription>
                        Visual breakdown of your engineering strengths based on code analysis.
                     </CardDescription>
                  </CardHeader>
                  <CardContent className="h-75 flex items-center justify-center">
                     <DeveloperRadarChart />
                  </CardContent>
               </Card>

               {/* 2. Recent Repos / Analysis */}
               <Card className="bg-neutral-900 border-white/5 border-2">
                  <CardHeader className="flex flex-row items-center justify-between">
                     <div>
                        <CardTitle className="text-lg">Recent Analysis</CardTitle>
                        <CardDescription>
                           Repositories processed in the last 30 days.
                        </CardDescription>
                     </div>
                     <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                        View All
                     </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     {[1, 2, 3].map((_, i) => (
                        <div
                           key={i}
                           className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/2 hover:bg-white/4 transition-colors group"
                        >
                           <div className="flex items-center gap-4">
                              <div className="h-10 w-10 rounded bg-blue-500/10 flex items-center justify-center text-blue-500">
                                 <GitBranch className="h-5 w-5" />
                              </div>
                              <div className="space-y-1">
                                 <div className="flex items-center gap-2">
                                    <span className="font-medium text-sm text-zinc-200 group-hover:text-blue-400 transition-colors">
                                       next-ecommerce-v{i + 1}
                                    </span>
                                    <Badge
                                       variant="outline"
                                       className="text-[10px] h-5 px-1.5 text-zinc-500"
                                    >
                                       Public
                                    </Badge>
                                 </div>
                                 <p className="text-xs text-zinc-500 font-mono">
                                    updated 2 days ago
                                 </p>
                              </div>
                           </div>
                           <div className="flex items-center gap-4">
                              <div className="text-right">
                                 <div className="text-sm font-bold text-white">9{i}</div>
                                 <div className="text-[10px] text-zinc-500">Score</div>
                              </div>
                              <ArrowUpRight className="h-4 w-4 text-zinc-600" />
                           </div>
                        </div>
                     ))}
                  </CardContent>
               </Card>
            </div>

            {/* RIGHT COLUMN (4/12) */}
            <div className="md:col-span-4 space-y-6">
               {/* 1. Visibility Toggle (High Priority) */}
               <Card className="bg-neutral-900 border-white/5 overflow-hidden relative border-2">
                  <div className="absolute top-0 right-0 p-3 opacity-10">
                     <Search className="h-24 w-24" />
                  </div>
                  <CardContent className="p-6 space-y-6">
                     <div className="flex justify-between items-start">
                        <div className="space-y-1">
                           <h3 className="font-medium text-white">Open to Recruiters</h3>
                           <p className="text-xs text-zinc-500 max-w-45">
                              Your profile is visible in search results.
                           </p>
                        </div>
                        <Switch checked={developer.isOpenToRecruiters} />
                     </div>

                     <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                           <span className="text-zinc-400">Profile Completeness</span>
                           <span className="text-white font-medium">92%</span>
                        </div>
                        <Progress value={92} className="h-1.5" />
                     </div>
                  </CardContent>
               </Card>

               {/* 2. Inbox / Requests */}
               <Card className="bg-neutral-900 border-white/5 flex flex-col h-100 border-2">
                  <CardHeader className="pb-3">
                     <div className="flex items-center justify-between">
                        <CardTitle className="text-base flex items-center gap-2">
                           <Inbox className="h-4 w-4" />
                           Requests
                        </CardTitle>
                        {pendingRequests.length > 0 && (
                           <Badge className="bg-blue-600 hover:bg-blue-700 text-white border-none">
                              {pendingRequests.length} New
                           </Badge>
                        )}
                     </div>
                  </CardHeader>
                  <CardContent className="flex overflow-auto space-y-4 pr-2 flex-col">
                     {pendingRequests.length > 0 ? (
                        pendingRequests.map(req => (
                           <div
                              key={req.id}
                              className="p-3 rounded-md bg-zinc-950/50 border border-white/5 space-y-3"
                           >
                              <div className="flex items-start justify-between">
                                 <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                       <AvatarImage
                                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${req.recruiterName}`}
                                       />
                                       <AvatarFallback>RC</AvatarFallback>
                                    </Avatar>
                                    <div>
                                       <p className="text-sm font-medium text-zinc-200">
                                          {req.recruiterName}
                                       </p>
                                       {/*<p className="text-[10px] text-zinc-500">{req.company}</p>*/}
                                    </div>
                                 </div>
                                 <span className="text-[10px] text-zinc-600">2h ago</span>
                              </div>
                              <div className="flex gap-2 w-1/2">
                                 <Button
                                    size="sm"
                                    variant="secondary"
                                    className="h-7 text-xs w-full"
                                 >
                                    Accept
                                 </Button>
                                 <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-7 text-xs w-full bg-transparent"
                                 >
                                    Ignore
                                 </Button>
                              </div>
                           </div>
                        ))
                     ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-2 text-zinc-500">
                           <CheckCircle2 className="h-8 w-8 opacity-20" />
                           <p className="text-sm">You're all caught up!</p>
                        </div>
                     )}
                  </CardContent>
                  <div className="p-4 pt-0">
                     <Button
                        variant="ghost"
                        size="sm"
                        className="w-full text-zinc-400 text-xs hover:text-white"
                     >
                        View All History
                     </Button>
                  </div>
               </Card>
            </div>
         </div>
      </div>
   )
}
