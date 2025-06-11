import {
  Card,
  Container,
  Grid,
  Stack,
  Group,
  Skeleton,
} from "@mantine/core";

interface NoticiasSkeleton2Props {
  count?: number;
}

export const NoticiasSkeleton2 = ({ count = 5 }: NoticiasSkeleton2Props) => {
  return (
    <Container size="xl" py="xl">
      <Grid columns={12} gutter="lg">
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Stack gap="lg">
            {Array(count).fill(0).map((_, index) => (
              <Card
                key={index}
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
              >
                <Grid columns={12} gutter="lg">
                  <Grid.Col span={{ base: 12, sm: 4 }}>
                    <Skeleton height={200} />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 8 }}>
                    <Stack gap="xs">
                      <Group gap="xs">
                        <Skeleton height={24} width={80} />
                        <Skeleton height={24} width={100} />
                      </Group>
                      <Skeleton height={24} width="90%" />
                      <Skeleton height={24} width="60%" />
                      <Skeleton height={36} width={120} mt="auto" />
                    </Stack>
                  </Grid.Col>
                </Grid>
              </Card>
            ))}
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Skeleton height={400} />
        </Grid.Col>
      </Grid>
    </Container>
  );
}; 