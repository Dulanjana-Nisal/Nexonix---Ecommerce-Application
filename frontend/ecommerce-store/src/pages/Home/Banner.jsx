import banner_image from '../../assets/laptops.png'

function Banner() {
    return (
        <>
            <div class="banner-container">
                <div class="banner" id='#slide1' style={{backgroundImage: `url(${banner_image})`}}>
                    <div class="banner-info">
                        <h1>Alienware Aurora R15 Gaming Desktop</h1>
                        <p>The Alienware Aurora R15 is a high-performance gaming desktop with an Intel Core i9 processor, NVIDIA
                            RTX 4090 graphics, and tool-less chassis for easy upgrades.</p>
                        <button>Shop Now</button>
                    </div>
                </div>
                <div class="banner" id='#slide2' style={{backgroundImage: `url(${banner_image})`}}>
                    <div class="banner-info">
                        <h1>Alienware Aurora R15 Gaming Desktop</h1>
                        <p>The Alienware Aurora R15 is a high-performance gaming desktop with an Intel Core i9 processor, NVIDIA
                            RTX 4090 graphics, and tool-less chassis for easy upgrades.</p>
                        <button>Shop Now</button>
                    </div>
                </div>
                <div class="banner" id='#slide3' style={{backgroundImage: `url(${banner_image})`}}>
                    <div class="banner-info">
                        <h1>Alienware Aurora R15 Gaming Desktop</h1>
                        <p>The Alienware Aurora R15 is a high-performance gaming desktop with an Intel Core i9 processor, NVIDIA
                            RTX 4090 graphics, and tool-less chassis for easy upgrades.</p>
                        <button>Shop Now</button>
                    </div>
                </div>
                <div class="banner-nav">
                    <p></p>
                    <p></p>
                    <p></p>
                </div>
            </div>
        </>
    )
}

export default Banner;