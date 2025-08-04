import {useAppSelector} from "@/shared/redux/hooks.ts";
import type {Point} from "@/shared/types/point.ts";
import {scalePoints} from "@/shared/utils/scalePoints.ts";
import {calculateArea, calculatePerimeter, countCorners} from "@/shared/utils/geometry.ts";
import styles from './RoomStats.module.scss'
import {pointsSelector} from "@/entities/Room/model/roomConstructorSlice.ts";

const RoomStats = () => {
    const points: Point[] = useAppSelector(pointsSelector);

    const scaledPoints = scalePoints(points);
    const area = calculateArea(scaledPoints).toFixed(2);
    const perimeter = calculatePerimeter(scaledPoints).toFixed(2);
    const corners = countCorners(points);

    return (
        <article className={styles.wrapper}>
            <h2 className={styles.title}>Параметры помещения</h2>
            <p className={styles.paragraph}>Площадь: <b>{area}</b> м²</p>
            <p className={styles.paragraph}>Периметр: <b>{perimeter}</b> м</p>
            <p className={styles.paragraph}>Углов: <b>{corners}</b></p>
        </article>
    );
};

export default RoomStats;
