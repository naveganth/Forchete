import { useQuery } from "@tanstack/react-query";
import { Noticia } from "@/types/noticia";
import { useState, useEffect } from "react";

type ApiResponse = {
  noticias: Noticia[];
  total: number;
};

export function useSearchNoticias(searchTerm: string) {
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return useQuery<Noticia[]>({
    queryKey: ["search-noticias", debouncedSearch],
    queryFn: async () => {
      if (!debouncedSearch.trim()) {
        console.log("retornando array vazio");
        return [];
      }

      const dataInicio = "2020-04-01";
      const dataFim = "2027-05-01";
      const limit = 50;
      const page = 1;

      const url = `https://projeti.gabrielataide.com/pegar_noticias?data_inicio=${dataInicio}&data_fim=${dataFim}&quantidade=${limit}&page=${page}`;
      console.log("Puxando noticias da URL:", url);

      try {
        const response = await fetch(url);
        console.log("Resposta", response.status);

        if (!response.ok) {
          console.error("API Error:", response.status, response.statusText);
          throw new Error("Falha ao buscar resultados");
        }

        const data: ApiResponse = await response.json();
        console.log("API Resposta:", data);

        if (!data.noticias || !Array.isArray(data.noticias)) {
          console.warn("Dados inválidos na resposta:", data);
          return [];
        }

        const normalizedSearchTerm = debouncedSearch
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");

        const searchResults = data.noticias
          .filter((noticia: Noticia) => {
            const normalizedTitle = noticia.titulo
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "");
            return normalizedTitle.includes(normalizedSearchTerm);
          })
          .slice(0, 5);

        console.log("Termo pesquisadi:", normalizedSearchTerm);
        console.log("Filtrando resultados da pesquisa:", searchResults);
        return searchResults;
      } catch (error) {
        console.error("Erro ao puxar os resultados das notícias:", error);
        throw error;
      }
    },
    enabled: debouncedSearch.trim().length > 0,
    staleTime: 1000 * 60 * 5,
  });
}
