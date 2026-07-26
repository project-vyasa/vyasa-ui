import { StreamLanguage } from '@codemirror/language';
const vyasaParser = {
    startState() {
        return { afterCommand: false };
    },
    token(stream, state) {
        // Consume spaces
        if (stream.eatSpace()) {
            return null;
        }
        // Comments
        if (stream.match('//')) {
            stream.skipToEnd();
            state.afterCommand = false;
            return 'comment';
        }
        // Commands: `command -> tagName (yellow)
        if (stream.match('`')) {
            stream.eatWhile(/[\w-]/);
            state.afterCommand = true;
            return 'tagName';
        }
        // Command argument (immediately after command, before [ or space)
        if (state.afterCommand) {
            // Check for opening bracket - end of argument context
            if (stream.peek() === '[') {
                state.afterCommand = false;
                stream.next();
                return 'punctuation';
            }
            // Consume ONE argument value -> attributeName (orange), then reset
            if (stream.match(/^[\w.-]+/)) {
                state.afterCommand = false; // Only one argument per command
                return 'attributeName';
            }
            // If we get here, reset anyway (e.g., newline after `br`)
            state.afterCommand = false;
        }
        // Segment separator | -> atom (purple)
        if (stream.match('|')) {
            return 'atom';
        }
        // Strings
        if (stream.match('"')) {
            stream.skipTo('"');
            stream.eat('"');
            return 'string';
        }
        // Numbers (standalone)
        if (stream.match(/^\d+/)) {
            return 'number';
        }
        // Punctuation / Brackets
        if (stream.match(/[{}[\],.]/)) {
            state.afterCommand = false;
            return 'punctuation';
        }
        // Regular text (advance one char at a time if nothing else matches)
        stream.next();
        state.afterCommand = false;
        return null;
    }
};
export const vyasaLanguage = StreamLanguage.define(vyasaParser);
