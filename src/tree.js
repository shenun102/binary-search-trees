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
      node.right = this.deleteItemRecursively(node.right, successor.value);
    }

    return node; // return the modified node
  }

  findMin(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  // Find value method

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

  // levelOrder(callback)
  levelOrder(callback) {
    // Ensure callback is provided
    this.checkCallback(callback);

    // Helper function to process all nodes at given level
    const processLevel = (node, level) => {
      // Base case if node is null, return, nothing to process
      if (node === null) return;
      // If the level is 1, node is processed using callback passed in
      if (level === 1) {
        callback(node);
      } else if (level > 1) {
        // If level is greater than 1, the function calls itself recursively for left and right children of current node, reducing the level by 1 each time
        processLevel(node.left, level - 1);
        processLevel(node.right, level - 1);
      }
    };

    // Get height of the tree
    const treeHeight = this.height(this.root);

    // Traverse each level and process nodes at that level
    for (let i = 1; i <= treeHeight; i++) {
      processLevel(this.root, i);
    }
  }

  // inOrder(callback)
  // In-Order Traversal (Left → Root → Right)
  inorder(callback) {
    // Check for callback with helper method
    this.checkCallback(callback);

    // Helper function to process nodes
    const traverseInOrder = (node) => {
      // check if node is null
      if (node === null) return;

      // traverse left subtree first
      traverseInOrder(node.left);

      // process current node
      callback(node);

      // traverse right subtree
      traverseInOrder(node.right);
    };

    // Start traversal from root node
    traverseInOrder(this.root);
  }

  // preOrder(callback)
  // Pre-Order Traversal (Root → Left → Right)
  preOrder(callback) {
    // Check for callback with the helper method
    this.checkCallback(callback);

    // Helper function to process nodes
    const traversePreOrder = (node) => {
      // check if node is null
      if (node === null) return;

      // Visit the current node first (call the callback on the node).
      callback(node);

      // Traverse the left subtree (if it exists).
      traversePreOrder(node.left);

      // Traverse the right subtree (if it exists).
      traversePreOrder(node.right);

      // Order: Root → Left → Right
    };

    traversePreOrder(this.root);
  }

  // Post-Order Traversal (Left → Right → Root)
  postOrder(callback) {
    this.checkCallback(callback);

    // Helper function to traverse post order
    const traversePostOrder = (node) => {
      // Base case
      if (node === null) return;
      // Traverse the left subtree first
      traversePostOrder(node.left);

      // Traverse the right subtree
      traversePostOrder(node.right);

      // Visit the current node last
      callback(node);

      // Order: Left → Right → Root
    };

    traversePostOrder(this.root);
  }

  // Helper method for checking callback
  checkCallback(callback) {
    if (typeof callback !== "function")
      throw new Error("A callback function is required");
  }

  // Method for node height
  height(node) {
    // base case
    if (node === null) return 0;
    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  // Method for depth
  depth(node) {
    // Helper function
    const findDepth = (current, target, currentDepth) => {
      // base case
      if (current === null) return -1;

      // If node is target node, return current depth
      if (current === target) return currentDepth;

      // Recursively searches in left subtree
      let leftDepth = findDepth(current.left, target, currentDepth + 1);

      // If found in left subtree return the result
      if (leftDepth !== -1) return leftDepth;

      // Otherwise recursively searches in right subtree
      return findDepth(current.right, target, currentDepth + 1);
    };

    return findDepth(this.root, node, 0);
  }

  // Method for checking if its balanced
  isBalanced(node = this.root) {
    // The height method calls itself recursively
    const leftHeight = this.height(this.root.left);
    const rightHeight = this.height(this.root.right);

    return (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      this.isBalanced(node.left && this.isBalanced(node.right))
    );
  }

  // Method for rebalancing tree
  reBalance() {
    let nodes = [];

    this.inorder((node) => nodes.push(node.value));

    // Step 2: Rebuild tree from the sorted array using buildTree
    this.root = this.buildTree(nodes);
  }
}
