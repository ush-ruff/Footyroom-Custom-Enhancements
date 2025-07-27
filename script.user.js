// ==UserScript==
// @name        Footyroom - Custom Enhancements
// @namespace   Violentmonkey Scripts
// @match       https://footyroom.co/*
// @grant       none
// @version     0.2.1
// @author      ushruff
// @description Changes all links to open in current tab, Add button onto page to scroll to top, Change some team badges with more accurate images.
// @require     https://raw.githubusercontent.com/ush-ruff/Footyroom-Custom-Enhancements/main/teamBadges.js
// ==/UserScript==

// --------------------
// REFERENCE VARIABLES
// --------------------
const TOP_BTN_ID = "top-btn"

const BADGE_ELEMENTS = {
  load: ".mph-teamlogo, .guide-badge, .guide-final-away-badge, .guide-final-home-badge, .scoreline-badge, .team-badge img",
  delayed: ".prediction-badge, .table-badge",
  click: ".table-badge"
}

const TEAM_BADGES = teamBadges.data



// ----------------
// EVENT LISTENERS
// ----------------
document.addEventListener("click", openLinksInCurrentTab)
document.onload = addTopBtn()
document.onload = setupChangeBadges()


// ----------
// FUNCTIONS
// ----------

// --------------------------
// Open Links in Current Tab
// --------------------------
function openLinksInCurrentTab(e) {
  let link = null

  if (e.target.target === "_blank") {
    link = e.target
  }
  else if(e.target.closest("a").target === "_blank") {
    link = e.target.closest("a")
  }

  if (link == null) return

  e.preventDefault()
  link.target = "_self"
  const newEvent = new MouseEvent("click", {bubbles: true})
  link.dispatchEvent(newEvent)
}


// --------------
// Scroll to Top
// --------------
function addTopBtn() {
  const topBtn = document.createElement("button")
  topBtn.id = TOP_BTN_ID
  document.body.appendChild(topBtn)
  addBtnStyle()

  topBtn.onclick = (e) => {
    e.preventDefault()
    scrollToTop()
  }

  window.addEventListener("scroll", screenPos)
}

function screenPos() {
  const y = window.scrollY
  const topBtn = document.getElementById(`${TOP_BTN_ID}`)

  if (topBtn == null) return

  if (y > 250) {
    topBtn.classList.remove("hidden")
  }
  else {
    topBtn.classList.add("hidden")
  }
}

function scrollToTop() {
  const c = document.documentElement.scrollTop || document.body.scrollTop

  if (c > 0) {
    window.requestAnimationFrame(scrollToTop)
    window.scrollTo(0, c - (c / 10))
  }
}

function addBtnStyle() {
  const styleSheet = document.createElement("style")
  styleSheet.textContent = `
    #${TOP_BTN_ID} {
      appearance: none;
      display: block;
      position: fixed;
      height: 30px;
      width: 30px;
      bottom: 20px;
      left: calc(50% + 1030px/2);
      background: #434343 url('https://i.imgur.com/oO391VB.png') no-repeat 50% 9px;
      border: 1px solid #232323;
      border-radius: 4px;
      cursor: pointer;
      z-index: 99;
    }
    #${TOP_BTN_ID}.hidden {
    display: none;
    }
    #${TOP_BTN_ID}:is(:hover, :focus) {
      background-color: #5e5e5e;
    }
  `
  styleSheet.id = `${TOP_BTN_ID}-styles`
  document.head.append(styleSheet)
}


// -------------------
// Club Badge Changer
// -------------------
function setupChangeBadges() {
  if (document.readyState !== "loading") {
    changeBadges("load")
    predictorChange()
  }

  const pageTabs = document.querySelectorAll(".simple-tab")
  pageTabs.forEach(pageTab => pageTab.addEventListener("click", () => changeBadges("click")))
}

function changeBadges(eventType) {
  const allBadgeElements = document.querySelectorAll(BADGE_ELEMENTS[eventType])

  allBadgeElements.forEach(badge => {
    const badgeNum = parseInt(badge.src.split("/").pop())
    const index = TEAM_BADGES.findIndex(element => element.code === badgeNum)
    if (index !== -1) {
      badge.src = TEAM_BADGES[index].url
    }
  })
}

function predictorChange() {
  const predictorCheck = document.querySelectorAll(".expandable__icn, .extra-content")

  if (predictorCheck.length !== 0) {
    let reRun = setInterval(change, 250)

    function change() {
      const lastBadgeElement = document.querySelectorAll(".predictor-match:last-of-type .prediction-badge, .table-row:last-of-type .table-badge")
      if (lastBadgeElement.length >= 1) {
        clearInterval(reRun)
        changeBadges("delayed")
      }
    }
  }
}







