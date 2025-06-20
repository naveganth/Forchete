import { useQueries } from "@tanstack/react-query";
import { Noticia } from "@/types/noticia";

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
        queryFn: async (): Promise<Noticia[]> => {
          if (!bairro) return [];
          const dataInicio = "2020-04-01";
          const dataFim = new Date().toISOString().split("T")[0];
          const limit = 10;
          const offset = 0;
          const url = `https://projeti.gabrielataide.com/pegar_noticias?data_inicio=${dataInicio}&data_fim=${dataFim}&quantidade=${limit}&offset=${offset}&regiao=${bairro}`;

          const response = await fetch(url);
          if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Network response was not ok' }));
            throw new Error(
              `API Error: ${errorData.message || response.statusText}`
            );
          }
          const data = await response.json();
          return Array.isArray(data) ? data : [];
        },
        enabled: bairros.length > 0,
      };
    }),
  });

  const loading = queries.some((q) => q.isLoading);
  const errorQuery = queries.find((q) => q.isError);
  const error = errorQuery ? (errorQuery.error as Error).message : null;

  const allNews = queries
    .filter((q) => q.isSuccess && q.data)
    .flatMap((q) => q.data as Noticia[]);

  const uniqueNews = Array.from(new Map(allNews.map((item) => [item.id, item])).values());

  uniqueNews.sort((a, b) => new Date(b.data_post).getTime() - new Date(a.data_post).getTime());

  return {
    news: uniqueNews,
    loading,
    error: error,
  };
}