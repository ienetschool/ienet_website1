import { useState } from "react";

interface ContactModalOptions {
  subject?: string;
  message?: string;
}

export function useContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOptions, setModalOptions] = useState<ContactModalOptions>({});

  const openModal = (options: ContactModalOptions = {}) => {
    setModalOptions(options);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalOptions({});
  };

  return {
    isOpen,
    openModal,
    closeModal,
    modalOptions,
  };
}