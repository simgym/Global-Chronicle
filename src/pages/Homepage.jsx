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

  let url = `https://newsapi.in/newsapi/news.php?key=pR08aoBEQ4oZVhBRg2Tou2f7clhxEZ&category=${code}_state`;

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

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error fetching data");
      }

      const data = await response.json();
      console.log(data.News);
      setArticles(data.News);

      localStorage.setItem("articles", JSON.stringify(data.articles));
      setIsLoading(false);
    } catch (error) {
      console.error(error.code, error.message);

      const cachedData = localStorage.getItem("articles");
      if (cachedData && cachedData !== "undefined") {
        setArticles(JSON.parse(cachedData));
      } else {
        setArticles("NO DATA");
      }

      setIsLoading(false);
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
            {Array.isArray(articles) ? (
              articles.map((item, index) => (
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
                  <Link to={`/${item.publishedAt}`}>
                    <img src={item.image ? item.image : defaultLogo} />
                  </Link>
                  <p>{item.title}</p>
                </li>
              ))
            ) : (
              <h3 className="nodata_heading">NO DATA</h3>
            )}
          </ul>
        </main>
      )}
    </>
  );
};

export default Homepage;
