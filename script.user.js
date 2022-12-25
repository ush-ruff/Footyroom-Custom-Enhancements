// ==UserScript==
// @name        Footyroom - Custom Enhancements
// @namespace   Violentmonkey Scripts
// @match       https://footyroom.co/*
// @grant       none
// @version     0.1.0
// @author      ushruff
// @description Changes all links to open in current tab, Add button onto page to scroll to top, Change some team badges with more accurate images.
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

const TEAM_BADGES = [
  {
    name: "Chelsea",
    code: 1,
    url: "https://ssl.gstatic.com/onebox/media/sports/logos/fhBITrIlbQxhVB6IjxUO6Q_96x96.png"
  },
  {
    name: "Manchester United",
    code: 2,
    url: "https://ssl.gstatic.com/onebox/media/sports/logos/udQ6ns69PctCv143h-GeYw_96x96.png"
  },
  {
    name: "Manchester City",
    code: 3,
    url: "https://ssl.gstatic.com/onebox/media/sports/logos/z44l-a0W1v5FmgPnemV6Xw_96x96.png"
  },
  {
    name: "Arsenal",
    code: 4,
    url: "https://ssl.gstatic.com/onebox/media/sports/logos/4us2nCgl6kgZc0t3hpW75Q_96x96.png"
  },
  {
    name: "Aston Villa",
    code: 5,
    url: "https://ssl.gstatic.com/onebox/media/sports/logos/uyNNelfnFvCEnsLrUL-j2Q_96x96.png"
  },
  {
    name: "Everton",
    code: 6,
    url: "https://ssl.gstatic.com/onebox/media/sports/logos/C3J47ea36cMBc4XPbp9aaA_96x96.png"
  },
  {
    name: "Fulham",
    code: 7,
    url: "https://ssl.gstatic.com/onebox/media/sports/logos/Gh7_5p3n364p4vxeM8FhNg_96x96.png"
  },
  {
    name: "Liverpool",
    code: 8,
    url: "https://ssl.gstatic.com/onebox/media/sports/logos/0iShHhASp5q1SL4JhtwJiw_96x96.png"
  },
  {
    name: "Stoke City",
    code: 10,
    url: "https://ssl.gstatic.com/onebox/media/sports/logos/T9sIbS6mr9BuRKY6y4FFLA_96x96.png"
  },
  {
    name: "Sunderland",
    code: 11,
    url: "https://ssl.gstatic.com/onebox/media/sports/logos/CQFeTfHrtxqgr3VKWtTwfA_96x96.png"
  },
  {
    name: "Burnley",
    code: 16,
    url: "https://ssl.gstatic.com/onebox/media/sports/logos/teLLSaMXim_8BA1d93sMng_96x96.png"
  },
  {
    name: "Hull City",
    code: 17,
    url: "https://ssl.gstatic.com/onebox/media/sports/logos/riiyZbb1JHuFQgZ3831jUQ_96x96.png"
  },
  {
    name: "Tottenham Hotspur",
    code: 18,
    url: "https://ssl.gstatic.com/onebox/media/sports/logos/k3Q_mKE98Dnohrcea0JFgQ_96x96.png"
  },
  {
    name: "West Ham United",
    code: 19,
    url: "https://ssl.gstatic.com/onebox/media/sports/logos/bXkiyIzsbDip3x2FFcUU3A_96x96.png"
  },
  {
    name: "Wolverhampton Wanderers",
    code: 20,
    url: "https://ssl.gstatic.com/onebox/media/sports/logos/-WjHLbBIQO9xE2e2MW3OPQ_96x96.png"
  },
  {
    name: "Newcastle United",
    code: 315,
    url: "https://ssl.gstatic.com/onebox/media/sports/logos/96CcNNQ0AYDAbssP0V9LuQ_96x96.png"
  },
  {
    name: "West Bromwich Albion",
    code: 317,
    url: "https://ssl.gstatic.com/onebox/media/sports/logos/Im2UqFKvfm3TaM7R2RYkjw_96x96.png"
  },
  {
    name: "Leeds United",
    code: 325,
    url: "https://ssl.gstatic.com/onebox/media/sports/logos/5dqfOKpjjW6EwTAx_FysKQ_96x96.png"
  },
  {
    name: "Sheffield United",
    code: 328,
    url: "https://ssl.gstatic.com/onebox/media/sports/logos/wF8AgQsssfy3_GLyVR3dSg_96x96.png"
  },
  {
    name: "Leicester City",
    code: 330,
    url: "https://ssl.gstatic.com/onebox/media/sports/logos/UDYY4FSlty6fXFBzvFfcyw_96x96.png"
  },
  {
    name: "Nottingham Forrest",
    code: 331,
    url: "https://ssl.gstatic.com/onebox/media/sports/logos/Zr6FbE-8pDH7UBpWCO8U9A_96x96.png"
  },
  {
    name: "Norwich City",
    code: 333,
    url: "https://ssl.gstatic.com/onebox/media/sports/logos/y-we_-8ySOubta5psWzDoA_96x96.png"
  },
  {
    name: "Crystal Palace",
    code: 335,
    url: "https://ssl.gstatic.com/onebox/media/sports/logos/8piQOzndGmApKYTcvyN9vA_96x96.png"
  },
  {
    name: "Barnsley",
    code: 338,
    url: "https://ssl.gstatic.com/onebox/media/sports/logos/xA0k0rZwCeUA0klmw9n9iQ_96x96.png"
  },
  {
    name: "Watford",
    code: 342,
    url: "https://ssl.gstatic.com/onebox/media/sports/logos/lHr1L31i7aJS-O8tUdHOIQ_96x96.png"
  },
  {
    name: "Southampton",
    code: 487,
    url: "https://ssl.gstatic.com/onebox/media/sports/logos/y1V4sm2SEBiWUPRIYl5rfg_96x96.png"
  },
  {
    name: "AFC Bournemouth",
    code: 500,
    url: "https://ssl.gstatic.com/onebox/media/sports/logos/IcOt-hrK04B-RlRwI3R0yA_96x96.png"
  },
  {
    name: "Brentford",
    code: 580,
    url: "https://ssl.gstatic.com/onebox/media/sports/logos/QOUce0WQBYqnkSmN6_TxGA_96x96.png"
  },
  {
    name: "Brighton & Hove Albion",
    code: 619,
    url: "https://ssl.gstatic.com/onebox/media/sports/logos/EKIe0e-ZIphOcfQAwsuEEQ_96x96.png"
  },
  {
    name: "Luton Town",
    code: 1832,
    url: "https://ssl.gstatic.com/onebox/media/sports/logos/3e7bXAkZVEVAKQWTRQdGFw_96x96.png"
  }
]



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
  const teamBadges = document.querySelectorAll(BADGE_ELEMENTS[eventType])

  teamBadges.forEach(badge => {
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







