import React, { useEffect, useState } from "react"

function Game() {
  const list = ["rock", "paper", "scissors"]
  const [selector, setSelector] = useState(list[0])
  const [random, setRandom] = useState("")

  function createRandom() {
    const rand = Math.floor(Math.random() * list.length)
    const out = list[rand]
    setRandom(out)
  }

  // Rules
  function rules(choise, choise2) {
    if (choise === choise2) {
      return "Equally matched"
    }
    if (choise === "rock") {
      if (choise2 === "scissors") {
        return "Triumph"
      } else if (choise2 === "paper") {
        return "Defeat"
      }
    }
    if (choise === "paper") {
      if (choise2 === "rock") {
        return "Triumph"
      } else if (choise2 === "scissors") {
        return "Defeat"
      }
    }
    if (choise === "scissors") {
      if (choise2 === "paper") {
        return "Triumph"
      } else if (choise2 === "rock") {
        return "Defeat"
      }
    }
  }

  return (
    <div className="game">
      <h5>Your choise:</h5>
      {list &&
        list.map((el, index) => {
          return (
            <li
              name={el}
              key={index}
              className={selector === el ? "select" : ""}
              onClick={() => setSelector(el)}
            >
              {el}
            </li>
          )
        })}
      <p>
        Your selection currently is: <span>{selector}</span>
      </p>
      <button onClick={createRandom}>Play</button>
      <h5>Computer's choise:</h5>
      <p>
        After carefully thinking, the choise is: <span>{random}</span>
      </p>
      <div className="result">
        <p>
          The battle outcomes were assessed accurately, result is:{"\n"}
          <span>{rules(selector, random)}</span>
        </p>
      </div>
    </div>
  )
}

export default Game
