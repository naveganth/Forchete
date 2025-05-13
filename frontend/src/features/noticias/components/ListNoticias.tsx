'use client'

import { Noticia } from "@/app/page";
import { useNoticias } from "@/hooks/use-noticias";
import {
  Badge,
  Card,
  Container,
  Grid,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useSearchParams } from "next/navigation";

export const ListNoticias = ({ noticias }: { noticias: Noticia[] }) => {
    const params = useSearchParams() as any
    
    const { data } = useNoticias(params);
    return (
        <Container py="xl">
        <Title order={2} mb="lg">
            Últimas Notícias
        </Title>
        <Grid>
            {data && JSON.stringify(data, null, 2)}
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

                <Stack spacing="sm" mt="md">
                    <Title order={4}>{noticia.titulo}</Title>
                    <Text size="sm" color="dimmed" lineClamp={3}>
                    Publicado em:{" "}
                    {new Date(noticia.data_post).toLocaleDateString()}
                    </Text>
                    <Stack spacing="xs" direction="row">
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