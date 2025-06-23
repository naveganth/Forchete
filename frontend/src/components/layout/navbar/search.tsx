import { TextInput, rem } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function Search() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (value: string) => {
    if (value.trim()) {
      router.push(`/search?q=${encodeURIComponent(value)}`);
    }
  };

  return (
    <TextInput
      placeholder="Buscar notícias..."
      leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
      value={searchTerm}
      onChange={(event) => setSearchTerm(event.currentTarget.value)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' && searchTerm) {
          event.preventDefault();
          handleSearch(searchTerm);
        }
      }}
      size="md"
      radius="xl"
      w="100%"
      maw={rem(400)}
    />
  );
}