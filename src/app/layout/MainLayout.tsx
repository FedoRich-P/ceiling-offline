import {Outlet} from 'react-router';
import styles from './MainLayout.module.scss';
import RoomStats from "@/features/RoomStats/ui/RoomStats.tsx";
import DimensionsTable from "@/features/DimensionsTable/ui/DimensionsTable.tsx";
import {Header} from "@/widgets/Header/ui/Header.tsx";

export function MainLayout() {
    return (
        <div className={styles.wrapper}>
            <Header/>
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