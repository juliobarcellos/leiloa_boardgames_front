import NotificationsDropdown from './';

interface NotificationsWrapperProps {
  isNotificationsVisible: boolean;
  onBackdropClick: () => void;
}

const NotificationsWrapper: React.FC<NotificationsWrapperProps> = ({ isNotificationsVisible, onBackdropClick }) => {

  if (!isNotificationsVisible) {
    return null
  }

  return (<NotificationsDropdown isOpen={isNotificationsVisible} onBackdropClick={onBackdropClick} />
);
}

export default NotificationsWrapper