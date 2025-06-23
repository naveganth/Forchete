"use client";

import { useState, useEffect } from "react";

export const usePWAInstall = () => {
  const [installPrompt, setInstallPrompt] = useState<Event | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstallBannerVisible, setIsInstallBannerVisible] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  useEffect(() => {
    const shouldShowBanner = localStorage.getItem("showPwaBannerAfterLoad");

    if (isInstallable && shouldShowBanner === "true") {
      setIsInstallBannerVisible(true);
      localStorage.removeItem("showPwaBannerAfterLoad");
    }
  }, [isInstallable]);

  const handleInstall = () => {
    if (installPrompt) {
      (installPrompt as any).prompt();
      (installPrompt as any).userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          console.log("Usuário instalou o PWA");
        } else {
          console.log("Usuário recusou a instalação do PWA");
        }
        setInstallPrompt(null);
        setIsInstallable(false);
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
