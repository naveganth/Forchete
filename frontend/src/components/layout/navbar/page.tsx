"use client";

import {
  Burger,
  Group,
  Image,
  ActionIcon,
  Drawer,
  ScrollArea,
  Stack,
  Box,
  rem,
  useMantineColorScheme,
  useComputedColorScheme,
  NavLink,
  Divider,
  Anchor,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import {
  IconSettings,
  IconSun,
  IconMoon,
  IconNews,
  IconInfoCircle,
  IconChartBar,
  IconLicense,
} from "@tabler/icons-react";
import { Search } from "./search";
import classes from "./HeaderSearch.module.css";
import { BairroModal } from "@/features/noticias/PorBairros/BairroModal";
import Link from "next/link";

const navLinks = [
  { link: "/noticia", label: "Notícias" },
  { link: "/sobre", label: "Sobre" },
  { link: "/termos", label: "Termos" },
  { link: "/estatisticas", label: "Estatísticas" },
];

const mobileNavLinks = [
  { link: "/noticia", label: "Notícias", icon: IconNews },
  { link: "/sobre", label: "Sobre", icon: IconInfoCircle },
  { link: "/termos", label: "Termos", icon: IconLicense },
  { link: "/estatisticas", label: "Estatísticas", icon: IconChartBar },
];

export function HeaderSearch() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [bairroOpened, { open: openBairro, close: closeBairro }] =
    useDisclosure(false);
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("dark", {
    getInitialValueInEffect: true,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc = mounted
    ? computedColorScheme === "dark"
      ? "/Dark.svg"
      : "/Light.svg"
    : "/Dark.svg";

  const logoStyle = { opacity: mounted ? 1 : 0, transition: "opacity 0.2s" };

  const iconStyle = { opacity: mounted ? 1 : 0, transition: "opacity 0.2s" };

  const toggleTheme = () =>
    setColorScheme(computedColorScheme === "dark" ? "light" : "dark");

  const desktopItems = navLinks.map((link) => (
    <Anchor
      href={link.link}
      component={Link}
      key={link.label}
      className={classes.link}
    >
      {link.label}
    </Anchor>
  ));

  const mobileItems = mobileNavLinks.map((link) => (
    <NavLink
      key={link.label}
      href={link.link}
      label={link.label}
      component={Link}
      onClick={close}
      leftSection={<link.icon size="1rem" stroke={1.5} />}
    />
  ));

  const handleBairroClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    close();
    openBairro();
  };

  return (
    <>
      <header className={classes.header}>
        <div className={classes.inner}>
          <Group>
            <Link href="/" className={classes.logo}>
              <Image
                src={logoSrc}
                alt="Forchete Logo"
                w={"auto"}
                h={40}
                style={logoStyle}
              />
            </Link>
          </Group>

          <Box className={classes.searchContainer} visibleFrom="md">
            <Search />
          </Box>

          <Group>
            <Group visibleFrom="lg">
              <Group gap="sm">{desktopItems}</Group>
              <Group gap="sm">
                <ActionIcon
                  variant="default"
                  size="lg"
                  onClick={toggleTheme}
                  title="Alternar tema"
                  aria-label="Alternar tema"
                  style={iconStyle}
                >
                  {mounted ? (
                    computedColorScheme === "dark" ? (
                      <IconSun size={18} />
                    ) : (
                      <IconMoon size={18} />
                    )
                  ) : (
                    <IconMoon size={18} />
                  )}
                </ActionIcon>
                <ActionIcon
                  variant="default"
                  size="lg"
                  onClick={handleBairroClick}
                  title="Selecionar bairros"
                  aria-label="Selecionar bairros"
                  style={iconStyle}
                >
                  <IconSettings size={18} />
                </ActionIcon>
              </Group>
            </Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="lg"
              size="sm"
            />
          </Group>
        </div>
      </header>

      <Drawer
        opened={opened}
        onClose={close}
        size="md"
        title={
          <Link href="/" onClick={close}>
            <Image
              src={logoSrc}
              alt="Forchete Logo"
              w="auto"
              h={30}
              style={logoStyle}
            />
          </Link>
        }
        padding={0}
        hiddenFrom="lg"
        zIndex={1000}
        position="right"
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mt="md">
          <Stack gap="sm" p="md" hiddenFrom="md">
            <Search />
          </Stack>
          <Divider />
          <Stack p="md" gap="xs">
            {mobileItems}
            <NavLink
              href="#"
              label="Preferências"
              leftSection={<IconSettings size="1rem" stroke={1.5} />}
              onClick={handleBairroClick}
            />
          </Stack>
        </ScrollArea>
      </Drawer>

      <BairroModal opened={bairroOpened} onClose={closeBairro} />
    </>
  );
}
