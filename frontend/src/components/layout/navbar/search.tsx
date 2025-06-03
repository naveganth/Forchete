import { Autocomplete, Image, Text, Box } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useSearchNoticias } from '@/hooks/use-search-noticias';
import { useState } from 'react';
import classes from './HeaderSearch.module.css';
import { Noticia } from '@/types/noticia';

interface SearchItem {
  value: string;
  image: string;
  label: string;
}

export function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: searchResults, isLoading } = useSearchNoticias(searchTerm);

  const searchItems: SearchItem[] = searchResults?.map((noticia: Noticia) => ({
    value: noticia.titulo,
    image: noticia.imagem || '/placeholder-image.jpg',
    label: noticia.titulo,
  })) || [];

  return (
    <Autocomplete
      width={800}
      className={classes.search}
      placeholder="Procurar por bairros"
      value={searchTerm}
      onChange={setSearchTerm}
      leftSection={<IconSearch size={16} stroke={1.5} />}
      data={searchItems}
      visibleFrom="xs"
      comboboxProps={{ withinPortal: true }}
      renderOption={(option) => {
        const item = option as unknown as SearchItem;
        return (
          <Box style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Image
              src={item.image}
              alt={item.label}
              width={40}
              height={40}
              fit="cover"
              radius="sm"
            />
            <Text size="sm">{item.label}</Text>
          </Box>
        );
      }}
    />
  );
}