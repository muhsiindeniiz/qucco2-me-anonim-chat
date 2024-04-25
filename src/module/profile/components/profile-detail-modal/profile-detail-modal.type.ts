import { PropsWithChildren } from 'react';

export type ProfileDetailModalProps = PropsWithChildren & {
    onClose: React.Dispatch<React.SetStateAction<boolean>>
    isOpen: boolean
};
