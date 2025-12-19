import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
// import { $generateJsonFromNodes } from "@lexical/rich-text";

function ExportPlugin({ onExport }) {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        const removeListener = editor.registerUpdateListener(
            ({ editorState }) => {
                editorState.read(() => {
                    const json = editorState.toJSON();
                    onExport(json);
                });
            }
        );
        return () => {
            removeListener();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editor]);

    return null;
}

export default ExportPlugin;
