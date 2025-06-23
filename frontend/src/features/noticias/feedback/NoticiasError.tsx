import { Center, Text } from "@mantine/core";

interface NoticiasErrorProps {
  error?: Error | null;
  message?: string;
}

export const NoticiasError = ({ error, message }: NoticiasErrorProps) => {
  if (error instanceof Error) {
    return (
      <Center h="100vh">
        <Text c="red">Erro ao carregar notícias: {error.message}</Text>
      </Center>
    );
  }

  return (
    <Center h="100vh">
      <Text>{message || "Nenhuma notícia encontrada"}</Text>
    </Center>
  );
}; 