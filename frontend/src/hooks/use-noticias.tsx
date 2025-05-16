'use client';
import { useQuery } from '@tanstack/react-query'
import { Noticia } from '@/app/page'

type Params = {
    dataInicio?: string;
    dataFim?: string;
    limit?: number;
    page?: number;
}

export function useNoticias(params?: Params) {
    const {
        dataInicio = '2020-04-01',
        dataFim = '2027-05-01',
        limit = 10,
        page = 1
    } = params || {}

    return useQuery<Noticia[]>({
        queryKey: ['list-noticias', params],
        queryFn: async () => {
            const response = await fetch(
                `https://projeti.gabrielataide.com/pegar_noticias?data_inicio=${dataInicio}&data_fim=${dataFim}&quantidade=${limit}&offset=${(page - 1) * limit}`
            )
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        }
    })
}