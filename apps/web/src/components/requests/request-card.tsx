import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Check, X, Building2, Mail, Clock } from "lucide-react"

import type { ContactRequest } from "@/types"

export function RequestCard({
  request,
  setRequests,
}: {
  request: ContactRequest
  setRequests: React.Dispatch<React.SetStateAction<ContactRequest[]>>
}) {
  return (
    <Card className="p-6 rounded-xl border bg-card shadow-sm transition hover:shadow-md">
      {/* Header */}
      <RequestCardHeader request={request} />

      {/* Message */}
      <p className="mt-4 text-sm leading-relaxed text-foreground/80">{request.message}</p>

      {/* Footer */}
      <RequestCardFooter request={request} setRequests={setRequests} />

      {/* Revealed contact */}
      {request.status === "accepted" && request.recruiterEmail && (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-sm">
          <Mail className="h-4 w-4 text-primary" />
          <span className="font-medium">{request.recruiterEmail}</span>
        </div>
      )}
    </Card>
  )
}

function RequestCardHeader({ request }: { request: ContactRequest }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-start gap-4">
        <Avatar className="h-11 w-11">
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
          <h3 className="font-semibold leading-none">{request.recruiterName}</h3>
          <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
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
        className="capitalize"
      >
        {request.status}
      </Badge>
    </div>
  )
}

function RequestCardFooter({
  request,
  setRequests,
}: {
  setRequests: React.Dispatch<React.SetStateAction<ContactRequest[]>>
  request: ContactRequest
}) {
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
  return (
    <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Clock className="h-3.5 w-3.5" />
        {new Date(request.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </div>

      {request.status === "pending" && (
        <div className="flex gap-2">
          <Button size="sm" onClick={() => handleAccept(request.id)}>
            <Check className="h-4 w-4 mr-1" />
            Accept
          </Button>
          <Button size="sm" variant="outline" onClick={() => handleReject(request.id)}>
            <X className="h-4 w-4 mr-1" />
            Decline
          </Button>
        </div>
      )}
    </div>
  )
}
