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
        dataFim = new Date().toISOString().split('T')[0],
        limit = 10,
        page = 1,
        regioes = []
    } = params || {};

    return useQuery<ApiResponse>({
        queryKey: ['list-noticias', { page, limit, dataInicio, dataFim, regioes }],
        queryFn: async () => {
            const regioesParam = regioes.length > 0 ? `&regiao=${regioes.join(',')}` : '';
            const offset = (page - 1) * limit;
            const url = `https://projeti.gabrielataide.com/pegar_noticias?data_inicio=${dataInicio}&data_fim=${dataFim}&quantidade=${limit}&offset=${offset}${regioesParam}`;
            
            const response = await fetch(url);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(`API Error: ${data.message || 'Network response was not ok'}`);
            }
            
            return data;
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
    });
}