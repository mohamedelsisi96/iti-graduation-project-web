import { doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FaFacebookF, FaTwitter, FaGoogle, FaGithub } from "react-icons/fa";

function Footer() {
  const [noFooter, SetNoFooter] = useState(false);
  useEffect(() => {
    const href = window.location.href;
    SetNoFooter(
      href.includes("admin") ||
        href.includes("buyer") ||
        href.includes("instructor") ||
        href.includes("redirect") ||
        href.includes("student")
        ? true
        : false
    );
  }, );

  return (
    <div className="cardesbackground w-full">
      <footer style={{display:noFooter?'none':'rekative'}} className="footer cardesbackground py-10 flex justify-center items-center flex-col max-w-full">
        <div className="footer-icon">
          <ul className="flex space-x-4 mb-4 text-cyan-700 ">
            <li className="hover:text-white duration-300">
              <a href="https://www.facebook.com/ITIBanhaBranch">
                <FaFacebookF size={24} />
              </a>
            </li>

            <li className="hover:text-white duration-300">
              <a href="https://www.google.com/search?q=iti+banha&sca_esv=2f99265a69e47569&sxsrf=ADLYWIITkhgiS1RA_Ytub3OPEEya_K3o6A%3A1723424942615&source=hp&ei=rmC5ZofII6DP7_UPlPDjoAg&iflsig=AL9hbdgAAAAAZrluvlkEbaqIN60BgN29C7KEO9otBTju&gs_ssp=eJzj4tVP1zc0LCvMMSpMN8g2YLRSNagwNEkzT0kzMDBLTks1t0hNsTKoSDYyMjYwSjVLTEm2SEpKMvDizCzJVEhKzMtIBABvoRN5&oq=iti+banha&gs_lp=Egdnd3Mtd2l6IglpdGkgYmFuaGEqAggAMgsQLhiABBjHARivATIIEAAYgAQYogQyCBAAGIAEGKIEMggQABiABBiiBDIIEAAYgAQYogQyCBAAGIAEGKIESJYRUABYgAtwAHgAkAEAmAHNAaABkQyqAQUwLjguMbgBA8gBAPgBAZgCCaACzwzCAgQQIxgnwgILEAAYgAQYsQMYgwHCAg4QABiABBixAxiDARiKBcICCxAuGIAEGLEDGIMBwgIKECMYgAQYJxiKBcICDhAuGIAEGLEDGIMBGIoFwgIIEAAYgAQYsQPCAg4QLhiABBixAxiDARjUAsICBRAAGIAEwgIREC4YgAQYsQMYgwEYxwEYrwHCAhEQLhiABBixAxjUAhjHARivAcICCBAAGIAEGMsBwgIOEC4YgAQYxwEYywEYrwHCAhAQLhiABBjRAxjHARgKGMsBmAMAkgcFMC43LjKgB4NO&sclient=gws-wiz">
                <FaGoogle size={24} />
              </a>
            </li>
            <li className="hover:text-white duration-300">
              <a href="https://github.com/OmarYassin22/ITI-Graduation-Web-Project">
                <FaGithub size={24} />
              </a>
            </li>
          </ul>
        </div>
        <p className="copy-right text-white">
          Copy Right 2024 © By{" "}
          <span className="text-cyan-600">Team 5aleha 3al alah</span> All Rights
          Reserved
        </p>
      </footer>
    </div>
  );
}

export default Footer;
