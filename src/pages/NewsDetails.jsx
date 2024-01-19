import { useSelector } from "react-redux";
import defaultLogo from "../assets/defaultLogo.jpg";
import heartOutline from "../assets/heartOutline.png";
import heartRed from "../assets/heartRed.png";
import { useState, useEffect } from "react";
import { db, auth } from "../Index";
import { ref, push, get, remove, child } from "firebase/database";
import "./NewsDetails.css";

const NewsDetails = () => {
  const detailsObj = useSelector((state) => state.newsReducer.details);
  const [fav, setFav] = useState(false);

  const authentication = auth;

  useEffect(() => {
    const checkFav = async () => {
      const database = db;
      const idRef = ref(
        database,
        `News/Fav/${authentication.currentUser.uid}/`
      );

      const snapshot = await get(idRef);

      const alreadyExists = Object.values(snapshot.val() || {}).some(
        (value) => value.publishedAt === detailsObj.publishedAt
      );

      setFav(alreadyExists);
    };

    checkFav();
  }, []);

  const favHandler = async () => {
    const database = db;
    const idRef = ref(database, `News/Fav/${authentication.currentUser.uid}/`);

    const snapshot = await get(idRef);

    if (!fav) {
      const alreadyExists = Object.values(snapshot.val() || {}).some(
        (value) => value.publishedAt === detailsObj.publishedAt
      );

      if (!alreadyExists) {
        await push(idRef, detailsObj);
      } else {
        setFav(true);
      }
    } else if (snapshot.val()) {
      const keyToRemove = Object.keys(snapshot.val()).find(
        (key) => snapshot.val()[key].publishedAt === detailsObj.publishedAt
      );

      if (keyToRemove) {
        await remove(child(idRef, keyToRemove));
      }
    }
  };

  return (
    <>
      <main>
        <div className="news-heart">
          <img
            src={fav ? heartRed : heartOutline}
            onClick={() => {
              setFav((prevState) => !prevState);
              favHandler();
            }}
          />
        </div>
        <span className="news-details">
          <div className="image-container">
            <img src={detailsObj.image ? detailsObj.image : defaultLogo} />
          </div>
          <div className="text-container">
            <h1>{detailsObj.title}</h1>
            <h4>- {detailsObj.author}</h4>
            <span>
              {detailsObj.description ? (
                detailsObj.description
              ) : (
                <p>No description</p>
              )}
            </span>
            <nav className="link-container">
              <a
                href={detailsObj.url}
                target="_blank"
                rel="noopener noreferrer"
                className="read-more"
              >
                Read More
              </a>
            </nav>
          </div>
        </span>
      </main>
    </>
  );
};

export default NewsDetails;
