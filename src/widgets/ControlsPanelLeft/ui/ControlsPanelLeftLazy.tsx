import {lazy} from "react";

export const ControlsPanelLeftLazy = lazy(() =>
    import('./ControlsPanelLeft.tsx').then(module => ({ default: module.ControlsPanelLeft }))
);