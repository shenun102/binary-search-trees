import { Node } from "./node";

export class Tree {
  constructor(array) {
    this.root = null;
    this.array = array;
    this.buildTree(array);
  }

  // Recursive method to build a balanced BST
  buildTree(array) {
    // Sort the array and remove duplicates
    // Remove duplicates using set feature
    const uniqueArr = [...new Set(array)].sort((a, b) => a - b);

    // Recursively build the tree
    this.root = this.buildBalancedTree(uniqueArr, 0, uniqueArr.length - 1);
  }

  // Helper function
  buildBalancedTree(arr, start, end) {
    // Base case
    // If start > end return null
    if (start > end) {
      return null;
    }

    // find the middle element

    const mid = Math.floor((start + end) / 2);
    // Create a node with the middle element
    const node = new Node(arr[mid]);

    // Recursively build the left and right subtrees

    node.left = this.buildBalancedTree(arr, start, mid - 1);
    node.right = this.buildBalancedTree(arr, mid + 1, end);

    return node;
  }

  insert(value) {
    // Check if root is null
    // recursively insert the new value
    this.root = this.insertRecursively(this.root, value);
  }

  insertRecursively(node, value) {
    if (node === null) {
      return new Node(value);
    }

    // If value is smaller than current node
    if (value < node.value) {
      node.left = this.insertRecursively(node.left, value);
      // If value is greater than current node
    } else if (value > node.value) {
      node.right = this.insertRecursively(node.right, value);
    }

    // Return the unchanged node pointer
    return node;
  }
}
