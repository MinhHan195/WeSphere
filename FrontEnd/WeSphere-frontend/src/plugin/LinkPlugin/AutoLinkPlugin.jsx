/* eslint-disable no-unused-vars */
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useState, useRef } from "react";
import { $createAutoLinkNode } from "./AutoLinkNode";
import {
    $getSelection,
    $isRangeSelection,
    TextNode,
    COMMAND_PRIORITY_LOW,
} from "lexical";

const AutoLinkPlugin = () => {
    const [editor] = useLexicalComposerContext();
    const [count, setCount] = useState(0);
    const [link, setLink] = useState("");

    useEffect(() => {
        return editor.registerCommand(
            "INSERT_LINK_COMMAND",
            (payload) => {
                const autoLinkNode = $createAutoLinkNode(payload);
                const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                    selection.insertNodes([autoLinkNode]);
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
                    const match = triggerText.match(
                        /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
                    );
                    if (match) {
                        const payload = {
                            url: match[0],
                            title: match[0],
                            id: count,
                        };
                        setCount(count + 1);
                        setLink(payload);
                    }
                });
            }
        );

        return () => {
            removeListener();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editor]);

    useEffect(() => {
        if (link) {
            editor.update(() => {
                const selection = $getSelection();
                if (!$isRangeSelection(selection)) return;
                const anchor = selection.anchor;
                const startOffset = anchor.offset - link.url.length;
                selection.setTextNodeRange(
                    anchor.getNode(),
                    startOffset,
                    anchor.getNode(),
                    anchor.offset
                );
                selection.deleteWord();
                editor.dispatchCommand("INSERT_LINK_COMMAND", link);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [link]);

    return null;
};

export default AutoLinkPlugin;
