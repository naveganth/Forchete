"use client";

import { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { FirstVisitModal } from './FirstVisitModal';
import Cookies from "js-cookie";
import { COOKIE_NAME, COOKIE_OPTIONS, LOCALSTORAGE_KEY } from "@/lib/constants";

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
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(bairros));
    localStorage.setItem('hasVisited', 'true');
    localStorage.setItem('showPwaBannerAfterLoad', 'true');
    
    if (bairros.length > 0) {
      Cookies.set(COOKIE_NAME, JSON.stringify(bairros), COOKIE_OPTIONS);
    } else {
      Cookies.remove(COOKIE_NAME, { path: "/" });
    }
    
    close();
    window.dispatchEvent(new CustomEvent('show-pwa-banner'));
    window.dispatchEvent(new CustomEvent('bairros-updated'));
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