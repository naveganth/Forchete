"use client";

import { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { FirstVisitModal } from './FirstVisitModal';

export function FirstVisitModalTrigger() {
  const [opened, { open, close }] = useDisclosure(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      open();
    }
  }, [open]);

  const handleSave = (bairros: string[]) => {
    localStorage.setItem('userBairros', JSON.stringify(bairros));
    localStorage.setItem('hasVisited', 'true');
    localStorage.setItem('showPwaBannerAfterLoad', 'true');
    close();

    window.dispatchEvent(new CustomEvent('show-pwa-banner'));
  };

  if (!isClient) {
    return null;
  }

  return (
    <FirstVisitModal
      opened={opened}
      onClose={close}
      onSave={handleSave}
    />
  );
}