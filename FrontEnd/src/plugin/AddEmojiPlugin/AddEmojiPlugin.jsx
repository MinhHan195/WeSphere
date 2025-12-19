import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection } from "lexical";
import { useEffect } from "react";

const AddEmojiPlugin = ({ emoji }) => {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        if (emoji) {
            editor.update(() => {
                const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                    selection.insertText(emoji);
                }
            });
            // Nếu muốn focus editor sau khi chèn:
            editor.focus();
        }
    }, [emoji, editor]);

    return null;
};

export default AddEmojiPlugin;
