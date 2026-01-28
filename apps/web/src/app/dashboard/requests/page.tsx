"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockContactRequests } from "@/data/mock-data"
import { ContactRequest } from "@/types"
import { Check, X, Building2, Mail, Clock } from "lucide-react"
import { DashboardCard } from "@/components/layout/dashboard-card"
import DashTitleShell from "@/components/dash-screentitle-text"

export default function RequestsPage() {
    const [requests, setRequests] = useState<ContactRequest[]>(mockContactRequests)

    const pendingRequests = requests.filter(r => r.status === "pending")
    const acceptedRequests = requests.filter(r => r.status === "accepted")
    const rejectedRequests = requests.filter(r => r.status === "rejected")

    function handleAccept(id: string) {
        setRequests(prev =>
            prev.map(r =>
                r.id === id ? { ...r, status: "accepted", recruiterEmail: "revealed@email.com" } : r
            )
        )
    }

    function handleReject(id: string) {
        setRequests(prev => prev.map(r => (r.id === id ? { ...r, status: "rejected" } : r)))
    }

    function RequestCard({ request }: { request: ContactRequest }) {
        return (
            <DashboardCard className="p-6 border-dashed bg-transparent relative">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12 border border-white/10">
                            <AvatarImage
                                src="/recruiter-portrait-male-professional.jpg"
                                alt={request.recruiterName}
                            />
                            <AvatarFallback>
                                {request.recruiterName
                                    .split(" ")
                                    .map(n => n[0])
                                    .join("")}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="font-semibold text-white">{request.recruiterName}</h3>
                            <div className="flex items-center gap-2 text-sm text-zinc-400">
                                <Building2 className="h-4 w-4" />
                                {request.recruiterCompany}
                            </div>
                        </div>
                    </div>
                    <Badge
                        variant={
                            request.status === "accepted"
                                ? "default"
                                : request.status === "rejected"
                                    ? "destructive"
                                    : "secondary"
                        }
                        className={request.status === "pending" ? "bg-primary/20 text-primary border-primary/20" : ""}
                    >
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </Badge>
                </div>

                <p className="mt-4 text-sm text-zinc-300">{request.message}</p>

                <div className="mt-4 flex items-center gap-2 text-xs text-zinc-500">
                    <Clock className="h-3 w-3" />
                    {new Date(request.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    })}
                </div>

                {request.status === "pending" && (
                    <div className="mt-6 flex flex-col sm:flex-row gap-2">
                        <Button onClick={() => handleAccept(request.id)} className="gap-2 w-full sm:w-auto">
                            <Check className="h-4 w-4" />
                            Accept
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => handleReject(request.id)}
                            className="gap-2 bg-transparent text-white border-white/10 hover:bg-white/5 w-full sm:w-auto"
                        >
                            <X className="h-4 w-4" />
                            Decline
                        </Button>
                    </div>
                )}

                {request.status === "accepted" && request.recruiterEmail && (
                    <div className="mt-6 p-4 rounded-lg border border-primary/20 bg-primary/5 flex items-center gap-3">
                        <Mail className="h-4 w-4 text-primary" />
                        <div className="flex flex-col">
                            <span className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Contact Details</span>
                            <span className="text-sm font-medium text-white">{request.recruiterEmail}</span>
                        </div>
                    </div>
                )}
            </DashboardCard>
        )
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-8 lg:py-10 mt-4 sm:mt-6">
            <div className="space-y-8">
                <DashTitleShell
                    title="Contact Requests"
                    description="Manage your professional inquiries from interested recruiters"
                />

                <Tabs defaultValue="pending" className="w-full">
                    <TabsList className="bg-transparent border-b border-white/10 w-full justify-start rounded-none h-auto p-0 gap-8">
                        <TabsTrigger
                            value="pending"
                            className="data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:border-primary border-b-2 border-transparent rounded-none px-0 py-2 text-zinc-400 font-medium transition-all"
                        >
                            Pending
                            {pendingRequests.length > 0 && (
                                <Badge variant="secondary" className="ml-2 bg-primary/20 text-primary border-none text-[10px] h-4 min-w-4 px-1 flex items-center justify-center">
                                    {pendingRequests.length}
                                </Badge>
                            )}
                        </TabsTrigger>
                        <TabsTrigger
                            value="accepted"
                            className="data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:border-primary border-b-2 border-transparent rounded-none px-0 py-2 text-zinc-400 font-medium transition-all"
                        >
                            Accepted
                        </TabsTrigger>
                        <TabsTrigger
                            value="rejected"
                            className="data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:border-primary border-b-2 border-transparent rounded-none px-0 py-2 text-zinc-400 font-medium transition-all"
                        >
                            Declined
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="pending" className="mt-8">
                        {pendingRequests.length === 0 ? (
                            <DashboardCard className="p-12 text-center border-dashed bg-transparent relative">
                                <p className="text-zinc-500">No pending requests at the moment</p>
                            </DashboardCard>
                        ) : (
                            <div className="grid gap-6 md:grid-cols-2">
                                {pendingRequests.map(request => (
                                    <RequestCard key={request.id} request={request} />
                                ))}
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="accepted" className="mt-8">
                        {acceptedRequests.length === 0 ? (
                            <DashboardCard className="p-12 text-center border-dashed bg-transparent relative">
                                <p className="text-zinc-500">You haven't accepted any requests yet</p>
                            </DashboardCard>
                        ) : (
                            <div className="grid gap-6 md:grid-cols-2">
                                {acceptedRequests.map(request => (
                                    <RequestCard key={request.id} request={request} />
                                ))}
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="rejected" className="mt-8">
                        {rejectedRequests.length === 0 ? (
                            <DashboardCard className="p-12 text-center border-dashed bg-transparent relative">
                                <p className="text-zinc-500">No declined requests</p>
                            </DashboardCard>
                        ) : (
                            <div className="grid gap-6 md:grid-cols-2">
                                {rejectedRequests.map(request => (
                                    <RequestCard key={request.id} request={request} />
                                ))}
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
