import React from 'react'



const Div = ({children}) => {
  return (
    <div className="main">
        <div className="container">
            {children}
        </div>
    </div>
  )
}

export default Div