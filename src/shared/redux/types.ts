import {store} from "@/app/redux/store.ts";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;