import { useEffect, useState } from "react";
import { BiSave } from "react-icons/bi";

type Props = {
    label?: string;
    className?: string;
};

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export function SaveButton({ label = 'Скачать', className }: Props) {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

    useEffect(() => {
        const handler = (e: Event) => {
            if ('prompt' in e) {
                e.preventDefault();
                setDeferredPrompt(e as BeforeInstallPromptEvent);
            }
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) {
            console.log('Deferred prompt is not available.');
            return;
        }

        await deferredPrompt.prompt();

        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            console.log('User accepted the install prompt.');
            setDeferredPrompt(null);
        } else {
            console.log('User dismissed the install prompt.');
        }
    };

    return (
        <button
            type="button"
            onClick={handleInstall}
            aria-label={label}
            className={className}
            disabled={!deferredPrompt}
        >
            <BiSave/>
            {label}
        </button>
    );
}
