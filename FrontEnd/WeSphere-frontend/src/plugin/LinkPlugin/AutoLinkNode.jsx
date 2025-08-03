import { DecoratorNode } from "lexical";
import style from "./AutoLink.module.css";
import * as React from "react";

export class AutoLinkNode extends DecoratorNode {
    data;

    static getType() {
        return "autoLink";
    }

    static clone(node) {
        return new AutoLinkNode(node.data, node.__key);
    }

    constructor(data, key) {
        super(key);
        this.data = data;
    }

    // eslint-disable-next-line no-unused-vars
    createDOM(config) {
        const span = document.createElement("span");
        span.contentEditable = false;
        return span;
    }

    decorate() {
        return (
            <a
                className={style.link}
                href={this.data.url}
                target="_blank"
                data-id={this.data.id}
            >
                {this.data.title}
            </a>
        );
    }

    updateDOM() {
        return false;
    }

    static importJSON(serializedNode) {
        return new AutoLinkNode(serializedNode);
    }

    exportJSON() {
        return {
            type: "autoLink",
            title: this.data.title,
            url: this.data.url,
            id: this.data.id,
        };
    }
}

export function $createAutoLinkNode(data) {
    return new AutoLinkNode(data);
}
