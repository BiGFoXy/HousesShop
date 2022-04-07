require("../../components/components.js")
import './index.scss'
import './assets/arrow.svg'
import './assets/index-bg.png'
import './assets/logo.png'
import './assets/log.png'
import './assets/vk-logo.svg'
import './assets/whatsapp-logo.svg'
import './assets/youtube-logo.svg'
import './assets/house_1.png'
import './assets/house_2.png'
import './assets/house_3.png'
import './assets/house_4.png'
import './assets/arrow_horizontal.svg'
import './assets/about-video.png'
import './assets/about-image.png'
import './assets/contact-image.png'
import './assets/review_1.png'
import './assets/review_2.png'
import './assets/scroll-left.svg'
import './assets/scroll-right.svg'
import Scrollbar from 'smooth-scrollbar';

let reviews = document.querySelector('.reviews__list');
let scrollLeft = document.querySelector('.scroll-left');
let scrollRight = document.querySelector('.scroll-right');

scroll = Scrollbar.init(reviews);

scrollLeft.onclick = function() {
    scroll.scrollTo(scroll.scrollLeft - 406, 0, 1000)
}

scrollRight.onclick = function() {
    scroll.scrollTo(scroll.scrollLeft + 406, 0, 1000)
}

