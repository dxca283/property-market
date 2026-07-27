import { conversationService } from "@/services/conversation.service"
import { useQuery } from "@tanstack/react-query"

export const useConversations = () => {
    return useQuery({
        queryKey: ["conversations"],
        queryFn: () => conversationService.getConversations(),
        staleTime: 1000 * 60 * 5 // 5 minutes
    })
}