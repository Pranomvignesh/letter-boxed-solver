export class WordNode {
    char: string = '';
    children: Record<string, WordNode> = {};
    endOfWord: string = '';
    constructor(char = '') {
        this.char = char
        this.children = {}
        this.endOfWord = ''
        return this
    }
}