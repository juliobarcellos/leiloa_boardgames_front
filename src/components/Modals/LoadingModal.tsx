import { MouseEventHandler } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import styles from './Modals.module.scss';

interface LoadingModalProps {
    title: string,
    message: string,
    link?: string,
    linkTitle?: string,
    customFunctionTitle?: string,
    customFunction?: () => void,
    isModalVisible: boolean
}

const stopPropagation: MouseEventHandler<HTMLDivElement> = e => {
    e.persist();
    e.stopPropagation();
};

export default function LoadingModal({ title, message, link, linkTitle, customFunctionTitle, customFunction, isModalVisible }: LoadingModalProps) {

    if (!isModalVisible) {
        return null
    }
    return ReactDOM.createPortal(
        <div className={styles.Overlay}>
            <div onClick={stopPropagation}>

                <div className={styles.DesktopModalContainer}>
                    <h3 className={styles.Header}>{title}</h3>
                    <p className={styles.Message}>{message}</p>
                    {link && <Link  className={styles.DesktopModalContainer__link} to={link}>{linkTitle}</Link>}
                    {customFunction && <span onClick={customFunction} className={styles.DesktopModalContainer__function}>{customFunctionTitle}</span>}
                </div>

            </div>
        </div>,
        document.getElementById('modal-root')!
    );
}