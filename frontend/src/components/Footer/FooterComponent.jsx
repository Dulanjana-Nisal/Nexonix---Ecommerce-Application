import FooterBottom from './FooterBottom';
import './FooterComponent.css'
import FooterTop from './FooterTop';

function FooterCompoennt() {
    return (
        <>
            <div className="footer">
                <div className="footer-container">
                    {/* Footer Top */}
                    <FooterTop />

                    {/* Footer Bottom */}
                    <FooterBottom />
                </div>
            </div>
        </>
    )
}

export default FooterCompoennt;