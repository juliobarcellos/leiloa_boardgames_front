import { MouseEventHandler } from "react";
import ReactDOM from "react-dom";
import styles from 'Modals.module.scss';

interface LoadingModalProps {
    title: string,
    message: string,
    link?: string,
    isModalVisible: boolean
}

const stopPropagation: MouseEventHandler<HTMLDivElement> = e => {
    e.persist();
    e.stopPropagation();
};

export default function LoadingModal({ title, message, link, isModalVisible }: LoadingModalProps) {

    if (!isModalVisible) {
        return null
    }
    return ReactDOM.createPortal(
        <div className={styles.Overlay}>
            <div onClick={stopPropagation}>

                <div className={styles.DesktopModalContainer}>
                    <h3 className={styles.Header}>{title}</h3>
                    <p className={styles.Message}>{message}</p>
                    {link && <p>link</p>}
                </div>

            </div>
        </div>,
        document.getElementById('modal-root')!
    );
}