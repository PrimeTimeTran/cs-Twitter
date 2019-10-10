const tweets = [];

const setEndOfContenteditable = contentEditableElement => {
  var range, selection;
  if (document.createRange) {
    //Firefox, Chrome, Opera, Safari, IE 9+
    range = document.createRange(); //Create a range (a range is a like the selection but invisible)
    range.selectNodeContents(contentEditableElement); //Select the entire contents of the element with the range
    range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
    selection = window.getSelection(); //get the selection object (allows you to change selection)
    selection.removeAllRanges(); //remove any selections already made
    selection.addRange(range); //make the range you have just created the visible selection
  } else if (document.selection) {
    //IE 8 and lower
    range = document.body.createTextRange(); //Create a range (a range is a like the selection but invisible)
    range.moveToElementText(contentEditableElement); //Select the entire contents of the element with the range
    range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
    range.select(); //Select the range (make it the visible selection
  }
};

const checkIfAnchored = str => {
  
  if (str[0] == "h" && str[1] == "r") {
    let words = str.split('a>') 
    // let hihi = words[1].split('<')[0]
    // console.log('go', hihi);
    
    const go = str.substr(10, 1)
    console.log('ending word', words[1]);
    // return `href="#">#  ${hihi}</a>`
  }
  return str
};

const insertLinks = string => {
  let splitString = string.split(" ");
  return splitString
    .map((word,idx) => {
      const isHashTagged = word[0] === "#"
      return isHashTagged ? `<a href="#">${word}</a>` : checkIfAnchored(word);
    })
    .join(" ");
};

String.prototype.parseHashtag = function() {
  return this.replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
    console.log("tt", t);
    var tag = t.replace("#", "%23");
    console.log("slksksk", tag);
    return t.link("http://search.twitter.com/search?q=" + tag);
  });
};

const addTweet = () => {
  const body = document.getElementById("tweetBody").innerHTML;
  tweets.push(body);
  const tweetsHTML = tweets.map(tweet => {
    return `<li>${insertLinks(body)}</li>`;
  });
  document.getElementById("tweetList").innerHTML = tweetsHTML.join("");
};

document.getElementById("tweetBody").addEventListener(
  "input",
  e => {
    const body = document.getElementById("tweetBody").innerHTML;
    console.log("Inserted:", insertLinks(body));
    document.getElementById("tweetBody").innerHTML = insertLinks(body);
    elem = e.target;
    setEndOfContenteditable(elem);
  },
  false
);



// `href="#">#khoa</a>`.substr(9)
`href="#">#khoa</a>`.indexOf('<')