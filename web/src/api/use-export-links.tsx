import { useMutation } from "@tanstack/react-query";
import { api } from ".";

export default function useExportLinks() {
  return useMutation({
    mutationKey: ["export-links"],
    mutationFn: async () => {
      const response = await api.get<{ url: string }>("/link/export");
      return response.data;
    },
  });
}
