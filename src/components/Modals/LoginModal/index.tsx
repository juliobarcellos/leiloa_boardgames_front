import BaseModal from '../index';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    return (
        <BaseModal
        title={'Login'}
        isOpen={isOpen}
        onClose={onClose} 
        >
            <form>
                <label htmlFor='username'>Usuário: </label>
                <input id='username' ></input>
                <label htmlFor='password'>Senha: </label>
                <input id='password' type='password'></input>
            </form>
        </BaseModal>
    )
}
