import { PropsWithChildren } from 'react';
import { Tag } from '../../../../components/tag-input';

export type EditTagsModalProps = PropsWithChildren & {
    onClose: React.Dispatch<React.SetStateAction<boolean>>
    isOpen: boolean
    tags: Tag[]
};
