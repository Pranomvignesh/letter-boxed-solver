import { WordNode } from "@/lib/algorithm/classes/WordNode";

export class Trie {
    constructor(words = []) {
        this.root = new WordNode()
        for (const word of words) {
            this.addWord(word)
        }
    }
    addWord(word) {
        let node = this.root
        for (const char of word) {
            if (!node.children[char]) {
                node.children[char] = new WordNode(char)
            }
            node = node.children[char]
        }
        node.endOfWord = word
    }
}
