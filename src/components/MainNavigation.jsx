import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { newsAction } from "../store/NewsStore";
import { auth } from "../Index";
import "./MainNavigation.css";

const MainNavigation = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const countries = [
    { name: "Argentina", code: "ar" },
    { name: "Australia", code: "au" },
    { name: "Austria", code: "at" },
    { name: "Belgium", code: "be" },
    { name: "Brazil", code: "br" },
    { name: "Bulgaria", code: "bg" },
    { name: "Canada", code: "ca" },
    { name: "China", code: "cn" },
    { name: "Colombia", code: "co" },
    { name: "Cuba", code: "cu" },
    { name: "Czech Republic", code: "cz" },
    { name: "Egypt", code: "eg" },
    { name: "France", code: "fr" },
    { name: "Germany", code: "de" },
    { name: "Greece", code: "gr" },
    { name: "Hong Kong", code: "hk" },
    { name: "Hungary", code: "hu" },
    { name: "India", code: "in" },
    { name: "Indonesia", code: "id" },
    { name: "Ireland", code: "ie" },
    { name: "Israel", code: "il" },
    { name: "Italy", code: "it" },
    { name: "Japan", code: "jp" },
    { name: "Latvia", code: "lv" },
    { name: "Lithuania", code: "lt" },
    { name: "Malaysia", code: "my" },
    { name: "Mexico", code: "mx" },
    { name: "Morocco", code: "ma" },
    { name: "Netherlands", code: "nl" },
    { name: "New Zealand", code: "nz" },
    { name: "Nigeria", code: "ng" },
    { name: "Norway", code: "no" },
    { name: "Philippines", code: "ph" },
    { name: "Poland", code: "pl" },
    { name: "Portugal", code: "pt" },
    { name: "Romania", code: "ro" },
    { name: "Russia", code: "ru" },
    { name: "Saudi Arabia", code: "sa" },
    { name: "Serbia", code: "rs" },
    { name: "Singapore", code: "sg" },
    { name: "Slovakia", code: "sk" },
    { name: "Slovenia", code: "si" },
    { name: "South Africa", code: "za" },
    { name: "South Korea", code: "kr" },
    { name: "Sweden", code: "se" },
    { name: "Switzerland", code: "ch" },
    { name: "Taiwan", code: "tw" },
    { name: "Thailand", code: "th" },
    { name: "Turkey", code: "tr" },
    { name: "UAE", code: "ae" },
    { name: "Ukraine", code: "ua" },
    { name: "United Kingdom", code: "gb" },
    { name: "United States", code: "us" },
    { name: "Venezuela", code: "ve" },
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
                <option value="">Select a country</option>
                {countries.map((country, index) => (
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
