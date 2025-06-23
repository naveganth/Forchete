"use client";

import { useQuery } from '@tanstack/react-query';
import { Noticia } from '@/types/noticia';

type Params = {
    limit?: number;
    page?: number;
}

type ApiResponse = {
    noticias: Noticia[];
    total: number;
}

export function useLatestNews(params?: Params) {
    const {
        limit = 10,
        page = 1,
    } = params || {};

    return useQuery<ApiResponse>({
        queryKey: ['latest-noticias', { page, limit }],
        queryFn: async () => {
            const url = `https://projeti.gabrielataide.com/pegar_noticias?data_inicio=2020-04-01&data_fim=${new Date().toISOString().split('T')[0]}&quantidade=100&offset=0`;
            
            const response = await fetch(url);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(`API Error: ${data.message || 'Network response was not ok'}`);
            }

            const allNews = data.noticias;
            const startIndex = 3 + ((page - 1) * limit);
            const endIndex = startIndex + limit;
            const paginatedNews = allNews.slice(startIndex, endIndex);
            
            return {
                noticias: paginatedNews,
                total: allNews.length - 3
            };
        },
        staleTime: 1000 * 30,
        gcTime: 1000 * 60 * 5,
        refetchInterval: 1000 * 60,
        refetchIntervalInBackground: true,
    });
} 