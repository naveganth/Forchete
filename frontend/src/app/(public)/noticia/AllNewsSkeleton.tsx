import { Grid, Group, Skeleton, Stack, Divider, Box, Button } from "@mantine/core";
import React from "react";

export function AllNewsSkeleton({ count = 10 }: { count?: number }) {
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
                borderRadius: 8,
                overflow: "hidden",
                background: "var(--mantine-color-body)",
                boxShadow: "var(--mantine-shadow-sm)",
                padding: 24,
              }}
            >
              <Grid columns={12} gutter="lg" align="stretch">
                <Grid.Col span={{ base: 12, sm: 4 }}>
                  <a>
                    <Box pos="relative">
                      <Skeleton height={200} radius="md" />
                    </Box>
                  </a>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 8 }}>
                  <Stack gap="xs" style={{ height: "100%" }}>
                    <Group gap="xs">
                      <Skeleton height={22} width={70} radius="xl" />
                      <Skeleton height={22} width={80} radius="xl" />
                    </Group>
                    <a style={{ textDecoration: "none" }}>
                      <Skeleton height={28} width="70%" radius="sm" />
                    </a>
                    <Skeleton height={16} width="40%" />
                    <Skeleton height={12} width="30%" />
                    <div style={{ flex: 1 }} />
                    <Button variant="light" size="md" disabled style={{ alignSelf: "flex-end", marginTop: "auto", width: 120 }}>
                      <Skeleton height={24} width={80} />
                    </Button>
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