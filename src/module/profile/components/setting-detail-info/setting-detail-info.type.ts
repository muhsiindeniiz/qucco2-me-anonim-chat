import { PropsWithChildren } from 'react';

export type ChangeAccountInfoProps = PropsWithChildren & {};

export enum ACCOUNT_SETTING_TYPE {
    notification = 'NOTIFICATION',
    username = 'USERNAME',
    password = 'PASSWORD',
    email = 'EMAIL',
    block = 'BLOCK',
}

interface StackScreenProps {
    key: string;
    name: string;
    params: {
        title: string;
        type: ACCOUNT_SETTING_TYPE;
    };
}

export type RootStackParamList = StackScreenProps;
