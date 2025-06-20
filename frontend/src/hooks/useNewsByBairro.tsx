import { useNoticias } from "../../src/hooks/use-noticias";
import { Noticia } from "@/types/noticia";

interface UseNewsByBairroResult {
  news: Noticia[];
  loading: boolean;
  error: string | null;
}

export function useNewsByBairro(bairros: string[]): UseNewsByBairroResult {
  const { data, isLoading, isError, error } = useNoticias({
    regioes: bairros,
  });

  return {
    news: data?.noticias || [],
    loading: isLoading,
    error: isError ? error?.message || "Ocorreu um erro desconhecido" : null,
  };
} 