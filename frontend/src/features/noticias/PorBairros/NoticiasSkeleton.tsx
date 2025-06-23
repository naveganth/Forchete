import { Stack, Group, Skeleton, Divider } from "@mantine/core";
import React from "react";

export const NoticiasSkeleton = () => {
  return (
    <Stack>
      {Array.from({ length: 11 }).map((_, idx) => (
        <React.Fragment key={idx}>
          <Group justify="space-between" align="flex-start" wrap="nowrap">
            <Stack gap={8} style={{ flex: 1 }}>
              <Skeleton height={20} width="60%" radius="sm" /> {/* Título */}
              <Group>
                <Skeleton height={20} width={60} radius="xl" />
                <Skeleton height={20} width={50} radius="xl" />
              </Group>
              <Skeleton height={12} width={80} radius="xl" /> {/* Data */}
            </Stack>
            <Skeleton height={72} width={72} radius="md" />
          </Group>
          {idx < 10 && <Divider my="sm" />}
        </React.Fragment>
      ))}
    </Stack>
  );
}; 