import React from "react"

export const Table: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="table-wrapper">
      <table>{children}</table>
    </div>
  )
}
