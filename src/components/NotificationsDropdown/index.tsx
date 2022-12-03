import { MouseEventHandler, useEffect, useState } from 'react';
import styles from './NotificationsDropdown.module.scss';
import notificationsData from '../../data/notifications.json'
import { useNavigate } from 'react-router-dom';

type notificationType = typeof notificationsData[0];

interface NotificationsDropdownProps {
    isOpen: boolean;
    onBackdropClick: () => void;
}

export default function NotificationsDropdown({ onBackdropClick }: NotificationsDropdownProps) {
    const [notifications, setNotifications] = useState<notificationType[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        setNotifications(notificationsData);
    }, []);

    function convertDate(date: string) {
        return new Date(date).toDateString();
    };

    function handleClick() {
        navigate('/leilao/1/checkout');
        onBackdropClick();
    }

    const stopPropagation: MouseEventHandler<HTMLUListElement | HTMLDivElement> = e => {
        e.persist();
        e.stopPropagation();
    };

    return (
    <>
        <div className={styles.Notifications__overlay} onClick={onBackdropClick} />
            <ol className={styles.Notifications__list} onClick={stopPropagation}>
                {notifications.length > 0 ?
                    notifications.map(notification => (
                        <li key={notification.id} className={styles['Notifications__list--notification']} onClick={handleClick}>
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
    </>
    );
}