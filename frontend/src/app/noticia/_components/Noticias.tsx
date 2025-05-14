'use client';

import { Badge, Card, Container, Grid, Image, Stack, Text, Title } from "@mantine/core"
import { useSearchParams } from "next/navigation"
import { useNoticias } from "../_hooks/use-noticias"

export const ListNoticias = () => {
    const searchParams = useSearchParams()
    const page = Number(searchParams.get('page')) || 1
    
    const { data: noticias, isLoading, error } = useNoticias({
        page,
        limit: 10,
    })

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    if (!noticias) return <div>No news found</div>

    return (
        <Container py="xl">
            <Title order={2} mb="lg">
                Últimas Notícias
            </Title>
            <Grid>
                {noticias.map((noticia) => (
                    <Grid.Col key={noticia.id} span={{ base: 12, sm: 6, md: 4 }}>
                        <Card shadow="sm" padding="lg" radius="md" withBorder>
                            <Card.Section>
                                <Image
                                    src={noticia.imagem}
                                    alt={noticia.titulo}
                                    height={160}
                                    fit="cover"
                                />
                            </Card.Section>

                            <Stack>
                                <Title order={4}>{noticia.titulo}</Title>
                                <Text size="sm" color="dimmed" lineClamp={3}>
                                    Publicado em:{" "}
                                    {new Date(noticia.data_post).toLocaleDateString()}
                                </Text>
                                <Stack>
                                    {noticia.regioes.map((regiao) => (
                                        <Badge key={regiao} color="blue" variant="light">
                                            {regiao}
                                        </Badge>
                                    ))}
                                </Stack>
                                <Text
                                    component="a"
                                    href={noticia.link}
                                    target="_blank"
                                    color="blue"
                                >
                                    Leia mais
                                </Text>
                            </Stack>
                        </Card>
                    </Grid.Col>
                ))}
            </Grid>
        </Container>
    )
}