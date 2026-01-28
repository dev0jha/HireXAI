"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockContactRequests } from "@/data/mock-data"
import { ContactRequest } from "@/types"
import { PlusIcon } from "lucide-react"
import { RequestCard } from "@/components/requests/request-card"

export default function RequestsPage() {
  const [requests, setRequests] = useState<ContactRequest[]>(mockContactRequests)

  const pendingRequests = requests.filter(r => r.status === "pending")
  const acceptedRequests = requests.filter(r => r.status === "accepted")
  const rejectedRequests = requests.filter(r => r.status === "rejected")

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 mt-4 sm:mt-6 font-poppins">
      <div className="space-y-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold font-poppins">Contact Requests</h1>
          <p className="text-muted-foreground mt-1 font-poppins">
            Manage contact requests from recruiters
          </p>
        </div>

        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="pending" className="gap-2 flex-1 sm:flex-none">
              Pending
              {pendingRequests.length > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 text-xs">
                  {pendingRequests.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="accepted" className="flex-1 sm:flex-none">
              Accepted
            </TabsTrigger>
            <TabsTrigger value="rejected" className="flex-1 sm:flex-none">
              Declined
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-6">
            {pendingRequests.length === 0 ? (
              <Card className="p-8 text-center border-dashed border rounded-none bg-transparent relative before:rounded-none">
                <PlusIcon
                  className="-top-[12.5px] -left-[12.5px] absolute h-6 w-6 text-zinc-800"
                  strokeWidth={2}
                />
                <PlusIcon
                  className="-bottom-[12.5px] -right-[12.5px] absolute h-6 w-6 text-zinc-800"
                  strokeWidth={2}
                />
                <p className="text-muted-foreground">No pending requests</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {pendingRequests.map(request => (
                  <RequestCard key={request.id} request={request} setRequests={setRequests} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="accepted" className="mt-6">
            {acceptedRequests.length === 0 ? (
              <Card className="p-8 text-center border-dashed border rounded-none bg-transparent relative before:rounded-none">
                <PlusIcon
                  className="-top-[12.5px] -left-[12.5px] absolute h-6 w-6 text-zinc-800"
                  strokeWidth={2}
                />
                <PlusIcon
                  className="-bottom-[12.5px] -right-[12.5px] absolute h-6 w-6 text-zinc-800"
                  strokeWidth={2}
                />
                <p className="text-muted-foreground">No accepted requests</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {acceptedRequests.map(request => (
                  <RequestCard key={request.id} request={request} setRequests={setRequests} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="rejected" className="mt-6">
            {rejectedRequests.length === 0 ? (
              <Card className="p-8 text-center border-dashed border rounded-none bg-transparent relative before:rounded-none">
                <PlusIcon
                  className="-top-[12.5px] -left-[12.5px] absolute h-6 w-6 text-zinc-800"
                  strokeWidth={2}
                />
                <PlusIcon
                  className="-bottom-[12.5px] -right-[12.5px] absolute h-6 w-6 text-zinc-800"
                  strokeWidth={2}
                />
                <p className="text-muted-foreground">No declined requests</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {rejectedRequests.map(request => (
                  <RequestCard key={request.id} request={request} setRequests={setRequests} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
