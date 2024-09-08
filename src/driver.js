import { Tree } from "./tree";

export function testFunction(arrLength) {
  const randomArr = generateRandomArray(arrLength);

  console.log(randomArr);
  const test = new Tree(randomArr);
  prettyPrint(test.root);
  console.log(test.isBalanced(test.root));
  console.log("");
  test.levelOrder((node) => console.log(node.value));
  console.log("");
  test.preOrder((node) => console.log(node.value));
  console.log("");
  test.postOrder((node) => console.log(node.value));
  console.log("");
  test.inorder((node) => console.log(node.value));
}

// Generate random array helper function

function generateRandomArray(length) {
  let randomArray = [];
  for (let i = 0; i < length; i++) {
    // Generate random number between 0 and 99
    const ranNum = Math.floor(Math.random() * 100);
    randomArray.push(ranNum);
  }
  return randomArray;
}

//  Helper function to print tree
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
