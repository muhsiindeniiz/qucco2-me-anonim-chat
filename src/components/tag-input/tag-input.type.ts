import { PropsWithChildren } from 'react';

export type TagInputProps = PropsWithChildren & {};

export interface Tag {
    id: string;
    label: string;
}