'use client';

import { Burger, Group, Image, ActionIcon, Drawer, ScrollArea, Stack, Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSettings } from "@tabler/icons-react";
import { Search } from "./search";
import classes from "./HeaderSearch.module.css";
import { BairroModal } from "@/features/noticias/PorBairros/BairroModal";
import { rem } from '@mantine/core';

const links = [
  { link: "/noticia", label: "Noticias" },
  { link: "/sobre", label: "Sobre" },
  { link: "/contato", label: "Contato" },
];

export function HeaderSearch() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [bairroOpened, { open: openBairro, close: closeBairro }] = useDisclosure(false);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      onClick={() => {
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
            <Image src="/Logo White.svg" alt="Logo" w={"auto"} h={60} />
          </a>
        </Group>
        <Box visibleFrom="sm" w={400}>
          <Search/>
        </Box>
        <Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
          <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
            {items}
          </Group>
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
