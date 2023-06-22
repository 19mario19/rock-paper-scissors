import React, { useEffect, useState } from "react"
import rock from "../assets/rock.svg"
import paper from "../assets/paper.svg"
import scissors from "../assets/scissors.svg"

function Game() {
  const list = [
    {
      name: "rock",
      image: rock,
    },
    {
      name: "paper",
      image: paper,
    },
    {
      name: "scissors",
      image: scissors,
    },
  ]
  const [selector, setSelector] = useState("")
  const [random, setRandom] = useState("")
  const [count, setCount] = useState({
    triumf: 0,
    equal: 0,
    defeat: 0,
  })
  const [history, setHistory] = useState([])
  const [message, setMessage] = useState("Waiting...")

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
      reset(600)
    }
  }, [selector])

  // Play button
  function createRandom() {
    const rand = Math.floor(Math.random() * list.length)
    const out = list[rand].name

    if (rules(selector, out) === "Select one") {
      setRandom("")
      setMessage("Select one")
      return
    }
    setRandom(out)
    const scoreMessage = `${selector} vs ${out} ${rules(
      selector,
      out,
    ).toUpperCase()}`
    setHistory((prev) => [...prev, scoreMessage])

    // Adding count
    let result = rules(selector, out)
    if (result === "Triumph") {
      setCount((prev) => {
        return {
          ...prev,
          triumf: count.triumf + 10,
        }
      })
    } else if (result === "Defeat") {
      setCount((prev) => {
        return {
          ...prev,
          defeat: count.defeat + 10,
        }
      })
    } else if (result === "Equal") {
      setCount((prev) => {
        return {
          ...prev,
          equal: count.equal + 0,
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

  // Add border to win or lose when it changes for two seconds
  const [highlight, setHighlight] = useState("")
  const [highlight2, setHighlight2] = useState("")

  useEffect(() => {
    setTimeout(() => {
      setHighlight("")
    }, 600)
    setHighlight("highlight")
  }, [count.defeat])
  useEffect(() => {
    setTimeout(() => {
      setHighlight2("")
    }, 600)
    setHighlight2("highlight")
  }, [count.triumf])

  // Add animation for n seconds
  const [animation, setAnimation] = useState("")
  useEffect(() => {
    setTimeout(() => {
      setAnimation("add-animation")
    }, 250)
    setAnimation("")
  }, [])

  // Disable click
  const [enable, setEnable] = useState(true)
  function enableClick() {
    setEnable((prev) => !prev)
  }

  return (
    <div className="game">
      <div className="background-image"></div>
      <div className="main">
        <div className="left">
          <ul>
            {list &&
              list.map((el, index) => {
                return (
                  <li
                    name={el.name}
                    key={index}
                    className={selector === el.name ? "select" : ""}
                    onClick={() => {
                      selectOption(el.name)
                      createRandom()
                    }}
                  >
                    <img src={el.image} alt={el.name} />
                  </li>
                )
              })}
          </ul>
        </div>

        <div className="middle">
          <div className="images add-animation">
            <p>
              {list &&
                list
                  .filter((el) => {
                    return el.name === selector
                  })
                  .map((el) => {
                    return (
                      <img
                        className="image-size "
                        src={el.image}
                        alt={el.name}
                      />
                    )
                  })}
            </p>
            <p>
              {list &&
                list
                  .filter((el) => {
                    return el.name === random
                  })
                  .map((el) => {
                    return (
                      <img
                        className="image-size "
                        src={el.image}
                        alt={el.name}
                      />
                    )
                  })}
            </p>
          </div>
        </div>

        <div className="right">
          <ul>
            {list &&
              list.map((el, index) => {
                return (
                  <li
                    name={el.name}
                    key={index}
                    className={random === el.name ? "select" : ""}
                  >
                    <img src={el.image} alt={el.name} />
                  </li>
                )
              })}
          </ul>
        </div>
      </div>
      <div className="side">
        <div className="count">
          <p className={`triumf ${highlight2}`}>
            <span>{count.triumf}</span>
          </p>
          <p className={`defeat ${highlight}`}>
            <span>{count.defeat}</span>
          </p>
        </div>

        {history.length > 0 && (
          <div className="history">
            <ul>
              {history &&
                history.map((el, index) => {
                  return (
                    <li
                      className={index === history.length - 1 ? animation : ""}
                      key={index}
                    >
                      {el}
                    </li>
                  )
                })}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Game
