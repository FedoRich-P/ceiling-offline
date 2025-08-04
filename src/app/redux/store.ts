import { configureStore } from '@reduxjs/toolkit';
import roomConstructorReducer, {roomConstructorSlice} from '@/entities/Room/model/roomConstructorSlice';
import toolsReducer, {toolsSlice} from '@/entities/Room/model/toolsSlice';
import markupReducer, {markupSlice} from '@/entities/DuplicateEditor/model/markupSlice';

export const store = configureStore({
    reducer: {
        [roomConstructorSlice.name]: roomConstructorReducer,
        [toolsSlice.name]: toolsReducer,
        [markupSlice.name]: markupReducer,
    },
});