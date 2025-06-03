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
        return [];
      }

      console.log("Starting search with term:", debouncedSearch);

      const dataInicio = "2010-01-01";
      const dataFim = "2027-12-31";
      const limit = 50; // Reduced limit to avoid potential API issues
      let allNoticias: Noticia[] = [];
      let currentPage = 1;
      let totalPages = 1;

      try {
        // First request to get total count
        const initialUrl = `https://projeti.gabrielataide.com/pegar_noticias?data_inicio=${dataInicio}&data_fim=${dataFim}&quantidade=${limit}&page=${currentPage}`;
        console.log("Fetching from URL:", initialUrl);
        const initialResponse = await fetch(initialUrl);
        
        if (!initialResponse.ok) {
          throw new Error("Falha ao buscar resultados");
        }

        const initialData: ApiResponse = await initialResponse.json();
        console.log("Initial API response:", initialData);

        if (!initialData.noticias || initialData.noticias.length === 0) {
          console.log("No news found in initial response, trying with offset");
          // Try with offset instead of page
          const offsetUrl = `https://projeti.gabrielataide.com/pegar_noticias?data_inicio=${dataInicio}&data_fim=${dataFim}&quantidade=${limit}&offset=0`;
          const offsetResponse = await fetch(offsetUrl);
          if (!offsetResponse.ok) {
            throw new Error("Falha ao buscar resultados com offset");
          }
          const offsetData: ApiResponse = await offsetResponse.json();
          console.log("Offset API response:", offsetData);
          allNoticias = [...offsetData.noticias];
          totalPages = Math.ceil(offsetData.total / limit);
        } else {
          allNoticias = [...initialData.noticias];
          totalPages = Math.ceil(initialData.total / limit);
        }

        // Fetch remaining pages
        const remainingPages = Array.from({ length: totalPages - 1 }, (_, i) => i + 1);
        const remainingPromises = remainingPages.map(page => {
          const offset = page * limit;
          return fetch(`https://projeti.gabrielataide.com/pegar_noticias?data_inicio=${dataInicio}&data_fim=${dataFim}&quantidade=${limit}&offset=${offset}`)
            .then(res => res.json())
            .then((data: ApiResponse) => data.noticias)
            .catch(error => {
              console.error(`Error fetching page ${page}:`, error);
              return [];
            });
        });

        const remainingResults = await Promise.all(remainingPromises);
        allNoticias = [...allNoticias, ...remainingResults.flat()];

        console.log("Total news loaded:", allNoticias.length);

        const normalizedSearchTerm = debouncedSearch
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");

        console.log("Normalized search term:", normalizedSearchTerm);

        const searchResults = allNoticias.filter((noticia: Noticia) => {
          const normalizedTitle = noticia.titulo
            ?.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") || "";

          const normalizedRegions = noticia.regioes
            ?.map(region => region
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, ""))
            .join(" ") || "";

          const matchesTitle = normalizedTitle.includes(normalizedSearchTerm);
          const matchesRegions = normalizedRegions.includes(normalizedSearchTerm);

          if (matchesTitle || matchesRegions) {
            console.log("Found match:", {
              title: noticia.titulo,
              normalizedTitle,
              regions: noticia.regioes,
              normalizedRegions,
              matchesTitle,
              matchesRegions
            });
          }

          return matchesTitle || matchesRegions;
        });

        console.log("Search results count:", searchResults.length);
        console.log("Search results:", searchResults.map(n => n.titulo));
        return searchResults;
      } catch (error) {
        console.error("Erro ao buscar notícias:", error);
        throw error;
      }
    },
    enabled: debouncedSearch.trim().length > 0,
    staleTime: 1000 * 60 * 5,
  });
}
