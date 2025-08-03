import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import MentionPlugin from "../../../plugin/MentionPlugin/MentionPlugin";
import { MentionNode } from "../../../plugin/MentionPlugin/MentionNode";
import AutoLinkPlugin from "../../../plugin/LinkPlugin/AutoLinkPlugin";
import { AutoLinkNode } from "../../../plugin/LinkPlugin/AutoLinkNode";
import BrEnterPlugin from "../../../plugin/BrEnterPlugin/BrEnterPlugi";
import ExportPlugin from "../../../plugin/ExportPlugin/ExportPlugin";
import AddEmojiPlugin from "../../../plugin/AddEmojiPlugin/AddEmojiPlugin";
import style from "./Editor.module.css";

function onError(error) {
    console.error(error);
}

function Editor({ onExport, json, editable, emoji, placeholder }) {
    const initialConfig = {
        namespace: "MyEditor",
        onError,
        nodes: [AutoLinkNode, MentionNode],
        editorState: json ? JSON.stringify(json, null, 2) : null,
        editable: editable,
    };

    return (
        <div className="position-relative w-100">
            <LexicalComposer initialConfig={initialConfig}>
                <RichTextPlugin
                    contentEditable={
                        <ContentEditable
                            className={style.editor_input}
                            aria-placeholder={"Enter some text..."}
                            placeholder={
                                <div className={style.placeholder}>
                                    {placeholder ?? "Có gì mới?"}
                                </div>
                            }
                        />
                    }
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <HistoryPlugin />
                <AutoFocusPlugin />
                <AutoLinkPlugin />
                <MentionPlugin />
                <BrEnterPlugin />
                <ExportPlugin onExport={onExport ?? (() => null)} />
                <AddEmojiPlugin emoji={emoji} />
            </LexicalComposer>
        </div>
    );
}

export default Editor;
