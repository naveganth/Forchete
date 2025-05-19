"use client";

import { useQuery } from '@tanstack/react-query';
import { Noticia } from '@/types/noticia';

type Params = {
    dataInicio?: string;
    dataFim?: string;
    limit?: number;
    page?: number;
}

type ApiResponse = Noticia[];

export function useNoticias(params?: Params) {
    const {
        dataInicio = '2020-04-01',
        dataFim = '2027-05-01',
        limit = 10,
        page = 1
    } = params || {};

    return useQuery<ApiResponse>({
        queryKey: ['list-noticias', { page, limit, dataInicio, dataFim }],
        queryFn: async () => {
            const response = await fetch(
                `https://projeti.gabrielataide.com/pegar_noticias?data_inicio=${dataInicio}&data_fim=${dataFim}&quantidade=${limit}&page=${page}`,
            );
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            return response.json();
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
    });
}