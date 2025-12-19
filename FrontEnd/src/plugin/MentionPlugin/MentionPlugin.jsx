import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useState, useRef } from "react";
import { $createMentionNode } from "./MentionNode";
import style from "./Mention.module.css";
import {
    $getSelection,
    $isRangeSelection,
    TextNode,
    COMMAND_PRIORITY_LOW,
} from "lexical";

const MentionPlugin = () => {
    const [editor] = useLexicalComposerContext();
    const [mentionQuery, setMentionQuery] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [userOptions, setUserOptions] = useState([]);
    const [count, setCount] = useState(0);
    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);
    const mentionRef = useRef(null);

    useEffect(() => {
        return editor.registerCommand(
            "INSERT_MENTION_COMMAND",
            (payload) => {
                const mentionNode = $createMentionNode(payload);
                const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                    selection.insertNodes([mentionNode]);
                }
                return true;
            },
            COMMAND_PRIORITY_LOW
        );
    }, [editor]);

    useEffect(() => {
        const removeListener = editor.registerUpdateListener(
            ({ editorState }) => {
                editorState.read(() => {
                    const selection = $getSelection();
                    if (!$isRangeSelection(selection)) return;
                    const anchorNode = selection.anchor.getNode();
                    const text = anchorNode.getTextContent();
                    const offset = selection.anchor.offset;
                    const triggerText = text.slice(0, offset);
                    const domeSelection = window.getSelection();
                    if (domeSelection && domeSelection.rangeCount > 0) {
                        const range = domeSelection.getRangeAt(0);
                        const rect = range.getBoundingClientRect();
                        setTop(rect.top);
                        setLeft(rect.left);
                    }

                    const match = triggerText.match(/@(\w*)$/);
                    if (match) {
                        setMentionQuery(match[1]);
                        setDropdownOpen(true);
                        // Giả lập API lấy user
                        setUserOptions([
                            {
                                id: 1,
                                userId: "user_123",
                                name: "Nguyễn Văn A",
                                username: "nguyenvana",
                                avatar: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
                            },
                            {
                                id: 2,
                                userId: "user_456",
                                name: "Trần Thị B",
                                username: "tranthib",
                                avatar: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
                            },
                            {
                                id: 1,
                                userId: "user_123",
                                name: "Nguyễn Văn A",
                                username: "nguyenvana",
                                avatar: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
                            },
                            {
                                id: 2,
                                userId: "user_456",
                                name: "Trần Thị B",
                                username: "tranthib",
                                avatar: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
                            },
                            {
                                id: 2,
                                userId: "user_456",
                                name: "Trần Thị B",
                                username: "tranthib",
                                avatar: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
                            },
                        ]);
                    } else {
                        setDropdownOpen(false);
                    }
                });
            }
        );

        return () => {
            removeListener();
        };
    }, [editor]);

    const selectMention = (user) => {
        setCount(count + 1);
        editor.update(() => {
            const selection = $getSelection();
            if (!$isRangeSelection(selection)) return;
            const anchor = selection.anchor;
            const startOffset = anchor.offset - mentionQuery.length - 1;
            selection.setTextNodeRange(
                anchor.getNode(),
                startOffset,
                anchor.getNode(),
                anchor.offset
            );
            selection.deleteWord();
            editor.dispatchCommand("INSERT_MENTION_COMMAND", user);
        });
        setDropdownOpen(false);
        setMentionQuery(null);
    };

    const filterUserOptions = (query) => {
        if (!query) return userOptions;
        return userOptions.filter(
            (user) => user.username.includes(query) || user.name.includes(query)
        );
    };

    return (
        <div
            className={`card shadow-sm rounded-4 p-2 ${
                style.mentionPluginContainer
            } ${dropdownOpen ? style.show : style.hide}`}
            style={{
                transform: `translate(${left - 242.725}px, ${top + 25.1}px)`,
            }}
            ref={mentionRef}
        >
            <div className="position-relative">
                <input
                    type="text"
                    className={`form-control ${style.form_control}`}
                    value={mentionQuery ?? ""}
                    onChange={(e) => setMentionQuery(e.target.value)}
                    placeholder="Tìm kiếm người dùng..."
                />{" "}
                {mentionQuery === "" ? (
                    <i className="bi bi-search position-absolute text-secondary top-50 end-0 translate-middle-y pe-3"></i>
                ) : null}
            </div>
            {dropdownOpen && (
                <div className="mention-dropdown" ref={mentionRef}>
                    {filterUserOptions(mentionQuery).map((user, i) => {
                        user.id = count;
                        return (
                            <div
                                key={i}
                                className={style.mentionOption}
                                onClick={() => selectMention(user)}
                            >
                                <div className={style.avatar}>
                                    <img src={user.avatar} alt={user.name} />
                                </div>
                                <div className={style.tagName}>
                                    <span className="fs-6">
                                        <strong>{user.name}</strong>
                                    </span>
                                    <br />
                                    <span className="fw-light text-secondary">
                                        {user.username}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MentionPlugin;

export const INSERT_MENTION_COMMAND = "INSERT_MENTION_COMMAND";
