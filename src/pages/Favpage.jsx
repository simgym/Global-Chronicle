import { useEffect, useState } from "react";
import { ref, get, child } from "firebase/database";
import { db } from "../Index";
import { auth } from "../Index";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { newsAction } from "../store/NewsStore";
import defaultLogo from "../assets/defaultLogo.jpg";
import "./Homepage.css";

const FavNews = () => {
  const [dataList, setDataList] = useState([]);
  const [view, setView] = useState(false);

  const dispatch = useDispatch();

  const authentication = auth;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (authentication.currentUser) {
          const database = db;
          const idRef = ref(
            database,
            `News/Fav/${authentication.currentUser.uid}/`
          );

          const snapshot = await get(idRef);
          const dataObjects = snapshot.val();

          if (dataObjects) {
            const dataArray = [];
            for (let key in dataObjects) {
              dataArray.push(dataObjects[key]);
            }
            setDataList(dataArray);
            console.log(dataArray);
          }
        }
      } catch (error) {
        console.error(error.code, error.message);
      }
    };

    fetchData();
  }, []);

  const toggleHandler = () => {
    setView((prevState) => !prevState);
  };
  return (
    <>
      <main>
        <div className="homepage-header">
          <h1>Favourite News</h1>
          {view ? (
            <button onClick={toggleHandler}>List</button>
          ) : (
            <button onClick={toggleHandler}>Grid</button>
          )}
        </div>
        {authentication.currentUser ? (
          <ul className={view ? "Grid_view" : "trending_news"}>
            {dataList.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  dispatch(newsAction.newsDetails(item));
                }}
              >
                <Link to={`/${item.source.id}`}>
                  <img src={item.urlToImage ? item.urlToImage : defaultLogo} />
                </Link>
                <p>{item.title}</p>
              </li>
            ))}
          </ul>
        ) : (
          <span className="unauthorized">
            <h3>Login</h3>
            <Link to="/login">here</Link>
            <h3>to access</h3>
          </span>
        )}
      </main>
    </>
  );
};

export default FavNews;
