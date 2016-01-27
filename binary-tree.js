'use strict';

class BinaryTree {

    constructor() {
        this.root = null;
    }

    insert(data) {
        if (this.root === null) {
            this.root = new Node(data);
            return true;
        }

        var current = this.root;
        var parent;
        while (current !== null) {
            parent = current;
            if (data > current.data) {
                current = current.right;
            } else if (data < current.data) {
                current = current.left;
            } else {
                return false;
            }
        }

        var node = new Node(data);
        if (data > parent.data) {
            parent.right = node;
        } else {
            parent.left = node;
        }
        return true;
    }

    contains(data) {
        return this.getNode(data) !== null;
    }

    remove(data) {
        var node = this.getNode(data);
        if (node === null) {
            return false;
        }
        this.deleteNode(node);
        return true;
    }

    size() {
        return this.nodeSize(this.root);
    }

    nodeSize(node) {
        if (node === null) {
            return 0;
        }
        return this.nodeSize(node.left) + this.nodeSize(node.right) + 1;
    }

    isEmpty() {
        return this.root === null;
    }

    clear() {
        this.root = null;
    }

    getNode(data) {
        var current = this.root;
        var parent = null;
        while (current !== null) {
            if (data > current.data) {
                parent = current;
                current = current.right;
            } else if (data < current.data) {
                parent = current;
                current = current.left;
            } else {
                current.parent = parent;
                return current;
            }
        }
        return null;
    }

    findMinimum(node, parent) {
        var minNode = node;
        var parent0 = parent;
        if (minNode !== null) {
            while (minNode.left !== null) {
                parent0 = minNode;
                minNode = minNode.left;
            }
        }
        minNode.parent = parent0;
        return minNode;
    }

    // node must contain parent element
    deleteNode(node) {
        var parent = node.parent;
        var data = node.data;

        // no children
        if (node.left === null && node.right === null) {
            // no parent, node = root
            if (parent === null) {
                this.root = null;
            } else {
                if (parent.left.data === data) {
                    parent.left = null;
                } else {
                    parent.right = null;
                }
            }
            return true;
        }

        if (node.left === null) {
            // 1 child, right
            if (parent === null) {
                this.root = node.right;
            } else {
                if (parent.left.data === data) {
                    parent.left = node.right;
                } else {
                    parent.right = node.right;
                }
            }

        } else if (node.right === null) {
            // 1 child, left
            if (parent === null) {
                this.root = node.left;
            } else {
                if (parent.left.data === data) {
                    parent.left = node.left;
                } else {
                    parent.right = node.left;
                }
            }

        } else {
            var minNode = this.findMinimum(node.right, node);
            node.data = minNode.data;
            this.deleteNode(minNode);
        }

        return true;
    }

}