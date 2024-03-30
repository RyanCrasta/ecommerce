import Link from "next/link";
import "../../styles/Header.css";
import { isUserLogIn } from "lib.cjs";
import Cookies from "js-cookie";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import UserContext from "utils/userContext";

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const { setLoggedIn } = useContext(UserContext);

  isUserLogIn(Cookies.get("session"))
    .then(() => {
      setIsLoggedIn(true);
    })
    .catch(() => {
      setIsLoggedIn(false);
    });

  const logOutHandler = () => {
    Cookies.remove("session");
    router.push("/login");
    setIsLoggedIn(false);
    // @ts-ignore
    setLoggedIn(false);
  };

  return (
    <div id="headerContainer">
      <div id="quickActions">
        <Link href="">Help</Link>
        <Link href="">Orders & Refunds</Link>
        <p>Hi John</p>
      </div>
      <div id="header">
        <h1 id="logoName">ecommerce</h1>
        <div id="mainNav">
          <Link className="navItem" href="">
            Categories
          </Link>
          <Link className="navItem" href="">
            Sale
          </Link>
          <Link className="navItem" href="">
            Clearance
          </Link>
          <Link className="navItem" href="">
            New stock
          </Link>
          <Link className="navItem" href="">
            Trending
          </Link>
        </div>

        <div id="actions">
          {isLoggedIn ? (
            <button
              className="actionHandler"
              id="btnLogout"
              onClick={logOutHandler}
            >
              Logout
            </button>
          ) : (
            <Link className="actionHandler" href="/login">
              Login
            </Link>
          )}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="currentColor"
          >
            <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path>
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="currentColor"
          >
            <path d="M4.00488 16V4H2.00488V2H5.00488C5.55717 2 6.00488 2.44772 6.00488 3V15H18.4433L20.4433 7H8.00488V5H21.7241C22.2764 5 22.7241 5.44772 22.7241 6C22.7241 6.08176 22.7141 6.16322 22.6942 6.24254L20.1942 16.2425C20.083 16.6877 19.683 17 19.2241 17H5.00488C4.4526 17 4.00488 16.5523 4.00488 16ZM6.00488 23C4.90031 23 4.00488 22.1046 4.00488 21C4.00488 19.8954 4.90031 19 6.00488 19C7.10945 19 8.00488 19.8954 8.00488 21C8.00488 22.1046 7.10945 23 6.00488 23ZM18.0049 23C16.9003 23 16.0049 22.1046 16.0049 21C16.0049 19.8954 16.9003 19 18.0049 19C19.1095 19 20.0049 19.8954 20.0049 21C20.0049 22.1046 19.1095 23 18.0049 23Z"></path>
          </svg>
        </div>
      </div>

      <div id="promotion">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="currentColor"
        >
          <path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path>
        </svg>

        <p>Get 10% off on business sign up</p>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="currentColor"
        >
          <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
        </svg>
      </div>
    </div>
  );
}
