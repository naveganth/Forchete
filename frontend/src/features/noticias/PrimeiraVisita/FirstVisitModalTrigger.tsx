'use client';

import { useEffect, useState } from 'react';
import { FirstVisitModal } from './FirstVisitModal';

export function FirstVisitModalTrigger() {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setOpened(true);
    }
  }, []);

  const handleSave = (bairros: string[]) => {
    localStorage.setItem('userBairros', JSON.stringify(bairros));
    localStorage.setItem('hasVisited', 'true');
    localStorage.setItem('showPwaBannerAfterLoad', 'true');
    setOpened(false);
    window.location.reload();
  };

  return (
    <FirstVisitModal
      opened={opened}
      onClose={() => setOpened(false)}
      onSave={handleSave}
    />
  );
}