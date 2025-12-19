import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
    $createLineBreakNode,
    $getSelection,
    $isRangeSelection,
    COMMAND_PRIORITY_LOW,
    KEY_ENTER_COMMAND,
} from "lexical";
import { useEffect } from "react";

function BrEnterPlugin() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        return editor.registerCommand(
            KEY_ENTER_COMMAND,
            (event) => {
                event.preventDefault();
                editor.update(() => {
                    const selection = $getSelection();
                    if ($isRangeSelection(selection)) {
                        selection.insertNodes([$createLineBreakNode()]);
                    }
                });

                return true;
            },
            COMMAND_PRIORITY_LOW
        );
    }, [editor]);

    return null;
}

export default BrEnterPlugin;
