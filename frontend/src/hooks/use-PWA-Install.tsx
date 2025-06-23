"use client";

import { useState, useEffect } from 'react';

export const usePWAInstall = () => {
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstallBannerVisible, setIsInstallBannerVisible] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const beforeInstallPromptHandler = (e: Event) => {
      e.preventDefault();
      setIsInstallable(true);
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler);

    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstallPromptHandler);
    };
  }, []);

  useEffect(() => {
    const checkForBanner = () => {
      const shouldShow = localStorage.getItem('showPwaBannerAfterLoad') === 'true';
      if (isInstallable && shouldShow) {
        setIsInstallBannerVisible(true);
        localStorage.removeItem('showPwaBannerAfterLoad');
      }
    };

    checkForBanner();

    window.addEventListener('show-pwa-banner', checkForBanner);

    return () => {
      window.removeEventListener('show-pwa-banner', checkForBanner);
    };
  }, [isInstallable]);

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
        } else {
        }
        setDeferredPrompt(null);
        setIsInstallBannerVisible(false);
      });
    }
  };

  const dismissInstallBanner = () => {
    setIsInstallBannerVisible(false);
  };

  return {
    isInstallable,
    isInstallBannerVisible,
    handleInstall,
    dismissInstallBanner,
  };
};