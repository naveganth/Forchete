import { useQueries } from "@tanstack/react-query";
import { Noticia } from "@/types/noticia";

interface ApiResponse {
  noticias: Noticia[];
}

interface UseNewsByBairroResult {
  news: Noticia[];
  loading: boolean;
  error: string | null;
}

export function useNewsByBairro(bairros: string[]): UseNewsByBairroResult {
  const queries = useQueries({
    queries: bairros.map((bairro) => {
      return {
        queryKey: ["noticias-by-bairro", bairro],
        queryFn: async (): Promise<ApiResponse> => {
          if (!bairro) return { noticias: [] };
          const dataInicio = "2020-04-01";
          const dataFim = new Date().toISOString().split("T")[0];
          const limit = 20; // Fetch more to have a good list after combining
          const offset = 0;
          const url = `https://projeti.gabrielataide.com/pegar_noticias?data_inicio=${dataInicio}&data_fim=${dataFim}&quantidade=${limit}&offset=${offset}&regiao=${bairro}`;

          const response = await fetch(url);
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
              `API Error: ${response.statusText} - ${errorText}`
            );
          }
          const data = await response.json();
          
          if (data && data.noticias) {
            return data;
          }
          
          // Handle case where API might return a raw array
          if(Array.isArray(data)) {
            return { noticias: data };
          }

          return { noticias: [] };
        },
        enabled: bairros.length > 0,
        staleTime: 1000 * 60 * 5, // 5 minutes
      };
    }),
  });

  const loading = queries.some((q) => q.isLoading);
  const errorQuery = queries.find((q) => q.isError);
  const error = errorQuery ? (errorQuery.error as Error).message : null;

  if (bairros.length === 0) {
    return { news: [], loading: false, error: null };
  }

  const allNews = queries
    .filter((q) => q.isSuccess && q.data && q.data.noticias)
    .flatMap((q) => q.data!.noticias);

  const uniqueNews = Array.from(new Map(allNews.map((item) => [item.id, item])).values());

  uniqueNews.sort((a, b) => new Date(b.data_post).getTime() - new Date(a.data_post).getTime());

  return {
    news: uniqueNews,
    loading,
    error,
  };
}