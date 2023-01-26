// Initialize the rules object and replace boolean
let rules = {
    bulbasaur: "bby 🥹",
    Bulbasaur: "bby 🥹",
  };
let replace = false;

// Add a message listener that sets the value of "replace"
chrome.runtime.onMessage.addListener((request) => {
  replace = request["replace"];
  doReplacement();
});

// Checks the current value of replace and run walk nodes
// method that controls "enable" button
function doReplacement() {
    console.log(rules);
    console.log(replace)
  if (replace) {
    console.log("Replacing!");
    console.log(rules["bulbasaur"]);
    // Replace is true, we walk the nodes with our normal rule set
    walkNodes(document.body, rules);
  } else {
    // Replace is not true, we walk the nodes with a reversed rule set
    console.log("Un-replacing!");
    walkNodes(document.body, flip(rules));
  }
}

// This is a recursive function which traverses the DOM tree and examines
// the type of each node. If it is a text node, it calls our handleText
// function to replace the text.
function walkNodes(node, replacements) {
  let child, next;

  // We use a switch statement to decide what to do based on the node type.
  // See: https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
  switch (node.nodeType) {
    case 1: // Element - you could check for specific kinds of elements here
    case 9: // Document
    case 11: // Document fragment
      child = node.firstChild;
      while (child) {
        next = child.nextSibling;
        walkNodes(child, replacements);
        child = next;
      }
      break;
    case 3: // Text node
      handleText(node, replacements);
      break;
  }
}

// Uses a regular expression to replace text in a string
function replaceAll(str, mapObj) {
  var re = new RegExp(Object.keys(mapObj).join("|"), "gi");
  return str.replace(re, function (matched) {
    return mapObj[matched];
  });
}

// Replaces the text inside a node using the replaceAll function
function handleText(textNode, replacements) {
    if (textNode.nodeValue.includes("Bulbasaur", 0)) {
        console.log(textNode.nodeValue);
    }
  textNode.nodeValue = replaceAll(textNode.nodeValue, replacements);
}

// Rverses the rules dictionary so we can undo replacements
function flip(data) {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [value, key])
  );
}