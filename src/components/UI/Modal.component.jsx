import React from 'react'
import ReactModal from 'react-modal'

// TODO: add footer
const Modal = ({ handleClose, isOpen, children, title, extra, footer, maxWidth = '500px', width }) => {
    return (
        <ReactModal
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                },
                content: {
                    ...(width && { width }),
                    maxWidth,
                    height: 'min-content',
                    maxHeight: '600px',
                    left: '50%',
                    top: '80px',
                    transform: 'translateX(-50%)',
                    padding: '0px',
                    border: 'none'
                }
            }}
            closeTimeoutMS={250}
            ariaHideApp={false}
            onRequestClose={handleClose}
            shouldCloseOnEsc
            shouldCloseOnOverlayClick
            isOpen={isOpen}>
            {/* Header */}
            <div className="p-4 bg-secondary">
                <div className="flex justify-between">
                    <div>{title}</div>
                    <div>
                        <div>{extra}</div>
                        <i aria-hidden className="fas fa-times cursor-pointer" onClick={handleClose}></i>
                    </div>
                </div>
            </div>
            {/* Main content */}
            <div className="p-4 overflow-auto">
                {children}
            </div>
            {
                footer &&
                <div className="border-t border-gray-200 p-4 flex justify-end">
                    {footer.map((item, index) => <React.Fragment key={`footer-item-${index}`}>{item}</React.Fragment>)}
                </div>
            }
        </ReactModal>
    )
}

export default Modal