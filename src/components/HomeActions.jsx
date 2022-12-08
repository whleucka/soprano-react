const HomeActions = () => {
    const handleClick = () => {
        alert("Feature missing. Check back later");
    };

    return (
        <div className="actions" id="home-actions" onClick={handleClick}>
            <button className="btn btn-sm btn-dark">Sign In</button>
        </div>
    );
};

export default HomeActions;
