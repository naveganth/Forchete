import { useQuery } from "@tanstack/react-query";
import { Noticia } from "@/types/noticia";

type ApiResponse = {
  noticias: Noticia[];
  total: number;
};

export function useSearchNoticias(searchTerm: string, page: number = 1, limit: number = 10) {
  return useQuery<ApiResponse>({
    queryKey: ["search-noticias", searchTerm, page, limit],
    queryFn: async () => {
      if (!searchTerm.trim()) {
        return { noticias: [], total: 0 };
      }

      const dataInicio = "2010-01-01";
      const dataFim = "2027-12-31";

      const url = `https://projeti.gabrielataide.com/pegar_noticias?data_inicio=${dataInicio}&data_fim=${dataFim}&quantidade=10000&offset=0`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Falha ao buscar resultados");
      }
      const data: ApiResponse = await response.json();

      const normalizedSearchTerm = searchTerm
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      // Filtra todas as notícias pelo termo
      const filteredNoticias = data.noticias.filter((noticia) => {
        const normalizedTitle = noticia.titulo
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        const normalizedRegions = noticia.regioes
          .map(region => region
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, ""))
          .join(" ");
        return normalizedTitle.includes(normalizedSearchTerm) || 
               normalizedRegions.includes(normalizedSearchTerm);
      });

      // Pagina no frontend
      const start = (page - 1) * limit;
      const end = start + limit;
      const paginatedNoticias = filteredNoticias.slice(start, end);

      return {
        noticias: paginatedNoticias,
        total: filteredNoticias.length
      };
    },
    enabled: searchTerm.trim().length > 0,
    staleTime: 1000 * 60 * 5,
  });
}
