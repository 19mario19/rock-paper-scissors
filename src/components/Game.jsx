import React, { useEffect, useState } from "react"
import Backdrop from "../Modal/Backdrop"
import Modal from "../Modal/Modal"
import rock from "../assets/rock.png"
import paper from "../assets/paper.png"
import scissors from "../assets/scissors.png"

function Game() {
  const list = ["rock", "paper", "scissors"]
  const listImg = [rock, paper, scissors]
  const [selector, setSelector] = useState("")
  const [random, setRandom] = useState("")
  const [count, setCount] = useState({
    triumf: 0,
    equal: 0,
    defeat: 0,
  })
  const [history, setHistory] = useState([])
  const [message, setMessage] = useState("Waiting...")

  const total = count.defeat + count.equal + count.triumf

  function percent(percent, total) {
    return percent ? (percent * 100) / total : 0
  }

  // Reset after two seconds
  function reset(time) {
    setTimeout(() => {
      setSelector("")
      setRandom("")
      // toggle()
    }, time)
  }

  // Sync data

  useEffect(() => {
    if (selector) {
      createRandom()
    }
  }, [selector])

  // Play button
  function createRandom() {
    const rand = Math.floor(Math.random() * list.length)
    const out = list[rand]
    if (rules(selector, out) === "Select one") {
      setRandom("")
      setMessage("Select one")
      return
    }
    setRandom(out)
    const scoreMessage = `${selector} vs ${out} ${rules(selector, out)}`
    setHistory((prev) => [scoreMessage, ...prev])

    // Adding count

    let result = rules(selector, out)

    if (result === "Triumph") {
      setCount((prev) => {
        return {
          ...prev,
          triumf: count.triumf + 1,
        }
      })
    } else if (result === "Defeat") {
      setCount((prev) => {
        return {
          ...prev,
          defeat: count.defeat + 1,
        }
      })
    } else if (result === "Equal") {
      setCount((prev) => {
        return {
          ...prev,
          equal: count.equal + 1,
        }
      })
    } else {
      setMessage("Select one")
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

    if (choise === "") {
      return "Select one"
    }
  }

  return (
    <div className="game">
      <div className="main">
        <div className="left">
          {/* <h5>You:</h5> */}
          <ul>
            {list &&
              list.map((el, index) => {
                return (
                  <li
                    name={el}
                    key={index}
                    className={selector === el ? "select" : ""}
                    onClick={() => {
                      selectOption(el)
                      createRandom()
                    }}
                  >
                    {el}
                  </li>
                )
              })}
          </ul>
        </div>
        <div className="middle">
          <p>{history && history[0]}</p>
        </div>
        <div className="right">
          {/* <h5>Computer's choise:</h5> */}
          <ul>
            {list &&
              list.map((el, index) => {
                return (
                  <li
                    name={el}
                    key={index}
                    className={random === el ? "select" : ""}
                  >
                    {el}
                  </li>
                )
              })}
          </ul>
        </div>
      </div>
      {/* <div className="outcome">
        <p>
          {random
            ? rules(selector, random).toUpperCase()
            : message.toUpperCase()}
        </p>
      </div> */}
      <div className="side">
        <div className="count">
          <p className="triumf">
            <span>{count.triumf}</span>
          </p>
          <p className="defeat">
            <span>{count.defeat}</span>
          </p>
        </div>
        <div className="history">
          <ul>
            {history &&
              history.map((el, index) => {
                return <li key={index}>{el}</li>
              })}
          </ul>
        </div>
      </div>
      {/* <button onClick={createRandom}>Play</button> */}
    </div>
  )
}

export default Game
