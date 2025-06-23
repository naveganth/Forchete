import { useEffect, useState } from "react";
import { Noticia } from "@/types/noticia";

const NOTICIAS_API_URL = `https://projeti.gabrielataide.com/pegar_noticias?data_inicio=2010-01-01&data_fim=2027-12-31&quantidade=10000&offset=0`;

export function useAllNoticias() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetch(NOTICIAS_API_URL)
      .then(async (res) => {
        if (!res.ok) throw new Error("Falha ao buscar notícias");
        const data = await res.json();
        return new Promise((resolve) => setTimeout(() => resolve(data), 1000));
      })
      .then((data: any) => {
        setNoticias(data.noticias || []);
      })
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, []);

  return { noticias, isLoading, error };
} 