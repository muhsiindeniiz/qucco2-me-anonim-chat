import { PropsWithChildren } from 'react';

export type NotificationSettingProps = PropsWithChildren & {};

export interface NotificationType {
    audio: boolean;
    information: boolean;
    photo: boolean;
    story: boolean;
    text: boolean;
    video: boolean;
}