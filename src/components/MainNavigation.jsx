import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { newsAction } from "../store/NewsStore";
import { auth } from "../Index";
import "./MainNavigation.css";

const MainNavigation = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const languages = [
    { name: "Afrikaans", code: "afrikaans" },
    { name: "Amharic", code: "amharic" },
    { name: "Arabic", code: "arabic" },
    { name: "Armenian", code: "armenian" },
    { name: "Azerbaijani", code: "azerbaijani" },
    { name: "Basque", code: "basque" },
    { name: "Belarusian", code: "belarusian" },
    { name: "Bengali", code: "bengali" },
    { name: "Bulgarian", code: "bulgarian" },
    { name: "Catalan", code: "catalan" },
    { name: "Chinese", code: "chinese" },
    { name: "Croatian", code: "croatian" },
    { name: "Czech", code: "czech" },
    { name: "Danish", code: "danish" },
    { name: "Dutch", code: "dutch" },
    { name: "Finnish", code: "finnish" },
    { name: "French", code: "french" },
    { name: "German", code: "german" },
    { name: "Gujarati", code: "gujarati" },
    { name: "Hebrew", code: "hebrew" },
    { name: "Hindi", code: "hindi" },
    { name: "Hungarian", code: "hungarian" },
    { name: "Indonesian", code: "indonesian" },
    { name: "Italian", code: "italian" },
    { name: "Kannada", code: "kannada" },
    { name: "Khmer", code: "khmer" },
    { name: "Korean", code: "korean" },
    { name: "Macedonian", code: "macedonian" },
    { name: "Malay", code: "malay" },
    { name: "Malayalam", code: "malayalam" },
    { name: "Oriya", code: "oriya" },
    { name: "Persian", code: "persian" },
    { name: "Punjabi", code: "punjabi" },
    { name: "Tamil", code: "tamil" },
    { name: "Telugu", code: "telugu" },
    { name: "Turkish", code: "turkish" },
    { name: "Urdu", code: "urdu" },
    { name: "Vietnamese", code: "vietnamese" },
  ];

  const authentication = auth;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate("/");
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    dispatch(newsAction.countryCode(event.target.value));
  };

  return (
    <>
      <main>
        <ul className="navbar">
          <li>
            <span className="logo" onClick={navigateHandler}>
              <h2>The Global Chronicle</h2>
            </span>
          </li>
          <div className="contents">
            {authentication.currentUser ? (
              <li>
                <NavLink to="/signout">Signout</NavLink>
              </li>
            ) : (
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            )}

            <li>
              <select value={selectedCountry} onChange={handleCountryChange}>
                <option value="">Select Language</option>
                {languages.map((country, index) => (
                  <option key={index} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </li>
            <li>
              <NavLink to={`/${authentication.currentUser}/favNews`}>
                Favourites
              </NavLink>
            </li>
          </div>
        </ul>
      </main>
    </>
  );
};

export default MainNavigation;
