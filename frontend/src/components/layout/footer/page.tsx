'use client';

import { IconBrandInstagram, IconBrandTwitter, IconBrandYoutube } from '@tabler/icons-react';
import { ActionIcon, Container, Group, Text, useMantineColorScheme, useComputedColorScheme, Box, Anchor, Divider } from '@mantine/core';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import classes from './FooterLinks.module.css';

const navLinks = [
  { label: 'Notícias', link: '/noticia' },
  { label: 'Sobre', link: '/sobre' },
  { label: 'Termos', link: '/termos' },
  { label: 'Estatísticas', link: '/estatisticas' },
];

export function FooterLinks() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('dark', { getInitialValueInEffect: true });
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const logoSrc = mounted
    ? computedColorScheme === 'dark'
      ? '/Dark.svg'
      : '/Light.svg'
    : '/Dark.svg';
  const logoStyle = { opacity: mounted ? 1 : 0, transition: 'opacity 0.2s' };

  const links = navLinks.map((link) => (
    <Anchor
      key={link.label}
      href={link.link}
      component={Link}
      size="sm"
      c="dimmed"
      className={classes.link}
    >
      {link.label}
    </Anchor>
  ));

  return (
    <Box component="footer" className={classes.footer}>
      <Container fluid className={classes.inner}>
        <img src={logoSrc} alt="Logo" width={"auto"} height={40} style={logoStyle} />
        
        <Group gap="md" className={classes.links}>
          {links}
        </Group>

        <Group gap={0} justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandTwitter size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandYoutube size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandInstagram size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
      <Container>
         <Divider my="md" />
         <Text c="dimmed" size="sm" ta="center">
          © 2024 Forchete. Todos os direitos reservados.
        </Text>
      </Container>
    </Box>
  );
}