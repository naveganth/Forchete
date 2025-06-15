"use client";

import { useQuery } from '@tanstack/react-query';
import { Noticia } from '@/types/noticia';

type BairroParams = {
    dataInicio?: string;
    dataFim?: string;
    limit?: number;
    page?: number;
    bairros?: string[];
}

type ApiResponse = {
    noticias: Noticia[];
    total: number;
}

export function useBairroNoticias(params?: BairroParams) {
    const {
        dataInicio = '2020-04-01',
        dataFim = new Date().toISOString().split('T')[0],
        limit = 10,
        page = 1,
        bairros = []
    } = params || {};

    return useQuery<ApiResponse>({
        queryKey: ['list-bairro-noticias', { page, limit, dataInicio, dataFim, bairros }],
        queryFn: async () => {
            console.log('Bairros received in useBairroNoticias queryFn:', bairros);
            const bairrosParam = bairros.length > 0 ? `&bairros=${bairros.join(',')}` : '';
            const offset = (page - 1) * limit;
            const url = `https://projeti.gabrielataide.com/pegar_noticias?data_inicio=${dataInicio}&data_fim=${dataFim}&quantidade=${limit}&offset=${offset}${bairrosParam}`;
            
            console.log('Fetching news with URL:', url);
            const response = await fetch(url);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(`API Error: ${data.message || 'Network response was not ok'}`);
            }

            console.log('First few news items:', data.noticias.slice(0, 3).map((n: Noticia) => ({
                title: n.titulo,
                date: n.data_post,
                bairro: n.regioes,
            })));
            
            return data;
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
    });
} 