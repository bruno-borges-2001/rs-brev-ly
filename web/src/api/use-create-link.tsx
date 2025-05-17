import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from ".";
import { queryClient } from "../lib/query";
import { SavedLinksResponse } from "./use-saved-links";

type CreateLinkBody = {
  url: string;
  shortUrl: string;
};

export default function useCreateLink() {
  return useMutation({
    mutationKey: ["create-link"],
    mutationFn: (data: CreateLinkBody) =>
      api.post<{ shortUrl: string }>("/link/create", data),
    onMutate: async (data: CreateLinkBody) => {
      queryClient.setQueryData<SavedLinksResponse | undefined>(
        ["saved-links"],
        (old) => {
          if (!old) return undefined;

          return {
            ...old,
            links: [
              {
                id: "-1",
                url: data.url,
                shortUrl: data.shortUrl,
                accessCount: 0,
                createdAt: new Date().toISOString(),
              },
              ...old.links,
            ],
          };
        }
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["saved-links"] });
    },
    onSuccess: () => {
      toast.success("Link criado com sucesso");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message ?? "Erro ao criar link");
        return;
      }

      toast.error("Algo de errado aconteceu");
    },
  });
}
