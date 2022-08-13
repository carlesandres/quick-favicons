import { ReactNode} from 'react';
import { Dialog } from '@headlessui/react'

interface ConfirmModalProps {
  isOpen: boolean;
  closeModal: () => void;
  title: string;
  description?: string;
  children: ReactNode;
}

const ConfirmModal = (props:ConfirmModalProps) => {
  const { isOpen, closeModal, title, description, 
    children} = props;

  const renderedDescription = description ?
    <Dialog.Description className="mb-4 text-gray-500">{description}</Dialog.Description> : null;

  return (
    <Dialog as="div" open={isOpen} onClose={closeModal}
      className="fixed z-20 h-screen inset-0 overflow-hidden bg-black/80">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900"
            >
              {title}
            </Dialog.Title>
            {renderedDescription}
            {children}
          </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ConfirmModal;

// <div className="mt-2">
//   <p className="text-sm text-gray-500">
//     Your payment has been successfully submitted. We’ve sent
//     you an email with all of the details of your order.
//   </p>
// </div>
//
