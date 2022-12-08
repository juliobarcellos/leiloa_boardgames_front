import { MouseEventHandler, useEffect, useState } from 'react';
import styles from './NotificationsDropdown.module.scss';
import { useNavigate } from 'react-router-dom';
import notificationService from '../../services/notificationService';
import { NotificationType } from '../../types';

interface NotificationsDropdownProps {
    isOpen: boolean;
    onBackdropClick: () => void;
}

export default function NotificationsDropdown({ isOpen, onBackdropClick }: NotificationsDropdownProps) {
    const [notifications, setNotifications] = useState<NotificationType[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        notificationService.getAll().then((response) =>{
            setNotifications(response.data);
        })
    }, []);

    useEffect(() => {
        notificationService.getAll().then((response) =>{
            setNotifications(response.data);
        })
    }, [isOpen]);

    function convertDate(date: string) {
        return new Date(date).toLocaleString('pt-BR');
    };

    function handleClick(id: number, text: string) {
        if (text === "Você venceu o leilão! Prossiga para o pagamento."){
        navigate(`/leilao/${id}/checkout`)}
        else {
            navigate(`/leilao/${id}`)
        }
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
                        <li key={notification.id} className={styles['Notifications__list--notification']} onClick={() => handleClick(notification.id!, notification.text)}>
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