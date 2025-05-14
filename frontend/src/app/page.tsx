'use client';

import { Alert } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

export default function Demo() {
  const icon = <IconInfoCircle />;
  return (
    <Alert variant='light' color='dark' title='Alerta naqueles pique' icon={icon}>
      <h1> SEU MONGOL </h1>
      <a href='/noticia'>Vá para a página de notícias.</a>
    </Alert >
  );
}