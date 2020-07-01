import React from 'react'

const Button = ({ onClick, children, style }) => {
  return (
    <button
      style={{
        fontFamily: 'inherit',
        padding: 10,
        borderRadius: 5,
        border: '2px solid #001f3f',
        color: '#001f3f',
        background: 'transparent',
        textTransform: 'uppercase',
        fontWeight: 600,
        cursor: 'pointer',
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
