/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef, use } from "react";
import style from "./TextContainer.module.css";
import { te } from "date-fns/locale";
const TextContainer = (props) => {
    const { isInput } = props;

    const editor = useRef(null);

    const regex = /\{(mention|link):([^}]+)\}/g;
    const [content, setContent] = useState({
        text: "Chào {mention:1} và {mention:2}! Cuộc họp về project lúc 3PM. Link tài liệu: {link:1}",
        mentions: [
            {
                id: 1,
                userId: "user_123",
                name: "Nguyễn Văn A",
                username: "nguyenvana",
                position: 5,
            },
            {
                id: 2,
                userId: "user_456",
                name: "Trần Thị B",
                username: "tranthib",
                position: 18,
            },
        ],
        links: [
            {
                id: 1,
                url: "https://docs.example.com/meeting",
                title: "Meeting Docs",
                position: 65,
            },
        ],
    });

    //CHUYỂN CÁC PHẦN TỬ THÀNH VĂN BẢN JSON

    const parseContentEditable = (div) => {
        const textParts = [];
        const mentions = [];
        const hashtags = [];
        const links = [];

        let position = 0;

        const walk = (node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                textParts.push(node.textContent);
                position += node.textContent.length;
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                if (node.classList.contains("mention")) {
                    const id = parseInt(node.dataset.id, 10);
                    const userId = node.dataset.userId;
                    const username = node.dataset.username;
                    const name = node.textContent;

                    textParts.push(`{mention:${id}}`);
                    mentions.push({ id, userId, name, username, position });
                    position += `{mention:${id}}`.length;
                } else if (node.classList.contains("hashtag")) {
                    const id = parseInt(node.dataset.id, 10);
                    const tag = node.textContent.replace("#", "");

                    textParts.push(`{hashtag:${tag}}`);
                    hashtags.push({ id, tag, position });
                    position += `{hashtag:${tag}}`.length;
                } else if (node.classList.contains("link")) {
                    const id = parseInt(node.dataset.id, 10);
                    const url = node.href;
                    const title = node.title || node.textContent;

                    textParts.push(`{link:${id}}`);
                    links.push({ id, url, title, position });
                    position += `{link:${id}}`.length;
                } else {
                    // Nếu node không đặc biệt (ví dụ <b>, <i>...), duyệt tiếp các node con
                    node.childNodes.forEach(walk);
                }
            }
        };

        div.childNodes.forEach(walk);

        return {
            text: textParts.join(""),
            mentions,
            hashtags,
            links,
        };
    };

    const updateContent = () => {
        const parsedContent = parseContentEditable(editor.current);
        setContent(parsedContent);
    };

    //  CHUYỂN JSON THÀNH CÁC PHẦN TỬ ĐỂ RENDER

    const parseParts = (text) => {
        const result = [];
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(text)) !== null) {
            if (match.index > lastIndex) {
                result.push({
                    type: "text",
                    content: text.slice(lastIndex, match.index),
                });
            }

            result.push({
                type: match[1], // mention, link
                id: match[2],
            });

            lastIndex = regex.lastIndex;
        }

        if (lastIndex < text.length) {
            result.push({ type: "text", content: text.slice(lastIndex) });
        }

        return result;
    };

    const renderFromJson = () => {
        const parts = parseParts(content.text);

        return parts.map((part, index) => {
            if (part.type === "text") {
                return <span className={style.text}>{part.content}</span>;
            }

            if (part.type === "mention") {
                const m = content.mentions.find(
                    (m) => m.id === parseInt(part.id)
                );
                if (!m) return null;
                return (
                    <span
                        key={index}
                        className={style.mention}
                        data-id={m.id}
                        data-user-id={m.userId}
                        data-username={m.username}
                        contentEditable="false"
                    >
                        @{m.name}
                    </span>
                );
            }

            if (part.type === "link") {
                const l = content.links.find((l) => l.id === parseInt(part.id));
                if (!l) return null;
                return (
                    <span contentEditable="false">
                        <a
                            key={index}
                            className={style.link}
                            data-id={l.id}
                            href={l.url}
                            title={l.title}
                            target="_blank"
                        >
                            {l.title}
                        </a>
                    </span>
                );
            }

            return null;
        });
    };

    // XỬ LÝ KHI NHẬP NỘI DUNG

    const createMentionNode = (payload) => {
        // payload({ id, userId, username, name })
        const node = document.createElement("span");
        node.className = style["mention"];
        node.contentEditable = false;
        node.setAttribute("data-id", payload.id);
        node.setAttribute("data-user-id", payload.userId);
        node.setAttribute("data-username", payload.username);
        node.textContent = payload.name;
        return node;
    };

    const createLinkNode = (payload) => {
        // payload({ id, url, title })
        const span = document.createElement("span");
        span.contentEditable = false;
        const a = document.createElement("a");
        a.className = style["link"];
        a.href = payload.url;
        a.textContent = payload.title;
        a.target = "_blank";
        a.setAttribute("data-id", payload.id);
        span.appendChild(a);
        return span;
    };

    const createTextNode = (text) => {
        const node = document.createElement("span");
        node.className = style["text"];
        node.textContent = text;
        node.contentEditable = true;
        return node;
    };

    const updateTextNode = (node, text) => {
        node.textContent += text;
    };

    const handleInput = (e) => {
        const key = e.key;
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const containerNode = range.startContainer;
            // console.log(range.startContainer);
            if (key === "@") {
                console.log("Handle @");
            } else if (key === "#") {
                console.log("Handle #");
            } else if (key === "Enter") {
                e.preventDefault();
                const br = document.createElement("br");
                const p = editor.current.querySelector("#text-content");
                p.appendChild(br);
                range.setStartAfter(br);
                range.collapse(true);
                selection.removeAllRanges();
                selection.addRange(range);
            } else if (key === "Backspace") {
                if (range.collapsed) {
                    // Tạo 1 range mới để bao vùng ký tự trước con trỏ
                    const newRange = range.cloneRange();
                    newRange.setStart(
                        range.startContainer,
                        range.startOffset - 1
                    ); // lùi về 1 ký tự
                    newRange.setEnd(range.startContainer, range.startOffset);

                    // Xóa nội dung như Backspace
                    newRange.deleteContents();
                } else {
                    // Nếu có vùng chọn sẵn thì xóa như thường
                    range.deleteContents();
                }
            } else if (
                key === "Delete" ||
                key === "Tab" ||
                key === "ArrowLeft" ||
                key === "ArrowRight" ||
                key === "ArrowUp"
            ) {
                console.log("Key pressed:", key);
                return;
            } else {
                let text;
                if (
                    containerNode.nodeType === Node.TEXT_NODE
                        ? containerNode.parentNode.closest("span")
                        : containerNode.closest("span")
                ) {
                    text = containerNode;
                    updateTextNode(text, key);
                } else {
                    text = createTextNode(key);
                    range.insertNode(text);
                }

                range.setStart(text, text.textContent.length);
                range.collapse(true);
                selection.removeAllRanges(); // xóa con trỏ cũ
                selection.addRange(range);
            }
        }
    };

    // BẮT SỰ KIÊN KEYDOWN ĐỂ XỬ LÝ @ VÀ #

    const isTypingKey = (event) => {
        const key = event.key;

        // Phím chữ cái và số
        if (/^[a-zA-Z0-9]$/.test(key)) return true;

        // Dấu câu và ký tự thường dùng khi viết
        const punctuation = "`~!@#$%^&*()_-+={}[]|\\:;\"'<>,.?/¡¿…";
        if (punctuation.includes(key)) return true;

        // Phím điều khiển nội dung viết
        const contentKeys = [
            " ", // space
            "Enter",
            "Tab",
            "Backspace",
            "Delete",
            "ArrowLeft",
            "ArrowRight",
            "ArrowUp",
            "ArrowDown",
        ];
        if (contentKeys.includes(key)) {
            return true;
        }

        return false;
    };

    useEffect(() => {
        const currentEditor = editor.current;
        const p = currentEditor.querySelector("#text-content");
        const range = document.createRange();
        range.setStart(p, 0);
        range.collapse(true);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        if (!currentEditor) return;
        const handle = (e) => {
            if (isTypingKey(e)) {
                handleInput(e);
            }
        };
        currentEditor.addEventListener("keydown", handle);
        return () => {
            currentEditor.removeEventListener("keydown", handle);
        };
    }, []);

    return (
        <div
            className={`${style.text_container}`}
            id="text-container"
            contentEditable={isInput}
            // onInput={handleInput}
            aria-placeholder="Có gì mới?"
            ref={editor}
        >
            <p id="text-content">{isInput ? null : renderFromJson()}</p>
        </div>
    );
};
export default TextContainer;
