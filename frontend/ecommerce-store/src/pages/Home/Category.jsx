import computer_category from '../../assets/computer-category-section.webp'
import laptops_category from '../../assets/laptops-category-section.png'
import component_category from '../../assets/component-category-section.webp'
import gaming_category from '../../assets/gmaings-category-sections.png'
import sonftware_category from '../../assets/softwre-category-section.jpg'

function Category(){
    return(
        <>
            <div className="category-container">
                <div className="container-header">
                    <h1>Shop by best Category</h1>
                </div>
                <div className="container-footer">
                    <div className="category-card">
                        <div className="card-header">
                            <img src={computer_category} alt="" />
                        </div>
                        <div className="card-bottom">
                            <h3>Computers</h3>
                            <p>High performance desktops</p>
                        </div>
                    </div>
                    <div className="category-card">
                        <div className="card-header">
                            <img src={laptops_category} alt="" />
                        </div>
                        <div className="card-bottom">
                            <h3>Laptops</h3>
                            <p>Portable power for everyone</p>
                        </div>
                    </div>
                    <div className="category-card">
                        <div className="card-header">
                            <img src={component_category} alt="" />
                        </div>
                        <div className="card-bottom">
                            <h3>Components</h3>
                            <p>Build your dream setup</p>
                        </div>
                    </div>
                    <div className="category-card">
                        <div className="card-header">
                            <img src={gaming_category} alt="" />
                        </div>
                        <div className="card-bottom">
                            <h3>Gamings</h3>
                            <p>Level up your game</p>
                        </div>
                    </div>
                    <div className="category-card">
                        <div className="card-header">
                            <img src={sonftware_category} alt="" />
                        </div>
                        <div className="card-bottom">
                            <h3>Softwares</h3>
                            <p>Productivity & tools</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Category;