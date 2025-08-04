import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {Provider} from "react-redux";
import {store} from "./redux/store.ts";
import {registerSW} from 'virtual:pwa-register';
import {RouterProvider} from "react-router";
import {router} from "@/app/routes/router.tsx";

const updateSW = registerSW({
    onNeedRefresh() {
        if (confirm('New update available. Refresh?')) {
            updateSW(true);
        }
    },
    onOfflineReady() {
        console.log('App ready for offline use');
    }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
          <RouterProvider router={router}/>
      </Provider>
  </StrictMode>,
)
