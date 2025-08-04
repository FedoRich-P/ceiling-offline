import Konva from "konva";
import {v4 as uuidv4} from "uuid";
import {useAppDispatch, useAppSelector} from "@/shared/redux/hooks.ts";
import {ICONS_TYPES} from "@/shared/constants/controlsIcons.tsx";
import type {MarkupIconType} from "@/shared/types/point.ts";
import {
    addMarkupIcon, addStroke,
    currentStrokeSelector, iconLabelsSelector,
    isDrawingSelector,
    markupIconsSelector, selectedIconIdSelector, setCurrentStroke, setIsDrawing, setSelectedIconId
} from "@/entities/DuplicateEditor/model/markupSlice.ts";
import {colorSelector, lineWidthSelector, modeSelector} from "@/entities/Room/model/toolsSlice.ts";

export const useCanvasHandlers = () => {
    const dispatch = useAppDispatch();
    const toolMode = useAppSelector(modeSelector);
    const toolColor = useAppSelector(colorSelector);
    const toolWidth = useAppSelector(lineWidthSelector);
    const isDrawing = useAppSelector(isDrawingSelector);
    const currentStroke = useAppSelector(currentStrokeSelector);
    const icons = useAppSelector(markupIconsSelector);
    const iconLabels = useAppSelector(iconLabelsSelector);
    const selectedIconId = useAppSelector(selectedIconIdSelector);

    const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
        const stage = e.target.getStage();
        const pos = stage?.getPointerPosition();

        if (e.target.name() === "icon-group") {
            dispatch(setSelectedIconId(e.target.id()));
            return;
        }

        if (toolMode.startsWith("add") && pos) {
            const iconType = ICONS_TYPES.find(i => i.mode === toolMode)?.type;
            if (iconType) {
                dispatch(addMarkupIcon({ type: iconType as MarkupIconType, x: pos.x, y: pos.y }));
            }
            return;
        }

        if ((toolMode === "pencil" || toolMode === "line") && pos) {
            dispatch(setIsDrawing(true));
            dispatch(setCurrentStroke([pos.x, pos.y]));
            dispatch(setSelectedIconId(null));
        } else {
            dispatch(setSelectedIconId(null));
        }
    };

    const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
        if (!isDrawing) return;
        const pos = e.target.getStage()?.getPointerPosition();
        if (pos) {
            dispatch(setCurrentStroke([...currentStroke, pos.x, pos.y]));
        }
    };

    const handleMouseUp = () => {
        if (!isDrawing) return;

        dispatch(setIsDrawing(false));

        let points = currentStroke;
        if (toolMode === 'line' && currentStroke.length >= 4) {
            points = [...currentStroke.slice(0, 2), ...currentStroke.slice(-2)];
        }

        dispatch(addStroke({
            id: uuidv4(),
            points,
            color: toolColor,
            width: toolWidth,
        }));

        dispatch(setCurrentStroke([]));
    };

    return {
        toolMode,
        toolColor,
        toolWidth,
        isDrawing,
        currentStroke,
        icons,
        iconLabels,
        selectedIconId,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
    };
};