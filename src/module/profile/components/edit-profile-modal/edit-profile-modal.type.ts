import { PropsWithChildren } from 'react';

export type EditProfileModalProps = PropsWithChildren & {
    onClose: React.Dispatch<React.SetStateAction<boolean>>
    isOpen: boolean
};
