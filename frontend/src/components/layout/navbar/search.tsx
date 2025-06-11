import { TextInput, Image, Text, Box, Skeleton, Loader, Group } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useState } from 'react';
import classes from './HeaderSearch.module.css';
import { useRouter } from 'next/navigation';

export function Search() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (value: string) => {
    if (value) {
      const normalizedValue = value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      router.push(`/search/${encodeURIComponent(normalizedValue)}`);
    }
  };

  return (
    <TextInput
      className={classes.search}
      placeholder="Buscar notícias..."
      leftSection={<IconSearch size={16} stroke={1.5} />}
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
    />
  );
}