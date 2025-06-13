import { Grid, Skeleton, Stack, rem } from "@mantine/core";

export function HeroSkeleton() {
  return (
    <Grid gutter="md">
      <Grid.Col
        span={{ base: 12, lg: 8 }}
        h={{ base: rem(400), lg: rem(700) }}
      >
        <Skeleton height="100%" radius="md" />
      </Grid.Col>
      <Grid.Col
        visibleFrom="lg"
        span={4}
        h={{ base: rem(300), lg: rem(700) }}
      >
        <Stack h="100%" gap="md">
          <Skeleton height="100%" radius="md" />
          <Skeleton height="100%" radius="md" />
        </Stack>
      </Grid.Col>
    </Grid>
  );
}