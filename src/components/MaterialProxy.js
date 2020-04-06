import React from 'react';

function Row({ children }) {
    return <div className="row">{children}</div>;
}

function Container({ children }) {
    return <div className="container">{children}</div>;
}

export { Row, Container };
