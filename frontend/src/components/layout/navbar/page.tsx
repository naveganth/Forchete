'use client';

import { IconSearch } from "@tabler/icons-react";
import { AutocompleteProps, Autocomplete, Burger, Group, Image, Text, Box, Loader, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchNoticias } from "@/hooks/use-search-noticias";
import classes from "./HeaderSearch.module.css";

const links = [
  { link: "/noticia", label: "Noticias" },
  { link: "/sobre", label: "Sobre" },
  { link: "/contato", label: "Contato" },
];

export function HeaderSearch() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();
  const { data: searchResults, isLoading, error } = useSearchNoticias(searchValue);

  useEffect(() => {
    if (error) {
      console.error('Search error:', error);
    }
    if (searchResults) {
      console.log('Current search results:', searchResults);
    }
  }, [searchResults, error]);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      onClick={(event) => {
        event.preventDefault();
        close();
      }}
    >
      {link.label}
    </a>
  ));

  const handleItemSelect = (value: string) => {
    const selectedNoticia = searchResults?.find(n => n.titulo === value);
    if (selectedNoticia) {
      window.open(selectedNoticia.link, '_blank');
      setSearchValue('');
    }
  };

  const searchData = searchResults?.map(noticia => ({
    value: noticia.titulo,
    label: noticia.titulo,
    noticia: noticia
  })) || [];

  const renderOption = ({ option }: Parameters<AutocompleteProps['renderOption']>[0] & { noticia: any }) => {
    const { noticia } = option;
    if (!noticia) return null;

    return (
      <UnstyledButton
        component="a"
        href={noticia.link}
        target="_blank"
        onClick={(e) => {
          e.preventDefault();
          handleItemSelect(noticia.titulo);
        }}
        style={{ width: '100%', textDecoration: 'none', color: 'inherit' }}
      >
        <Group wrap="nowrap" style={{ width: '100%' }}>
          <Image
            src={noticia.imagem}
            alt={noticia.titulo}
            width={50}
            height={50}
            fit="cover"
            radius="sm"
          />
          <Box style={{ flex: 1 }}>
            <Text size="sm" fw={500} lineClamp={2}>
              {noticia.titulo}
            </Text>
            <Text size="xs" c="dimmed">
              {new Date(noticia.data_post).toLocaleDateString()}
            </Text>
          </Box>
        </Group>
      </UnstyledButton>
    );
  };

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Image src="/next.svg" alt="Logo" w={"auto"} h={28} />
        </Group>
        <Autocomplete
          className={classes.search}
          placeholder="Pesquisar notícias..."
          value={searchValue}
          onChange={setSearchValue}
          leftSection={isLoading ? <Loader size="xs" /> : <IconSearch size={16} stroke={1.5} />}
          data={searchData}
          visibleFrom="sm"
          limit={5}
          maxDropdownHeight={400}
          comboboxProps={{
            shadow: "md",
            position: "bottom",
            middlewares: { flip: false, shift: false }
          }}
          styles={{
            dropdown: {
              width: '400px !important',
              maxWidth: '100%'
            }
          }}
          renderOption={renderOption}
        />
        <Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
          <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
            {items}
          </Group>
        </Group>
      </div>
    </header>
  );
}
