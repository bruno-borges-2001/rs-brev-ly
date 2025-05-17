import { useQuery } from "@tanstack/react-query";
import { api } from ".";

export type SavedLink = {
  id: string;
  url: string;
  shortUrl: string;
  accessCount: number;
  createdAt: string;
};

export interface SavedLinksResponse {
  total: number;
  links: SavedLink[];
}

export default function useSavedLinks() {
  return useQuery({
    queryKey: ["saved-links"],
    queryFn: async () => {
      const response = await api.get<SavedLinksResponse>("/link");
      return response.data;
    },
  });
}
