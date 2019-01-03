# Skifree
Skifree clone built in Javascript

[![Try now](https://img.shields.io/badge/try-0071bc.svg?style=popout&logo=%20data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFDGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTktMDEtMDNUMTA6MTM6MjVaIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0wMS0wM1QxMDoyMToxNloiIHhtcDpNZXRhZGF0YURhdGU9IjIwMTktMDEtMDNUMTA6MjE6MTZaIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA1MmUyOWMwLTk1NWMtNGYxOC1iZTI0LTMz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)](https://offeringofpie.github.io/skifree)

[![And from that day on, I wore this little 'F' key pendant everywhere I went.](https://imgs.xkcd.com/comics/skifree.png)](https://xkcd.com/667/)

# Development start
Install the required dependencies by typing ```npm install``` or ```yarn```.<br>
Start the test server by running ```npm start``` or ```yarn start```.<br>
To make the code production-ready, run ```npm run build``` or ```yarn build```.


# TODO
- [Skifree](#skifree)
- [Development start](#development-start)
- [TODO](#todo)
  - [sprites](#sprites)
  - [movement](#movement)
  - [collision](#collision)
  - [UI](#ui)
  - [other](#other)

## sprites
* [x] player placement
* [x] obstacle placement
* [x] Objects placement
  - [x] Messages

## movement
* [x] fps throttle
* [x] keyboard control
* [x] mouse control
* [x] smoother speed control
* [x] Press 'F' to pay respects to the monster
* [x] jumping
  * [x] flipping

## collision
* [x] hit test
* [x] crash state
* [x] game reset

## UI
* [ ] scoreboard
  - [x] Timer
  - [x] speed
  - [x] Distance
  - [x] Style
  - [x] Pause
  - [ ] Restart
* [ ] Game Over Messages
* [ ] Start Button
* [ ] Share

## other
* [x] canvas setup
* [ ] West wing
* [ ] East wing
* [ ] yeti
* [ ] extra (rare) obstacles
* [ ] tests
