"use client";

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { BairroModal } from '@/features/noticias/PorBairros/BairroModal';

const BAIRROS_COOKIE = 'user-bairros';

export function FirstVisitModal() {
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        if (!Cookies.get(BAIRROS_COOKIE)) {
            setShouldRender(true);
        }
    }, []);

    if (!shouldRender) {
        return null;
    }

    return <BairroModal isFirstTime />;
}