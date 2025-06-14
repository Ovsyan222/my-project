import React, {useState, useCallback, useEffect} from "react";
import './ModalWindow.css';
import Resize from "./Resize";

const ModalWindow = ({show, onClose, children}) => {
    const isPortrait = Resize();
    const [isVisible, setIsVisible] = useState(false);

    const handleKeyDown = useCallback((event) => {
        if (event.key === 'Escape') {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        if (show) {
            setIsVisible(true);
            document.addEventListener('keydown', handleKeyDown);
        } else {
            const timer = setTimeout(() => setIsVisible(false), 880);
            document.removeEventListener('keydown', handleKeyDown);
            return () => clearTimeout(timer);
        }
    }, [show, handleKeyDown]);

    useEffect(() => {
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <div className={`modal-backdrop ${show ? 'show' : ''}`} style={{display: isVisible}} onClick={onClose}>
            <div style={{scale: isPortrait ? '1' : '0.5'}}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <button onClick={onClose} className="modal-close-button" aria-label="Close modal"></button>
                    {children}
                    <div style={{display: "flex", scale: isPortrait ? '1' : '1.12',
                                                marginLeft: isPortrait ? '' : '9vw'}}>
                        <a href="" target="_blank" className="social-button">
                        <a className="social telegram"/>Telegram</a>
                        <a href="" target="_blank" className="social-button">
                        <a className="social instagram"/>Instagram</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalWindow;