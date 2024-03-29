"use client";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { isUserLogIn } from "lib";
import { client } from "../_trpc/client";
import { useEffect, useState } from "react";
import "../../styles/Dashboard.css";

export default function Dashboard() {
  const router = useRouter();
  const [categoriesData, setCategoriesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [start, setStart] = useState(1);
  const [total, setTotal] = useState(null);
  const [displayCategory, setDisplayCategory] = useState([]);
  const [defaultCheckValue, setDefaultCheckValue] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    let ignore = false;
    isUserLogIn(Cookies.get("session"))
      .then(async () => {
        if (!ignore) {
          const fAns = await client.secretData.query();
          console.log("fAns", fAns);
          // clickMe();
          setCategoriesData(fAns.json);
          setDisplayCategory(fAns.json.slice(0, 6));
          console.log("hello ji");
          setTotal(fAns.json.length);
        }
      })
      .catch(() => {
        router.push("/login");
      });

    return () => {
      ignore = true;
    };
  }, []);

  const prevHandler = () => {
    setCurrentPage(currentPage - 1);

    if (start !== 1) {
      setStart((s) => {
        return s - 1;
      });
    }
  };

  const nextHandler = () => {
    setCurrentPage(currentPage + 1);
    console.log("start", start);
    if ((start + 6) * 6 <= total) {
      console.log("kkkkkkkkkkkkkkk");
      setStart((s) => {
        return s + 1;
      });
    }
  };

  useEffect(() => {
    let skip = (currentPage - 1) * 6;
    setDisplayCategory(categoriesData.slice(skip, skip + 6));

    let newCheckArr = [];
    categoriesData.slice(skip, skip + 6).map((ele) => {
      if (JSON.parse(localStorage.getItem("checkedItem")).includes(ele.id)) {
        newCheckArr.push(true);
      } else {
        newCheckArr.push(false);
      }
    });
    console.log("newCheckArr", newCheckArr);
    const chu = JSON.parse(JSON.stringify(newCheckArr));
    setDefaultCheckValue(chu);
  }, [currentPage]);

  const storeCheckInLocalStorage = (id) => {
    const newArr = JSON.parse(localStorage.getItem("checkedItem"));
    let alreadyPresent = false;

    newArr.some((productId, index) => {
      if (productId === id) {
        alreadyPresent = true;
        newArr.splice(index, 1);
        localStorage.setItem("checkedItem", JSON.stringify(newArr));
        return true;
      }
    });

    if (!alreadyPresent) {
      newArr.push(id);
      localStorage.setItem("checkedItem", JSON.stringify(newArr));
    }
    let skip = (currentPage - 1) * 6;

    let newCheckArr = [];
    categoriesData.slice(skip, skip + 6).map((ele) => {
      if (JSON.parse(localStorage.getItem("checkedItem")).includes(ele.id)) {
        newCheckArr.push(true);
      } else {
        newCheckArr.push(false);
      }
    });
    console.log("newCheckArr", newCheckArr);
    const chu = JSON.parse(JSON.stringify(newCheckArr));
    setDefaultCheckValue(chu);
  };

  const isChecked = (id) => {
    console.log("asas", localStorage.getItem("checkedItem"), id);
    if (JSON.parse(localStorage.getItem("checkedItem")).includes(id)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div id="CatgoryContainer">
      <h1>Please mark your interests!</h1>
      <p id="helpingTextOne">We will keep you notified</p>

      <p id="helpingTextTwo">My saved interests!</p>
      <ul>
        {displayCategory.map((ele, ind) => {
          return (
            <li id={ele.id}>
              <input
                type="checkbox"
                className="checkbox"
                onChange={() => storeCheckInLocalStorage(ele.id)}
                checked={isChecked(ele.id)}
              />
              <span className="checkmark"></span>
              {ele.name}
              {console.log("moon", defaultCheckValue[ind])}
            </li>
          );
        })}
      </ul>

      <div className="controllers">
        <div>
          {/* {currentPage - 1 > 0 && <button onClick={prevHandler}>Prev</button>} */}

          {currentPage - 1 > 0 && (
            <span className="leftBtn" onClick={prevHandler}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path>
              </svg>
            </span>
          )}

          <button
            value={start}
            onClick={() => setCurrentPage(start)}
            className={start == currentPage ? "active" : "notActive"}
          >
            {start}
          </button>

          <button
            value={start + 1}
            onClick={() => setCurrentPage(start + 1)}
            className={start + 1 == currentPage ? "active" : "notActive"}
          >
            {start + 1}
          </button>

          <button
            value={start + 2}
            onClick={() => setCurrentPage(start + 2)}
            className={start + 2 == currentPage ? "active" : "notActive"}
          >
            {start + 2}
          </button>

          <button
            value={start + 3}
            onClick={() => setCurrentPage(start + 3)}
            className={start + 3 == currentPage ? "active" : "notActive"}
          >
            {start + 3}
          </button>

          <button
            value={start + 4}
            onClick={() => setCurrentPage(start + 4)}
            className={start + 4 == currentPage ? "active" : "notActive"}
          >
            {start + 4}
          </button>

          <button
            value={start + 5}
            onClick={() => setCurrentPage(start + 5)}
            className={start + 5 == currentPage ? "active" : "notActive"}
          >
            {start + 5}
          </button>

          <button
            value={start + 6}
            onClick={() => setCurrentPage(start + 6)}
            className={start + 6 == currentPage ? "active" : "notActive"}
          >
            {start + 6}
          </button>

          {currentPage * 6 <= total && (
            <span className="rightBtn" onClick={nextHandler}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
              </svg>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
