import styles from "./Header.module.scss";
import {NavLink} from "react-router";
import clsx from "clsx";
import {PATHS} from "@/shared/pathsRoutes/paths.ts";
import {FaRegEdit, FaRegFileAlt, FaRegSave} from "react-icons/fa";
import {SaveButton} from "@/shared/components/SaveButton/SaveButton.tsx";

export function Header() {
    return (
        <header className={styles.header}>
            <nav className={styles.nav} aria-label="Навигация">
                <NavLink
                    className={({ isActive }) =>
                        clsx(styles.link, { [styles.active]: isActive })
                    }
                    to={PATHS.BASE}
                >
                    <FaRegFileAlt className="text-xl" />
                    Базовый план
                </NavLink>
                <NavLink
                    className={({ isActive }) =>
                        clsx(styles.link, { [styles.active]: isActive })
                    }
                    to={PATHS.EDITOR}
                >
                    <FaRegEdit className="text-xl" />
                    План с допами
                </NavLink>
                <button
                    type="button"
                    className={styles.link}
                >
                    <FaRegSave className="text-xl"/>
                    Сохранить заказ
                </button>
            </nav>
            <SaveButton className={clsx(styles.link, styles.saveButton)} />
        </header>
    );
}