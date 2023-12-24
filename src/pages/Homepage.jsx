import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { newsAction } from "../store/NewsStore";
import defaultLogo from "../assets/defaultLogo.jpg";
import heartOutline from "../assets/heartOutline.png";
import heartRed from "../assets/heartRed.png";
import { db, auth } from "../Index";
import { ref, push, get, remove, child } from "firebase/database";
import "./Homepage.css";

const Homepage = () => {
  const [articles, setArticles] = useState([]);
  const [view, setView] = useState(false);
  const [fav, setFav] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const code = useSelector((state) => state.newsReducer.country);
  const dispatch = useDispatch();
  const authentication = auth;

  useEffect(() => {
    const checkFav = async () => {
      const database = db;
      const idRef = ref(
        database,
        authentication.currentUser.uid
          ? `News/Fav/${authentication.currentUser.uid}/`
          : null
      );

      const snapshot = await get(idRef);

      const favArticles = Object.values(snapshot.val() || {}).reduce(
        (acc, value) => ({
          ...acc,
          [value.publishedAt]: true,
        }),
        {}
      );

      setFav(favArticles);
    };

    checkFav();
  }, []);

  let url = `https://newsapi.org/v2/top-headlines?country=${code}&apiKey=d8050723b71a46e1aaf19d1b629adb74`;
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      console.log(data.articles);
      setArticles(data.articles);
      setIsLoading(false);
    } catch (error) {
      console.error(error.code, error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, [url]);

  const toggleHandler = () => {
    setView((prevState) => !prevState);
  };

  const favHandler = async (item) => {
    const database = db;
    const idRef = ref(database, `News/Fav/${authentication.currentUser.uid}/`);

    const snapshot = await get(idRef);

    const alreadyExists = Object.values(snapshot.val() || {}).some(
      (value) => value.publishedAt === item.publishedAt
    );

    if (!alreadyExists) {
      await push(idRef, item);
      setFav((prevState) => ({
        ...prevState,
        [item.publishedAt]: true,
      }));
    } else {
      const keyToRemove = Object.keys(snapshot.val()).find(
        (key) => snapshot.val()[key].publishedAt === item.publishedAt
      );

      if (keyToRemove) {
        await remove(child(idRef, keyToRemove));
        setFav((prevState) => ({
          ...prevState,
          [item.publishedAt]: false,
        }));
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <h3 className="loading">Loading...</h3>
      ) : (
        <main>
          <div className="homepage-header">
            <h1>Trending News</h1>
            {view ? (
              <button onClick={toggleHandler}>List</button>
            ) : (
              <button onClick={toggleHandler}>Grid</button>
            )}
          </div>
          <ul className={view ? "Grid_view" : "trending_news"}>
            {articles.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  dispatch(newsAction.newsDetails(item));
                }}
              >
                <div className="heart">
                  <img
                    src={fav[item.publishedAt] ? heartRed : heartOutline}
                    onClick={() => {
                      setFav((prevState) => ({
                        ...prevState,
                        [item.publishedAt]: !prevState[item.publishedAt],
                      }));
                      favHandler(item);
                    }}
                  />
                </div>
                <Link to={`/${item.source.id}`}>
                  <img src={item.urlToImage ? item.urlToImage : defaultLogo} />
                </Link>
                <p>{item.title}</p>
              </li>
            ))}
          </ul>
        </main>
      )}
    </>
  );
};

export default Homepage;
