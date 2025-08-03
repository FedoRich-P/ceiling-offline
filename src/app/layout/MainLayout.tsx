import { NavLink, Outlet } from 'react-router';
import styles from './MainLayout.module.scss';
import RoomStats from "@/shared/components/RoomStats/ui/RoomStats.tsx";
import DimensionsTable from "@/entities/DimensionsTable/ui/DimensionsTable.tsx";
import { PATHS } from "@/app/routes/paths.ts";
import { SaveButton } from "@/shared/components/SaveButton/SaveButton";
import clsx from "clsx";

// Импортируем необходимые иконки из react-icons
import { FaRegFileAlt, FaRegEdit, FaRegSave } from 'react-icons/fa';

export function MainLayout() {
    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <nav className={styles.nav} aria-label="Навигация">
                    <NavLink
                        className={({ isActive }) =>
                            clsx(styles.link, { [styles.active]: isActive })
                        }
                        to={PATHS.BASE}
                    >
                        <FaRegFileAlt className="text-xl" /> {/* Иконка для "Базовый план" */}
                        Базовый план
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            clsx(styles.link, { [styles.active]: isActive })
                        }
                        to={PATHS.EDITOR}
                    >
                        <FaRegEdit className="text-xl" /> {/* Иконка для "План с допами" */}
                        План с допами
                    </NavLink>
                    <button
                        type="button"
                        className={styles.link} // Применяем стиль ссылки к кнопке
                    >
                        <FaRegSave className="text-xl" /> {/* Иконка для "Сохранить заказ" */}
                        Сохранить заказ
                    </button>
                </nav>
                <SaveButton className={clsx(styles.link, styles.saveButton)} />
            </header>

            <main className={styles.main} role="main">
                <Outlet />
            </main>

            <footer className={styles.footer} aria-label="Статистика и размеры">
                <RoomStats />
                <DimensionsTable className={'flex-1'} />
            </footer>
        </div>
    );
}