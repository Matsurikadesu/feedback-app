import './loading.scss';

const Loading = () => {
    
    return(
        <div className="loader">
            <svg viewBox="0 0 80 80" stroke='red'>
                <circle id="test" cx="40" cy="40" r="32"></circle>
            </svg>
        </div>
    )
}

export default Loading;