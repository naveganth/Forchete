"use client";

import { IconSearch } from "@tabler/icons-react";
import { Autocomplete, Burger, Group, Image } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./HeaderSearch.module.css";

const links = [
  { link: "/noticia", label: "Noticias" },
  { link: "/sobre", label: "Sobre" },
  { link: "/contato", label: "Contato" },
];

export function HeaderSearch() {
  const [opened, { toggle, close }] = useDisclosure(false);

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

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Image src="/next.svg" alt="Logo" w={"auto"} h={28} />
        </Group>
        <Autocomplete
          className={classes.search}
          placeholder="Pesquisar"
          leftSection={<IconSearch size={16} stroke={1.5} />}
          data={[
            "React",
            "Angular",
            "Vue",
            "Next.js",
            "Riot.js",
            "Svelte",
            "Blitz.js",
          ]}
          visibleFrom="sm"
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
