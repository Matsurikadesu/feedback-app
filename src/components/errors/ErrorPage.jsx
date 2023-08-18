import './error-page.scss';

const ErrorPage = () => {
    return(
        <>
            <h1 className='error-heading'>Page Not Found</h1>
            <img className='error-image' src="/errors/dead.webp" alt="Page not found"/>
        </>
    )
} 

export default ErrorPage;