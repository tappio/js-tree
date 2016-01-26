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
        if (this.isEmpty()) {
            return null;
        }
        var current = this.root;
        while (current !== null) {
            if (data > current.data) {
                current = current.right;
            } else if (data < current.data) {
                current = current.left;
            } else {
                return current;
            }
        }
        return null;
    }

}