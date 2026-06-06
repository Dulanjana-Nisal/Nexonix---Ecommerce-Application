
function CategoryFilter({clearFilters,filterTags,brandName,productBrands,brandsFilter,ratingsFilter,ratingRange,priceValues,setPriceValues,submitPriceValue,filterByAvailability,availability}) {
    return (
        <>
            <div class="container-filter">
                <div class="filter-head">
                    <div class="title">
                        <h1>Filters</h1>
                        <button onClick={() => clearFilters()}>Clear All</button>
                    </div>
                    <div class="tags">
                        {
                            filterTags.brand &&
                            <p>{filterTags.brand}</p>
                        }
                        {
                            filterTags.rr &&
                            <p>{filterTags.rr} ★</p>
                        }
                        {
                            filterTags.pr &&
                            <p>{filterTags.pr}</p>
                        }
                        {
                            filterTags.availability &&
                            <p>{filterTags.availability}</p>
                        }
                    </div>
                </div>
                <div class="filter-methods">
                    <div class="method-box brand">
                        <h3>Brands</h3>
                        <div class="brand-box">
                            <input type="radio" id='' name='brand' checked={!brandName || brandName == ' ' || productBrands.length == 0} onClick={() => brandsFilter(event)} />
                            <label for=''>All</label>
                        </div>
                        {
                            productBrands.map((items) => {
                                return (
                                    <div class="brand-box" key={items}>
                                        <input type="radio" id={items} name='brand' checked={items === brandName} onClick={() => brandsFilter(event)} />
                                        <label for={items}>{items}</label>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div class="method-box ratings">
                        <h3>Ratings</h3>
                        <div class="rating-box">
                            <input type="radio" name="ratings" checked={filterTags.rr === '1-5' || !filterTags.rr} id='1-5' onClick={() => ratingsFilter(event)} />
                            <label for="1-5">All</label>
                        </div>
                        <div class="rating-box">
                            <input type="radio" name="ratings" id='4-5' onClick={() => ratingsFilter(event)} defaultChecked={ratingRange === '1-5'} />
                            <label for="4-5">5 - 4 Stars</label>
                        </div>
                        <div class="rating-box">
                            <input type="radio" name="ratings" id='3-4' onClick={() => ratingsFilter(event)} defaultChecked={ratingRange === '4-5'} />
                            <label for="3-4">4 - 3 Stars</label>
                        </div>
                        <div class="rating-box">
                            <input type="radio" name="ratings" id='2-3' onClick={() => ratingsFilter(event)} defaultChecked={ratingRange === '2-3'} />
                            <label for="2-3">3 - 2 Stars</label>
                        </div>
                        <div class="rating-box">
                            <input type="radio" name="ratings" id='1-2' onClick={() => ratingsFilter(event)} defaultChecked={ratingRange === '1-2'} />
                            <label for="1-2">2 - 1 Stars</label>
                        </div>
                        <div class="rating-box">
                            <input type="radio" name="ratings" id='0-1' onClick={() => ratingsFilter(event)} defaultChecked={ratingRange === '0-1'} />
                            <label for="0-1">1 Star</label>
                        </div>
                    </div>
                    <div class="method-box price-range">
                        <div class="range-head">
                            <h3>Price </h3>
                        </div>
                        <div class="range-select">
                            <div class="min-price">
                                <label>Min Price $</label>
                                <input type="number" placeholder="0" value={priceValues.minPrice} onChange={(event) => { setPriceValues({ ...priceValues, minPrice: Number(event.target.value) }) }} />
                            </div>
                            <div class="max-price">
                                <label>Max Price $</label>
                                <input type="number" placeholder="100 000" value={priceValues.maxPrice} onChange={(event) => { setPriceValues({ ...priceValues, maxPrice: Number(event.target.value) }) }} />
                            </div>
                        </div>
                        <div class="range-values">
                            <p>Price <span>${priceValues.minPrice}</span> - <span>${priceValues.maxPrice}</span></p>
                            <button onClick={() => submitPriceValue()}>FILTER</button>
                        </div>
                    </div>
                    <div class="method-box availability">
                        <h3>Availability</h3>
                        <div class="availability-box">
                            <input type="radio" id="all" name="availability" checked={!availability || availability === 'all'} onClick={() => filterByAvailability(event)} />
                            <label for='all'>All</label>
                        </div>
                        <div class="availability-box">
                            <input type="radio" id="true" value="in" checked={availability === 'true'} name="availability" onClick={() => filterByAvailability(event)} />
                            <label for="true">In Stock</label>
                        </div>
                        <div class="availability-box">
                            <input type="radio" id="false" value="out" checked={availability === 'false'} name="availability" onClick={() => filterByAvailability(event)} />
                            <label for="false">Out Stock</label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CategoryFilter;