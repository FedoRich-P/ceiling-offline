import { useEffect, useState } from "react";
import { BiSave } from "react-icons/bi";

type Props = {
    label?: string;
    className?: string;
};

export function SaveButton({ label = 'Скачать', className }: Props) {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

    useEffect(() => {
        // Добавляем обработчик для события 'beforeinstallprompt'
        const handler = (e: any) => {
            // Предотвращаем стандартное поведение браузера
            e.preventDefault();
            // Сохраняем событие в состоянии
            setDeferredPrompt(e);
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

        // Показываем диалог установки
        deferredPrompt.prompt();

        // Ждем ответа пользователя
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            console.log('User accepted the install prompt.');
            setDeferredPrompt(null);
        } else {
            console.log('User dismissed the install prompt.');
        }
    };

    // Кнопка будет активна только если `deferredPrompt` не null (событие сработало)
    return (
        <button
            type="button"
            onClick={handleInstall}
            aria-label={label}
            className={className}
            disabled={!deferredPrompt}
        >
            <BiSave />
            {label}
        </button>
    );
}