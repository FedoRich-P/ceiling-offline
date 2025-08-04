import {lazy} from "react";

export const ControlsPanelRightLazy = lazy(() =>
    import('./ControlsPanelRight.tsx').then(module => ({ default: module.ControlsPanelRight }))
);