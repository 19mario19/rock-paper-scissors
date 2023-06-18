import React from 'react';

function Modal({message}) {
    return (
       <div className="modal">
        <h1>{message}</h1>
        <p>Press anywhere to continue...</p>
       </div>
    );
}

export default Modal;