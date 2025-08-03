// import {useEffect, useState} from 'react'
// import clsx from "clsx";
// import styles from "@/shared/components/DeleteIconButton/DeleteIconButton.module.scss";
// import {FiSave} from "react-icons/fi";
//
// type Props = {
//     className?: string
// }
//
// export function InstallButton ({ className }: Props) {
//     const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
//
//     useEffect(() => {
//         const handler = (e: any) => {
//             e.preventDefault()
//             setDeferredPrompt(e)
//         }
//
//         window.addEventListener('beforeinstallprompt', handler)
//
//         return () => {
//             window.removeEventListener('beforeinstallprompt', handler)
//         }
//     }, [])
//
//     const handleInstall = async () => {
//         if (!deferredPrompt) return
//         deferredPrompt.prompt()
//         const { outcome } = await deferredPrompt.userChoice
//         if (outcome === 'accepted') {
//             setDeferredPrompt(null)
//         }
//     }
//
//     if (!deferredPrompt) return null
//
//     return (
//         <button
//             type="button"
//             onClick={handleInstall}
//             aria-label={'Сохранить'}
//             className={clsx(styles.button, className)}
//         >
//             <FiSave className={styles.icon}/>
//             <span className={styles.label}>{'Сохранить'}</span>
//         </button>
//     )
// }