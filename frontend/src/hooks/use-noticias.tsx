import { useQuery } from '@tanstack/react-query'

type Params = {
    dataInicio: string;
    dataFim: string;
    limit: number;
    page: number;
}

export function useNoticias(params: Params){
    const { dataInicio, dataFim, limit = 10, page = 1 } = params
    return useQuery({
        queryKey: ['list-noticias', params],
        queryFn: async () => {
            const response = await fetch(`https://projeti.gabrielataide.com/pegar_noticias?data_inicio=${dataInicio}&data_fim=${dataFim}&page=${page}&quantidade=${limit}`)
            return response
        }
    })
}