import React, { useEffect, useState } from "react"

function Game() {
  const list = ["rock", "paper", "scissors"]
  const [selector, setSelector] = useState(list[0])
  const [random, setRandom] = useState("")
  const [count, setCount] = useState({
    triumf: 0,
    equal: 0,
    defeat: 0,
  })
  const total = count.defeat + count.equal + count.triumf 

  function percent(percent, total) {
    return percent? (percent * 100) / total : 0
  }

  function createRandom() {
    const rand = Math.floor(Math.random() * list.length)
    const out = list[rand]
    setRandom(out)
    // Adding count

    let result = rules(selector, out)

    if (result === "Triumph") {
      setCount((prev) => {
        return {
          ...prev,
          triumf: count.triumf + 1,
        }
      })
    }
    if (result === "Defeat") {
      setCount((prev) => {
        return {
          ...prev,
          equal: count.equal + 1,
        }
      })
    }
    if (result === "Equal") {
      setCount((prev) => {
        return {
          ...prev,
          defeat: count.defeat + 1,
        }
      })
    }
  }

  function selectOption(el) {
    setSelector(el)
    setRandom("")
  }

  // Rules
  function rules(choise, choise2) {
    if (choise === choise2) {
      return "Equal"
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
              onClick={() => selectOption(el)}
            >
              {el}
            </li>
          )
        })}
      <p>
        Your selection currently is: <span>{selector.toUpperCase()}</span>
      </p>
      <button onClick={createRandom}>Play</button>
      <h5>Computer's choise:</h5>
      <p>
        After carefully thinking, the choise is:{" "}
        <span>{random ? random.toUpperCase() : "press play to discover"}</span>
      </p>
      <div className="result">
        <p>
          The battle outcomes were assessed accurately, result is:{"\n"}
          <span>
            {random ? rules(selector, random).toUpperCase() : "Waiting..."}
          </span>
        </p>
      </div>
      <div className="result">
        <p>
          Triumf <span>{count.triumf}</span>
        </p>
        <p>
          Equal <span>{count.equal}</span>
        </p>
        <p>
          Defeat <span>{count.defeat}</span>
        </p>
        <p>
          You won <span>{percent(count.triumf, total).toFixed(2)}%</span> from{" "}
          <span>{total}</span> tries.
        </p>
      </div>
    </div>
  )
}

export default Game
