// TODO: add graphs to see bairros by number
"use client";

import { useQuery } from '@tanstack/react-query';
import { Noticia } from '@/types/noticia';

type Params = {
    dataInicio?: string;
    dataFim?: string;
    limit?: number;
    page?: number;
    regioes?: string[];
}

type ApiResponse = {
    noticias: Noticia[];
    total: number;
}

export function useNoticias(params?: Params) {
    const {
        dataInicio = '2020-04-01',
        dataFim = '2027-05-01',
        limit = 10,
        page = 1,
        regioes = []
    } = params || {};

    return useQuery<ApiResponse>({
        queryKey: ['list-noticias', { page, limit, dataInicio, dataFim, regioes }],
        queryFn: async () => {
            const regioesParam = regioes.length > 0 ? `&regioes=${regioes.join(',')}` : '';
            const url = `https://projeti.gabrielataide.com/pegar_noticias?data_inicio=${dataInicio}&data_fim=${dataFim}&quantidade=${limit}&page=${page}${regioesParam}`;
            console.log('Fetching from URL:', url);
            
            const response = await fetch(url);
            const data = await response.json();
            
            console.log('API Response for page', page, ':', {
                total: data.total,
                noticiasCount: data.noticias?.length,
                currentPage: page,
                limit,
                calculatedTotalPages: Math.ceil(data.total / limit)
            });
            
            if (!response.ok) {
                throw new Error(`API Error: ${data.message || 'Network response was not ok'}`);
            }
            
            if (!data.noticias || data.noticias.length === 0) {
                console.warn('No news found for the given parameters:', { 
                    page, 
                    limit, 
                    dataInicio, 
                    dataFim,
                    regioes,
                    total: data.total,
                    calculatedTotalPages: Math.ceil(data.total / limit)
                });
            }
            
            return data;
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
    });
}