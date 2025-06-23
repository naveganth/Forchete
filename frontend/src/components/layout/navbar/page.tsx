'use client';

import { Burger, Group, Image, ActionIcon, Drawer, ScrollArea, Stack, Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { IconSettings, IconSun, IconMoon } from "@tabler/icons-react";
import { Search } from "./search";
import classes from "./HeaderSearch.module.css";
import { BairroModal } from "@/features/noticias/PorBairros/BairroModal";
import { rem } from '@mantine/core';
import Link from 'next/link';
import { useMantineColorScheme, useComputedColorScheme } from "@mantine/core";

const links = [
  { link: "/noticia", label: "Notícias" },
  { link: "/sobre", label: "Sobre" },
  { link: "/termos", label: "Termos" },
  { link: "/estatisticas", label: "Estatísticas" },
];

export function HeaderSearch() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [bairroOpened, { open: openBairro, close: closeBairro }] = useDisclosure(false);
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("dark", { getInitialValueInEffect: true });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc = mounted
    ? computedColorScheme === "dark"
      ? "/Dark.svg"
      : "/Light.svg"
    : "/Dark.svg";

  const logoStyle = { opacity: mounted ? 1 : 0, transition: 'opacity 0.2s' };

  const toggleTheme = () => setColorScheme(computedColorScheme === "dark" ? "light" : "dark");

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      onClick={(event) => {
        close();
      }}
    >
      {link.label}
    </a>
  ));

  const handleBairroClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    openBairro();
  };

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <a href="/">
            <Image src={logoSrc} alt="Logo" w={"auto"} h={50} style={logoStyle} />
          </a>
        </Group>
        <Box className={classes.searchContainer} visibleFrom="sm">
          <Search/>
        </Box>
        <Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
          <Group gap={5} className={classes.links} visibleFrom="sm">
            {items}
          </Group>
          <ActionIcon
            variant="default"
            size="lg"
            onClick={toggleTheme}
            title="Alternar tema"
            aria-label="Alternar tema"
          >
            {!mounted ? (
              <IconMoon size={20} />
            ) : computedColorScheme === "dark" ? (
              <IconSun size={20} />
            ) : (
              <IconMoon size={20} />
            )}
          </ActionIcon>
          <Box visibleFrom="sm">
            <ActionIcon 
              variant="light" 
              size="lg" 
              onClick={handleBairroClick}
              title="Selecionar bairros"
            >
              <IconSettings size={20} />
            </ActionIcon>
          </Box>
        </Group>
      </div>

      <Drawer
        opened={opened}
        onClose={close}
        size="xs"
        title="Navegação"
        padding="xl"
        position="right"
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Stack gap="md">
            {items}
            <Box hiddenFrom="sm">
              <Search/>
            </Box>
            <Box hiddenFrom="sm">
              <ActionIcon 
                variant="light" 
                size="lg" 
                onClick={() => {close(); openBairro();}}
                title="Selecionar bairros"
              >
                <IconSettings size={20} />
              </ActionIcon>
            </Box>
          </Stack>
        </ScrollArea>
      </Drawer>

      <BairroModal 
        opened={bairroOpened} 
        onClose={closeBairro}
      />
    </header>
  );
}
