import React from 'react';

const Footer = ({ content, active }) => {
    if (!active) {
        return null;
    }

    return (
        <div style={{ background: 'purple', position: 'fixed', bottom: 0, width: '100vw', height: '30px', maxHeight: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {content}
        </div>
    );
};

export default Footer;
