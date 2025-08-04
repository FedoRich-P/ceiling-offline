import styles from './EditorPage.module.scss';
import {Suspense} from "react";
import {ControlsPanelRightLazy} from "@/widgets/ControlsPanelRight/ui/ControlsPanelRightLazy";
import {DuplicateEditorLazy} from "@/entities/DuplicateEditor/ui/DuplicateEditorLazy";

export function EditorPage() {
    return <>
            <Suspense fallback={<div>Loading Canvas...</div>}>
                <ControlsPanelRightLazy className={styles.panel} />
            </Suspense>
            <Suspense fallback={<div>Loading Canvas...</div>}>
                <DuplicateEditorLazy  className={styles.canvas} />
            </Suspense>
        </>
}