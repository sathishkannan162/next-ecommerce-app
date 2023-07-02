import React from 'react';

interface ContainerProps {
    children: React.ReactNode;
}

const container = ({ children }: ContainerProps) => {
  return (
      <div className="max-w-['500px']">
          {children}
    </div>
  )
}

export default container