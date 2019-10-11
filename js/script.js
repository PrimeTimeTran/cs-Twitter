const tweets = [];

const setEndOfContenteditable = contentEditableElement => {
  var range, selection;
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
    let words = str.split("a>");
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
  let splitString = string.split(" ");
  return splitString
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

const setupApp = () => {
  const div = document.getElementById("tweetBody");
  setTimeout(() => {
    div.focus();
    document.getElementById("tweetBody").innerHTML = "";
  }, 0);

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

const getTweets = async () => {
  const response = await fetch("https://api.myjson.com/bins/1gwjtm");
  const data = await response.json();
  console.log("https://api.myjson.com/bins/1gwjtm", data);
};

setupApp();
getTweets();


const addScript = () => {
  document.getElementById("la").remove();
  var s = document.createElement("script");
  s.setAttribute(
    "src",
    "js/explosions.js"
  );
  s.setAttribute(
    "id",
    "la"
  );
  document.body.appendChild(s);
};
