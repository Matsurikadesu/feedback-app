import './error-page.scss';

const ErrorPage = () => {
    return(
        <>
            <h1 className='error-heading'>Page Not Found</h1>
            <img className='error-image' src="/dead.png" alt="Page not found"/>
        </>
    )
} 

export default ErrorPage;