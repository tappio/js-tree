'use strict';

class BinaryTree {

    constructor() {
        this.root = null;
    }

    insert(data) {
        if (!this.root) {
            this.root = new Node(data);
            return true;
        }

        var current = this.root;
        var parent;
        while (current) {
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
        return !!this.getNode(data);
    }

    remove(data) {
        var node = this.getNode(data);
        if (node) {
            this.deleteNode(node);
            return true;
        }
        return false;
    }

    size() {
        return this.nodeSize(this.root);
    }

    nodeSize(node) {
        if (!node)
            return 0;
        return this.nodeSize(node.left) + this.nodeSize(node.right) + 1;
    }

    isEmpty() {
        return !this.root;
    }

    getNode(data) {
        var current = this.root;
        var parent = null;
        while (current) {
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

    static findMinimum(node, parent) {
        var minNode = node;
        var currentParent = parent;
        while (minNode.left) {
            currentParent = minNode;
            minNode = minNode.left;
        }
        minNode.parent = currentParent;
        return minNode;
    }

    deleteNode(node) {
        var parent = node.parent;
        var replacerNode = node.left || node.right;

        if (!node.left || !node.right) {
            if (!parent) {
                this.root = replacerNode;
            } else {
                if (parent.left.data === node.data) {
                    parent.left = replacerNode;
                } else {
                    parent.right = replacerNode;
                }
            }
        } else {
            var minNode = BinaryTree.findMinimum(node.right, node);
            node.data = minNode.data;
            this.deleteNode(minNode);
        }
    }
}