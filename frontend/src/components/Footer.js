import React from 'react';

function Footer(props) {

  return (
    props.loggedIn &&
    <footer className="footer">
      <p className="footer__copyright">&#169; Mesto Russia</p>
    </footer>
  )
}

export default Footer;
