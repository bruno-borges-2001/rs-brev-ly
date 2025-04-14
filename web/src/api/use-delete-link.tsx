import { useMutation } from "react-query";
import { api } from ".";
import { queryClient } from "../lib/query";
import { SavedLinksResponse } from "./use-saved-links";
export default function useDeleteLink() {
  return useMutation({
    mutationKey: ['delete-link'],
    mutationFn: async (id: string) => api.delete(`/link/${id}`),
    onMutate: async (id: string) => {
      queryClient.setQueryData<SavedLinksResponse | undefined>(['saved-links'], (old) => {
        if (!old) return undefined

        return {
          ...old,
          links: old.links.filter((link) => link.id !== id)
        }
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['saved-links'] })
    }
  })
}