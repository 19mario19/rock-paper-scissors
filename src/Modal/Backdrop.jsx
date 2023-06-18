import React, { useState } from "react"

function Backdrop({ style, toggle, children }) {
  return (
    <div className={`backdrop ${style}`} onClick={toggle}>
      {children}
    </div>
  )
}

export default Backdrop
