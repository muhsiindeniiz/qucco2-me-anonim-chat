import { PropsWithChildren } from 'react';

export type SettingPageProps = PropsWithChildren & {};

export interface SettingType {
    blockList: string[];
    help: string;
    lastSeen: boolean;
    notification: {
        audio: boolean;
        information: boolean;
        photo: boolean;
        story: boolean;
        text: boolean;
        video: boolean;
    };
    showShuffle: boolean;
}