import React, { useRef, useEffect } from 'react';
import './Dialog.module.css';

type Props = {
    isOpen: boolean;
    children: React.ReactNode | React.ReactNodeArray;
};

export const Dialog: React.FC<Props> = ({
    isOpen,
    children,
}): React.ReactElement => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect((): void => {
        const dialogElement = dialogRef.current;
        if (!dialogElement) {
            return;
        }
        if (isOpen) {
            if (dialogElement.hasAttribute('open')) {
                return;
            }
            dialogElement.showModal();
        } else {
            if (!dialogElement.hasAttribute('open')) {
                return;
            }
            dialogElement.close();
        }
    }, [isOpen]);
    return (
        <dialog className='dialog'} ref={dialogRef}>
            <div className='content'>{children}</div>
        </dialog>
    );
};
