import React, { useEffect } from 'react';
import PropTypes from 'prop-types';



const Modal= ({onClose,children})=> {
 

  useEffect(()=>{
    window.addEventListener('mousedown', handleKeyDown);
    return () =>{
      window.removeEventListener('mousedown', handleKeyDown);
    }
  },[])

  const handleKeyDown = event => {
    if (event.currentTarget.button === 0) {
      this.props.onClose();
    }
  };



  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

    return (
      <div className="Modal">
       <div className="Overlay"  onClick={handleBackdropClick}>
        {children}
       </div>
      </div>
    );
  }
Modal.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };

export default Modal;