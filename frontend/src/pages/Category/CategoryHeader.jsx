function CategoryHeader({ allCategoryDetails, setToggleOption, toggleOption, label, sortProducts }) {
    return (
        <>
            <div className="container-header">
                <div className="header-result">
                    <p>Showing all <span>{allCategoryDetails.all_result}</span> results</p>
                </div>
                <div className="header-sort">
                    <p>Sort By: </p>
                    <div className="select" onClick={() => { setToggleOption(!toggleOption ? true : false) }}>{label} ▾</div>
                    {
                        toggleOption &&
                        <div className="options">
                            <p onClick={() => sortProducts('latest')}>Latest</p>
                            <p onClick={() => sortProducts('low_to_high')}>Price Low to High</p>
                            <p onClick={() => sortProducts('high_to_low')}>Price High to Low</p>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default CategoryHeader;