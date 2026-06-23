import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const slides = [
    {  
        bannerID: 1,
        header: <h1>HP Omen 45L <span>Gaming Desktop</span></h1>,
        discription: "The HP Omen 45L Gaming Desktop comes with AMD Ryzen 9, NVIDIA RTX 4080, 64GB DDR5 RAM, 2TB SSD, and a liquid-cooled Cryo Chamber design for extreme thermal performance.",
        link: '/details/69dbab0ed4d8c035adc76285'

    },
    {
        bannerID: 2,
        header: <h1>Dell XPS 15 <span>Laptop</span></h1>,
        discription: "The Dell XPS 15 combines stunning 4K OLED display technology with Intel Core i7 performance and long-lasting battery life in a premium slim and lightweight chassis.",
        link: '/details/69dbab0ed4d8c035adc76252'

    },
    {
        bannerID: 3,
        header: <h1>Razer Wolverine V3 <span>Pro Controller</span></h1>,
        discription: "The Razer Wolverine V3 Pro is a wireless pro gaming controller for PC and Xbox with HyperSpeed wireless, micro-switches, 6 remappable buttons, and hair-trigger locks.",
        link: '/details/69dbab0ed4d8c035adc762a6'

    },
    {
        bannerID: 4,
        header: <h1>Microsoft Office <span>365 Personal</span></h1>,
        discription: "Microsoft Office 365 Personal includes Word, Excel, PowerPoint, Outlook, and 1TB of OneDrive cloud storage, with continuous updates for one user across all devices.",
        link: '/details/69dbab0ed4d8c035adc7626f'

    }
]

function Banner() {

    const [scale,setScale] = useState(0)
    useEffect(()=>{
        const intervel = setInterval(()=>{
            setScale((prev) => (prev + 1) % slides.length)
        }, 5500)
        return () => clearInterval(intervel)
    }, [])
    
    const navigateBanner = (value) =>{
        setScale(value - 1)
    }


    return (
        <>
            <div class="banner-container">
                {
                    slides.map((items)=>{
                        return(
                            <div class={`banner banner${items.bannerID}`} key={items.bannerID} style={{transform: `translateX(-${scale * 100}%)`}}>
                                <div class="banner-info">
                                    {items.header}
                                    <p>{items.discription}</p>
                                    <div class="buttons">
                                        <Link class="no-style-link" to={items.link}><button class='shop-btn'>
                                            Shop Now
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M5 12h14" /><path d="M13 6l6 6-6 6" />
                                            </svg>
                                        </button></Link>
                                        <Link class="no-style-link" to={items.link}><button class='details-btn'>
                                            Lern More
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M5 12h14" /><path d="M13 6l6 6-6 6" />
                                            </svg>
                                        </button></Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                <div class="banner-nav">
                    {
                        slides.map((items)=>{
                            return(
                                <p key={items.bannerID} id={scale === items.bannerID-1 && 'select'} onClick={() => navigateBanner(items.bannerID)}></p>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Banner;