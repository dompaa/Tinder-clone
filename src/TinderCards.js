import React, { useState, useEffect } from "react";
import "./TinderCards.css";
import TinderCard from "react-tinder-card";
import axios from "./axios";

function TinderCards() {
  const [people, setPeople] = useState([
    // ####hardcoded data before MongoDB
    //   [
    //   // initialize with empty array, variable in react
    //   {
    //     name: "Elon Musk",
    //     url:
    //       "https://upload.wikimedia.org/wikipedia/commons/8/85/Elon_Musk_Royal_Society_%28crop1%29.jpg",
    //   },
    //   {
    //     name: "Jeff Bezos",
    //     url: "https://cdn.britannica.com/56/199056-050-CCC44482/Jeff-Bezos-2017.jpg",
    //   },
    // ]
  ]);

  //when tinder cards load (component), it runs this code once
  useEffect(() => {
    async function fetchData() {
      //call the endpoint inside get
      const req = await axios.get("/tinder/cards");
      //set people to request the data
      setPeople(req.data);
    }

    fetchData();
  }, []);

  console.log(people)

  const swiped = (direction, nameToDelete) => {
    console.log("removing:" + nameToDelete);
    // setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  return (
    <div className="tinderCards">
      <div className="tinderCards__cardContainer">
        {/* for each person */}
        {people.map((person) => (
          <TinderCard
            className="swipe"
            key={person.name}
            preventSwipe={["up", "down"]}
            onSwipe={(dir) => swiped(dir, person.name)}
            onCardLeftScreen={() => outOfFrame(person.name)}
          >
            <div
              style={{ backgroundImage: `url(${person.imgUrl})` }}
              className="card"
            >
              <h3>{person.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
}

export default TinderCards;
