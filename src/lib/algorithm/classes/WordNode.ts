export class WordNode {
    constructor(char = '', data = {}) {
        this.char = char
        this.children = data.children || {}
        this.endOfWord = data.endOfWord || false

        for (const char in this.children) {
            this.children[char] = new WordNode(char, this.children[char])
        }
        return this
    }
    json() {
        const childJson = {}
        for (const char in this.children) {
            childJson[char] = this.children[char].json()
        }
        return {
            children: childJson,
            endOfWord: this.endOfWord
        }
    }
}