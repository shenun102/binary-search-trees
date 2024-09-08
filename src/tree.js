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

  // Method to delete value
  // There are three cases
  deleteItem(value) {
    this.root = this.deleteItemRecursively(this.root, value);
  }

  deleteItemRecursively(node, value) {
    // Base case
    if (node === null) return node;

    // Traverse tree to find node

    if (value < node.value) {
      node.left = this.deleteItemRecursively(node.left, value);
    } else if (value > node.value) {
      node.right = this.deleteItemRecursively(node.right, value);
    } else {
      // Node to delete has been found

      // Case 1: (leaf node)Node has no children
      if (node.left === null && node.right === null) return null;

      // Case 2: Node only has one child (left or right)
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }

      // Case 3: Node has two children
      // Find the in-order successor (smallest node in the right subtree)
      let successor = this.findMin(node.right);
      // Replace node's value with the successor's value
      node.value = successor;
      // Delete in order successor
      node.right = thjis.deleteItemRecursively(node.right, successor.value);
    }

    return node; // return the modified node
  }

  findMin(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  findValue(value) {
    return this.findValueRecursively(this.root, value);
  }

  findValueRecursively(node, value) {
    // Base case: if node is null or value is found
    if (node === null || node.value === value) return node;

    if (value < node.value) {
      return this.findValueRecursively(node.left, value);
    } else if (value > node.value) {
      return this.findValueRecursively(node.right, value);
    }
  }
}
