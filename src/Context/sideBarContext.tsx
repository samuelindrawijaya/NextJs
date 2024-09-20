// src/context/SidebarContext.tsx
import React, { useState, createContext, ReactNode, useContext } from 'react';

// Define the type for the context value
interface SidebarContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleClose: () => void;
  handleOpen: () => void;
}

export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

const SidebarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Sidebar state
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, handleClose, handleOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export default SidebarProvider;
