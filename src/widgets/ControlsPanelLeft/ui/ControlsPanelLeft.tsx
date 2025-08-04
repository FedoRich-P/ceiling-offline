import {useEffect, useState} from 'react';
import clsx from 'clsx';
import {useAppDispatch, useAppSelector} from '@/shared/redux/hooks';
import styles from './ControlsPanelLeft.module.scss';
import {FaBroom, FaEdit, FaTrash, FaUndo} from "react-icons/fa";
import {
    addDiagonal, clearPoints, deletePoint,
    pointsSelector, renamePoint,
    selectedPointIndexSelector,
    undo
} from "@/entities/Room/model/roomConstructorSlice";

interface ControlsPanelLeftProps {
    className?: string;
}

export function ControlsPanelLeft({className}: ControlsPanelLeftProps) {
    const dispatch = useAppDispatch();
    const selectedIndex = useAppSelector(selectedPointIndexSelector);
    const points = useAppSelector(pointsSelector);

    const [newName, setNewName] = useState('');
    const [sel, setSel] = useState<number[]>([]);

    useEffect(() => {
        if (sel.length === 2) {
            dispatch(addDiagonal({from: sel[0], to: sel[1]}));
            setSel([]);
        }
    }, [sel, dispatch]);

    const handleUndo = () => dispatch(undo());

    const handleDelete = () => {
        if (selectedIndex !== null) {
            dispatch(deletePoint(selectedIndex));
        }
    };

    const handleRename = () => {
        if (selectedIndex !== null && newName.trim()) {
            dispatch(renamePoint({index: selectedIndex, name: newName.trim()}));
            setNewName('');
        }
    };

    const handleDiagonalSelect = (index: number) => {
        setSel((prev) => (prev.includes(index) ? prev : [...prev, index]));
    };

    return (
        <aside className={clsx(styles.wrapper, className)} role="complementary" aria-label="Панель инструментов">
            <button onClick={handleUndo} className={clsx(styles.button, styles.undo)}>
                <FaUndo className={styles.icon}/> Назад
            </button>

            <button
                onClick={handleDelete}
                className={clsx(styles.button, styles.delete)}
                disabled={selectedIndex === null}
            >
                <FaTrash className={styles.icon}/> Удалить точку
            </button>

            <div className={styles.renameGroup}>
                <button
                    onClick={handleRename}
                    className={clsx(styles.button, styles.rename)}
                    disabled={selectedIndex === null || !newName.trim()}
                >
                    <FaEdit className={styles.icon}/> Переименовать
                </button>
                <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Имя точки"
                    className="border px-2 py-1 rounded"
                />
            </div>

            <button onClick={() => dispatch(clearPoints())} className={clsx(styles.button, styles.clear)}>
                <FaBroom className={styles.icon}/> Очистить всё
            </button>

            <div className={styles.diagonalSection}>
                <h3>Добавить диагональ:</h3>
                <ul className={styles.diagonalButtons}>
                    {points.map((p, i) => (
                        <li key={i}>
                            <button
                                onClick={() => handleDiagonalSelect(i)}
                                className={clsx(
                                    styles.pointButton,
                                    sel.includes(i) && styles.pointButtonActive
                                )}
                            >
                                {p.name || String.fromCharCode(65 + i)}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}
