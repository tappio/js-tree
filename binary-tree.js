'use strict';

class BinaryTree {

    constructor() {
        this.root = null;
        this.size_ = 0;
    }

    insert(data) {
        if (this.root === null) {
            this.root = new Node(data);
            this.size_++;
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
        this.size_++;
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
        var parent = node.parent;

        // no children
        if (node.left === null && node.right === null) {
            // no parent, node = root
            if (parent === null) {
                this.clear();
                return true;

            } else {
                if (parent.left.data === data) {
                    parent.left = null;
                } else {
                    parent.right = null;
                }
            }
            this.size_--;
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

            this.size_--;
            return true;

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

            this.size_--;
            return true;

        } else {
            // 2 children
        }


        return false;
    }

    size() {
        return this.size_;
    }

    isEmpty() {
        return this.size_ === 0;
    }

    clear() {
        this.root = null;
        this.size_ = 0;
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

}