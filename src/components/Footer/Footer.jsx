import React from 'react';
import styles from './Footer.module.css';

//Al darle click al icono de google maps, te va a llevar modal y ese modal debe mostrar el iframe (google maps siempre tiene q estar entre un iframe)
{
  /* <iframe
  className="mapa"
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1886.5555418056924!2d-57.019182085077766!3d-37.32366949064503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959b5dd0e82128d5%3A0xd9877fa09d587e9a!2sCaba%C3%B1a%20Willow!5e0!3m2!1ses-419!2sar!4v1649704101986!5m2!1ses-419!2sar"
></iframe>; */
}

const Footer = () => {
  const handleClick = (e) => {
    const target = document.getElementById(e.target.name);
    target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div>
        <h2>
          Soy{' '}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 154.87 113"
            className={styles.nav_logo}
          >
            <g id="Capa_2" data-name="Capa 2">
              <g id="Capa_1-2" data-name="Capa 1">
                <path d="M0,34c0,18.7.2,34,.5,34s6.6-1.5,14.2-3.4,16.4-4,19.6-4.7L40,58.7V0H0Z" />
                <path d="M66,27V54l2.3-.4c3.8-.8,14.9-2.5,23.2-3.6,4.4-.6,9.5-1.3,11.3-1.6l3.2-.5V0H66Z" />
                <path d="M126.82,39.6c-.4.3.3,1.5,1.4,2.6,1.5,1.4,1.7,2.3.9,3.1-1.6,1.6-1.4,9,.3,11.3,1.3,1.6,1.3,2.2,0,4.1-.9,1.4-1,2.4-.4,2.8,1.6,1,4.8-.4,5.5-2.4.4-1.2,2.3-2.1,6.5-2.9,11.2-2.1,15.8-5.9,13.1-11-1.2-2.3-7.9-4.2-14.8-4.2-3.6,0-5.3-.5-6.6-2C131.12,39.1,128,38.3,126.82,39.6Z" />
                <path d="M91,68.5c-5.8,1.9-13.8,4.4-17.7,5.6L66,76.4V113h40V65l-2.2.1C102.52,65.1,96.82,66.7,91,68.5Z" />
                <path d="M21,92.9C-1.48,102,0,101,0,107.5V113H40V99.5c0-10.2-.3-13.5-1.2-13.4C38.12,86.1,30.12,89.1,21,92.9Z" />
              </g>
            </g>
          </svg>
          ostel
        </h2>
      </div>
      <div className={styles.contact}>
        <a
          className={styles.contact_link}
          href="https://www.soyhenry.com"
          target="_blank"
        >
          &copy; Copyright SoyHostel
        </a>
        <a className={styles.contact_link} href="mailto:soyhostel@soyhostel">
          Email: soyhostel@soyhostel.com
        </a>
        <a className={styles.contact_link} href="tel: +1080 (0) 000 000 000">
          Phone: +1080 (0) 000 000 000
        </a>
      </div>
      <div className={styles.media_icons}>
        <a
          className={styles.link}
          target="_blank"
          href="https://www.instagram.com/soyhostel/"
        >
          <i type="button" className="bi bi-instagram"></i>
        </a>
        <a
          className={styles.link}
          target="_blank"
          href="https://www.facebook.com/SoyHostel-112398641450674/"
        >
          <i type="button" className="bi bi-facebook"></i>
        </a>
        <a
          className={styles.link}
          target="_blank"
          href="https://web.whatsapp.com/"
        >
          <i className="bi bi-whatsapp"></i>
        </a>
        <a
          className={styles.link}
          target="_blank"
          href="https://twitter.com/Soyhostel/"
        >
          <i className="bi bi-twitter"></i>
        </a>
      </div>
      <div className={styles.nav_footer}>
        <button
          className={styles.footer_link}
          onClick={handleClick}
          name="explore"
        >
          <i className="bi bi-compass"></i>
          Explore
        </button>
        <button
          className={styles.footer_link}
          onClick={handleClick}
          name="aboutUs"
        >
          <i className="bi bi-info-circle"></i>
          About Us
        </button>
        <button
          className={styles.footer_link}
          onClick={handleClick}
          name="contactUs"
        >
          <i className="bi bi-envelope"></i>
          Contact US
        </button>
        <a
          target="_blank"
          href="https://www.google.com/maps/place/Mar+de+las+Pampas,+Provincia+de+Buenos+Aires/@-37.3241654,-57.0272313,15z/data=!3m1!4b1!4m5!3m4!1s0x959b5dd0fa54eaf1:0x745b63779392e329!8m2!3d-37.3257858!4d-57.0222331"
          className={styles.footer_link}
        >
          Location
        </a>
      </div>
    </footer>
  );
};

export default Footer;
