import { PropsWithChildren } from 'react';

export type EmailPasswordStepProps = PropsWithChildren & {
    handleSetEmail: (email: string) => void;
    handleSetPassword: (password: string) => void;
};
