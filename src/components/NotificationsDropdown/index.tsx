import { MouseEventHandler, useEffect, useState } from 'react';
import styles from './NotificationsDropdown.module.scss';
import notificationsData from '../../data/notifications.json'
import { useNavigate } from 'react-router-dom';

type notificationType = typeof notificationsData[0];

interface NotificationsDropdownProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NotificationsDropdown({ isOpen, setIsOpen }: NotificationsDropdownProps) {
    const [notifications, setNotifications] = useState<notificationType[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        setNotifications(notificationsData)
    },[])

    function onBackdropClick() {
        setIsOpen(false)
    }

    function convertDate(date:string){
        return new Date(date).toDateString()
    }

    const stopPropagation: MouseEventHandler<HTMLUListElement | HTMLDivElement> = e => {
        e.persist();
        e.stopPropagation();
    };


    return (
        <>
            {isOpen && <>
                <div className={styles.Notifications__overlay} onClick={onBackdropClick} />
                <ol className={styles.Notifications__list} onClick={stopPropagation}>
                    {notifications.length > 0 ?
                        notifications.map(notification => (
                            <li key={notification.id} className={styles['Notifications__list--notification']} onClick={() => navigate('/leilao/1/checkout')}>
                                <img src={notification.image} className={styles.notification__img} />
                                <div className={styles.notification__data}>
                                    <span className={styles.notification__game}>{notification.name}</span>
                                    <span className={styles.notification__text}>{notification.text}</span>
                                    <span className={styles.notification__dtime}>{convertDate(notification.notificationDateTime)}</span>
                                </div>
                            </li>
                        ))
                        : (
                            <li className={styles['Notifications__list--noneNotification']}><span>Nenhuma Notificação no momento</span></li>
                        )}
                </ol>
            </>}
        </>
    )
}