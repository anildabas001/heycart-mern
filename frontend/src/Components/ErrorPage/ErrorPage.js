import React from 'react';

const ErrorPage = () => {
    return (
        <div style= {{height: '55vh',position: 'relative', width: '100%', color: 'rgb(206, 17, 38)', fontSize: '1.2rem', fontWeight: 400, padding: '10px',textAlign: 'center', marginTop:'15%'}}>
            Something Went wrong.
            Please refresh the page and try again.
        </div>
    );
}

export default ErrorPage;