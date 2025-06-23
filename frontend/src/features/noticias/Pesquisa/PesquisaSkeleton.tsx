import { Grid, Group, Skeleton, Stack, Divider, Box, Button } from "@mantine/core";
import React from "react";

export function PesquisaSkeleton({ count = 10 }: { count?: number }) {
  return (
    <Stack>
      <Skeleton height={30} width={350} mb="xl" />
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <React.Fragment key={index}>
            <Grid columns={12} gutter="lg">
              <Grid.Col span={{ base: 12, sm: 4 }}>
                <Skeleton height={180} radius="md" />
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 8 }}>
                <Stack justify="space-between" h="100%" gap="xs">
                  <Stack gap="xs">
                    <Group gap="xs">
                      <Skeleton height={22} width={70} radius="xl" />
                      <Skeleton height={22} width={80} radius="xl" />
                    </Group>
                    <Skeleton height={24} width="80%" />
                    <Skeleton height={24} width="70%" />
                  </Stack>
                  <Group justify="space-between" align="center">
                    <Skeleton height={16} width="120px" />
                    <Skeleton height={36} width={110} radius="md" />
                  </Group>
                </Stack>
              </Grid.Col>
            </Grid>
            {index < count - 1 && <Divider my="lg" />}
          </React.Fragment>
        ))}
    </Stack>
  );
}