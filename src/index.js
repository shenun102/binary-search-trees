import { Node } from "./node";
import { Tree } from "./tree";

const test = new Tree([]);

test.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

console.log(test.root);

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
test.insert(9000);

test.deleteItem(5343345);

prettyPrint(test.root);
console.log("");
prettyPrint(test.findValue(324));
