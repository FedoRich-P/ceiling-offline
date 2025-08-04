import styles from './BasePage.module.scss';
import {CanvasEditorLazy} from "@/entities/CanvasEditor/ui/CanvasEditorLazy";
import {Suspense} from "react";
import {ControlsPanelLeftLazy} from "@/widgets/ControlsPanelLeft/ui/ControlsPanelLeftLazy";

export function BasePage() {
    return <>
            <Suspense fallback={<div>Loading Canvas...</div>}>
                <ControlsPanelLeftLazy className={styles.panel} />
            </Suspense>
            <Suspense fallback={<div>Loading Canvas...</div>}>
                <CanvasEditorLazy  className={styles.canvas} />
            </Suspense>
        </>
}