import { configureStore } from '@reduxjs/toolkit';
import roomConstructorReducer from './slices/roomConstructor';
import toolsReducer from './slices/tools';
import markupReducer from './slices/markup';

export const store = configureStore({
    reducer: {
        roomConstructor: roomConstructorReducer,
        tools: toolsReducer,
        markup: markupReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;