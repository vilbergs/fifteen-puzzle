import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const winningSet = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, null],
  ]

  const [tiles, setTiles] = useState(
    [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, null],
    ].map(shuffle),
  )
  const [win, setWin] = useState(false)

  useEffect(() => {
    /*
     * A bit of a hack:
     * In order to deeply compare the multidimensional array I found it best to just stringify
     * and check if they were identical
     */
    setWin(tiles.toString() === winningSet.toString())
  }, [tiles, winningSet])

  const getPos = (tile) => {
    return tiles.reduce(
      (pos, row, ypos) => {
        const xpos = row.indexOf(tile)

        if (xpos !== -1) {
          return [xpos, ypos]
        }

        return pos
      },
      [0, 0],
    )
  }

  const getTile = (xpos, ypos) => {
    return tiles[ypos][xpos]
  }

  const reset = () => {
    setTiles(tiles.map(shuffle))
  }

  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1

      // And swap it with the current element.
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }

    return array
  }

  const getDirection = (tile) => {
    const [xpos, ypos] = getPos(tile)

    if (null === getTile(xpos, ypos)) {
      return ['EMPTY', xpos, ypos]
    } else if (ypos - 1 >= 0 && null === getTile(xpos, ypos - 1)) {
      return ['UP', xpos, ypos - 1]
    } else if (null === getTile(xpos + 1, ypos)) {
      return ['RIGHT', xpos + 1, ypos]
    } else if (ypos + 1 <= tiles.length - 1 && null === getTile(xpos, ypos + 1)) {
      return ['DOWN', xpos, ypos + 1]
    } else if (xpos - 1 >= 0 && null === getTile(xpos - 1, ypos)) {
      return ['LEFT', xpos - 1, ypos]
    }

    return ['STUCK', xpos, ypos]
  }

  const changeTile = (tile) => {
    const [prevX, prevY] = getPos(tile)
    const [direction, x, y] = getDirection(tile)

    let newTiles = [...tiles]

    if (direction !== 'STUCK' && direction !== 'EMPTY') {
      newTiles[y][x] = tile
      newTiles[prevY][prevX] = null
    }

    setTiles(newTiles)
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexFlow: 'column',
          maxWidth: 500,
          maxHeight: 500,
          margin: '0 auto',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            textAlign: 'center',
            verticalAlign: 'middle',
            display: win ? 'block' : 'none',
            background: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            fontSize: '2em',
          }}
        >
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>WIN!</div>
        </div>
        {tiles.map((row, ypos) => (
          <div key={`row-${ypos}`} style={{ display: 'flex' }}>
            {row.map((tile, xpos) => (
              <div
                key={`tile-${xpos}-${ypos}`}
                onClick={() => changeTile(tile)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 15,
                  width: '100%',
                  margin: 5,
                  background: null === tile ? 'aliceblue' : '#7FDBFF',
                  transition: 'all 0.3s ease-out 0s',
                  fontSize: '2em',
                  color: '#001f3f',
                  boxShadow:
                    null === tile
                      ? 'none'
                      : '0 1px 1px rgba(0,0,0,0.15), 0 2px 2px rgba(0,0,0,0.15), 0 4px 3px rgba(0,0,0,0.15), 0 4px 4px rgba(0,0,0,0.15)',
                }}
                className={'cube'}
              >
                {tile}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 500, margin: '20px 10px' }}>
        <button
          onClick={() =>
            setTiles([
              [1, 2, 3, 4],
              [5, 6, 7, 8],
              [9, 10, 11, 12],
              [13, 14, 15, null],
            ])
          }
        >
          Win
        </button>
        <button onClick={reset}>Reset</button>
      </div>
    </>
  )
}

function assertEquals(a1, a2) {
  return
}

export default App
