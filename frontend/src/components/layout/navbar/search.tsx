import { Autocomplete, Image, Text, Box, Skeleton, Loader, Group } from '@mantine/core';
import { IconSearch, IconAlertCircle } from '@tabler/icons-react';
import { useSearchNoticias } from '@/hooks/use-search-noticias';
import { useState, useCallback } from 'react';
import classes from './HeaderSearch.module.css';
import { Noticia } from '@/types/noticia';
import { useDebouncedValue } from '@mantine/hooks';
import { useRouter } from 'next/navigation';

interface SearchItem {
  value: string;
  image: string;
  label: string;
  link: string;
}

export function Search() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedValue] = useDebouncedValue(searchTerm, 300);
  const { data, isLoading, error } = useSearchNoticias(debouncedValue);

  const uniqueNews = new Map<number, Noticia>();
  data?.noticias?.forEach((noticia: Noticia) => {
    if (!uniqueNews.has(noticia.id)) {
      uniqueNews.set(noticia.id, noticia);
    }
  });

  const searchItems: SearchItem[] = Array.from(uniqueNews.values()).map((noticia: Noticia) => ({
    value: `${noticia.id}-${noticia.titulo}`,
    image: noticia.imagem || '/placeholder-image.jpg',
    label: noticia.titulo,
    link: noticia.link,
  }));

  const handleSearch = useCallback((value: string) => {
    if (value) {
      if (value.includes('-')) {
        const searchTerm = value.split('-').slice(1).join('-');
        router.push(`/search/${encodeURIComponent(searchTerm)}`);
      } else {
        router.push(`/search/${encodeURIComponent(value)}`);
      }
    }
  }, [router]);

  const renderOption = useCallback(({ option }: { option: any }) => {
    const item = option as SearchItem;
    return (
      <Box className={classes.searchOption}>
        <Group wrap="nowrap" align="center">
          <Image
            src={item.image}
            alt={item.label}
            w={180}
            h={120}
            fit="cover"
            radius="sm"
            fallbackSrc="/placeholder-image.jpg"
            loading="lazy"
          />
          <Text size="sm" lineClamp={2} className={classes.searchOptionText}>
            {item.label}
          </Text>
        </Group>
      </Box>
    );
  }, []);

  return (
    <Autocomplete
      className={classes.search}
      placeholder="Buscar notícias..."
      leftSection={<IconSearch size={16} stroke={1.5} />}
      data={searchItems}
      value={searchTerm}
      onChange={setSearchTerm}
      onOptionSubmit={handleSearch}
      onKeyDown={(event) => {
        if (event.key === 'Enter' && searchTerm) {
          event.preventDefault();
          handleSearch(searchTerm);
        }
      }}
      renderOption={renderOption}
      maxDropdownHeight={400}
      comboboxProps={{ shadow: 'md' }}
      size="md"
      radius="xl"
      limit={5}
    />
  );
}