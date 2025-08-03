import { DecoratorNode } from "lexical";
import style from "./Mention.module.css";
import * as React from "react";

export class MentionNode extends DecoratorNode {
    user;

    static getType() {
        return "mention";
    }

    static clone(node) {
        return new MentionNode(node.user, node.__key);
    }

    constructor(user, key) {
        super(key);
        this.user = user;
    }

    // eslint-disable-next-line no-unused-vars
    createDOM(config) {
        const span = document.createElement("span");
        span.className = style.mention;
        span.setAttribute("data-id", this.user.id);
        span.setAttribute("data-user-id", this.user.id);
        span.setAttribute("data-username", this.user.username);
        span.contentEditable = "false";
        return span;
    }

    decorate() {
        return `@${this.user.username}`;
    }

    updateDOM() {
        return false;
    }

    static importJSON(serializedNode) {
        return new MentionNode(serializedNode);
    }

    exportJSON() {
        return {
            type: "mention",
            userId: this.user.userIdid,
            id: this.user.id,
            name: this.user.name,
            username: this.user.username,
        };
    }
}

export function $createMentionNode(user) {
    return new MentionNode(user);
}
