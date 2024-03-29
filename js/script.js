const tweets = [];

const setEndOfContenteditable = contentEditableElement => {
  let range, selection;
  if (document.createRange) {
    range = document.createRange();
    range.selectNodeContents(contentEditableElement);
    range.collapse(false);
    selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  } else if (document.selection) {
    range = document.body.createTextRange();
    range.moveToElementText(contentEditableElement);
    range.collapse(false);
    range.select();
  }
};

const parseAnchor = str => {
  if (str.substr(0, 4) == "href") {
    const endTagIndex = str.indexOf("</a");
    const words = str.split("a>");
    if (
      words[1].match(/[a-zA-Z]|_+/g) &&
      words[1].match(/[a-zA-Z]+/g)[0] !== "nbsp"
    ) {
      return `href="#">${str.slice(9, endTagIndex) + words[1]}</a>`;
    }
  }
  return str;
};

const insertLinks = string => {
  const words = string.split(" ");
  return words
    .map(word => {
      const isHashTagged = word[0] === "#";
      return isHashTagged ? `<a href="#">${word}</a>` : parseAnchor(word);
    })
    .join(" ");
};

const addTweet = () => {
  const body = document.getElementById("tweetBody").innerHTML;
  tweets.push(body);
  const tweetsHTML = tweets.map(tweet => {
    return `<li>${insertLinks(tweet)}</li>`;
  });
  document.getElementById("tweetList").innerHTML = tweetsHTML.join("");
  document.getElementById("tweetBody").innerHTML = "";
};

const addScript = val => {
  var s = document.createElement("script");
  s.setAttribute("src", `js/${val}.js`);
  document.body.appendChild(s);
};

const setBackground = () => {
  const hasBGChoice = window.location.search.includes("bg");
  if (hasBGChoice) {
    let value = window.location.search.split("bg=");
    value = value[1].split('&')[0]
    addScript(value);
    if (value == "explosions") {
      document.getElementsByClassName("nav-link")[0].classList.add("active");
    } else if (value == "lines") {
      document.getElementsByClassName("nav-link")[1].classList.add("active");
    } else if (value == "shadows") {
      document.getElementsByClassName("nav-link")[2].classList.add("active");
    }
  } else {
    addScript("explosions");
    document.getElementsByClassName("nav-link")[0].classList.add("active");
  }
};

const focusInput = () => {
  setTimeout(() => {
    document.getElementById("tweetBody").focus();
    document.getElementById("tweetBody").innerHTML = "";
  }, 0);
};

const getTweets = async () => {
  const response = await fetch("https://api.myjson.com/bins/1gwjtm");
  const data = await response.json();
};

const parseInput = () => {
  document.getElementById("tweetBody").addEventListener(
    "input",
    e => {
      const body = document.getElementById("tweetBody").innerHTML;
      document.getElementById("tweetBody").innerHTML = insertLinks(body);
      elem = e.target;
      setEndOfContenteditable(elem);
    },
    false
  );
};

const setupApp = () => {
  setBackground();
  focusInput();
  getTweets();
  parseInput();
};

setupApp();
