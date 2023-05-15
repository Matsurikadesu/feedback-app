import './header.scss';

const Header = () => {
    const onAddFeedback = () => {

    }

    return (
        <div className="header">
            <div className="header__suggestions">
                <img className="header__suggestions-icon" src="bulb.svg" alt="bulb"/>
                <h3 className="header__suggestions-title">6 Suggestions</h3>
            </div>
            <label className="header__label" htmlFor="select">Sort by :</label>
            <select className="header__select" name="select" id="select">
                <option value="">Most Upvotes</option>
                <option value=""></option>
                <option value=""></option>
            </select>
            <button className="header__btn" onClick={onAddFeedback}>
                + Add Feedback
            </button>
        </div>
    )
}

export default Header;