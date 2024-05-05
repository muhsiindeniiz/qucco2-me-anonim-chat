import { PropsWithChildren } from 'react';
import { UserType } from '../../../../constants/types';

export type BioDetailModalProps = PropsWithChildren & {
    onClose: React.Dispatch<React.SetStateAction<boolean>>
    isOpen: boolean
    biography: string
};
