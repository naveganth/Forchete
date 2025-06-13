import { Grid, Group, Skeleton, Stack } from "@mantine/core";

export function LatestNewsSkeleton({ count = 5 }: { count?: number }) {
  return (
    <Stack gap="lg">
      <Skeleton height={30} width={250} mb="md" />
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <Grid key={index}>
            <Grid.Col span={{ base: 12, sm: 4 }}>
              <Skeleton height={150} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 8 }}>
              <Stack justify="space-between" h="100%">
                <Stack>
                  <Group>
                    <Skeleton height={22} width={70} radius="xl" />
                    <Skeleton height={22} width={80} radius="xl" />
                  </Group>
                  <Skeleton height={20} mt="xs" />
                  <Skeleton height={20} width="90%" />
                  <Skeleton height={20} width="70%" />
                </Stack>
                <Skeleton height={16} width="30%" mt="md" />
              </Stack>
            </Grid.Col>
          </Grid>
        ))}
    </Stack>
  );
}