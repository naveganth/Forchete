'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { BairroModal } from '@/features/noticias/PorBairros/BairroModal';
import { FirstVisitModal } from '@/features/noticias/PrimeiraVisita/FirstVisitModal';
import { useDisclosure } from '@mantine/hooks';

const FIRST_VISIT_COOKIE = 'forchete-first-visit-done';
const BAIRROS_COOKIE = 'user-bairros';

export function FirstVisitModalTrigger() {
    const [opened, { open, close }] = useDisclosure(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient) {
            const firstVisitDone = Cookies.get(FIRST_VISIT_COOKIE);
            const hasBairros = Cookies.get(BAIRROS_COOKIE);

            if (!firstVisitDone && !hasBairros) {
                open();
            }
        }
    }, [isClient, open]);

    const handleClose = () => {
        close();
        Cookies.set(FIRST_VISIT_COOKIE, 'true', { expires: 365 });
    };

    const handleFirstVisitSave = (bairros: string[]) => {
        Cookies.set(BAIRROS_COOKIE, JSON.stringify(bairros), { expires: 365 });
        window.dispatchEvent(new Event('bairros-updated'));
        handleClose();
    };

    if (!isClient) {
        return null;
    }

    return (
        <FirstVisitModal
            opened={opened}
            onClose={handleClose}
            onSave={handleFirstVisitSave}
        />
    );
}