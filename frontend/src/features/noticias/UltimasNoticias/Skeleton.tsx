import { Grid, Group, Skeleton, Stack, Divider, Box } from "@mantine/core";
import React from "react";

export function LatestNewsSkeleton({ count = 5 }: { count?: number }) {
  return (
    <Stack gap="lg">
      <Skeleton height={30} width={250} mb="md" />
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <React.Fragment key={index}>
            <Box
              style={{
                borderBottom: "1px solid var(--mantine-color-divider)",
              }}
            >
              <Grid>
                <Grid.Col span={{ base: 12, sm: 4 }}>
                  <Box pos="relative">
                    <Skeleton height={150} />
                  </Box>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 8 }}>
                  <Stack justify="space-between" h="100%">
                    <Stack gap="xs">
                      <Group gap="xs">
                        <Skeleton height={22} width={70} radius="xl" />
                        <Skeleton height={22} width={80} radius="xl" />
                      </Group>
                      <Skeleton height={20} />
                      <Skeleton height={20} width="90%" />
                      <Skeleton height={20} width="70%" />
                    </Stack>
                    <Skeleton height={16} width="30%" />
                  </Stack>
                </Grid.Col>
              </Grid>
            </Box>
            {index < count - 1 && <Divider my={4} />}
          </React.Fragment>
        ))}
    </Stack>
  );
}