
export const useRequestsState(){

  const [requests, setRequests] = useState<ContactRequest[]>(mockContactRequests)

  const pendingRequests = requests.filter(r => r.status === "pending")
  const acceptedRequests = requests.filter(r => r.status === "accepted")
  const rejectedRequests = requests.filter(r => r.status === "rejected")



}
