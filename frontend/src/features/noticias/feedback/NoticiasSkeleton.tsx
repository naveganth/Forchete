import {
  Badge,
  Card,
  Container,
  Grid,
  Stack,
  Group,
  Skeleton,
} from "@mantine/core";

export const NoticiasSkeleton = () => {
  return (
    <Container py="xl">
      <Skeleton height={36} width={200} mb="lg" />
      <Grid>
        {Array(12).fill(0).map((_, index) => (
          <Grid.Col key={index} span={{ base: 12, sm: 6, md: 4 }}>
            <Card
              h={480}
              mah={480}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
            >
              <Card.Section>
                <Skeleton height={200} />
              </Card.Section>

              <Stack>
                <Skeleton height={24} mt={20} />
                <Skeleton height={16} width="60%" />
                <Group gap="xs">
                  <Skeleton height={20} width={60} />
                  <Skeleton height={20} width={80} />
                </Group>
                <Skeleton height={36} mt="auto" />
              </Stack>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}; 