import { Trie } from "@/lib/algorithm/classes/Trie";

export class LetterBoxFinder {
    constructor(words) {
        this.words = words;
        this.trie = new Trie(words);
        this.characterMapping = {}
        return this
    }
    addEdges(edges) {
        this.characterMapping = {}
        for (let i = 0; i < 4; i++) {
            for (const char of edges[i]) {
                this.characterMapping[char] = edges.reduce((acc, edge, index) => {
                    index !== i && acc.push(...edge)
                    return acc
                }, [])
            }
        }
    }
    solveFor(...edges) {
        edges = edges.map(edge => edge.split(''))
        this.addEdges(edges)
        const root = this.trie.root;
        const map = this.characterMapping
        let wordsFound = []
        for (const char in map) {
            wordsFound = wordsFound.concat(
                this.recursivelySearchWords(root.children[char], map[char], map)
            )
        }
        const characters = Object.keys(map).sort().join('')
        wordsFound = wordsFound.sort((a, b) => new Set(b).size - new Set(a).size)
        const pairs = this.findPairs(wordsFound).filter((wordPairs) => {
            const counter = {}
            for (let j = 0; j < wordPairs.length; j++) {
                const word = wordPairs[j]
                for (let i = 0; i < word.length; i++) {
                    if (j > 0 && i == 0) continue;
                    if (!counter[word[i]]) counter[word[i]] = 0
                    counter[word[i]] += 1
                }
            }
            for (let char of characters) {
                if (char in counter) {
                    counter[char]--
                } else {
                    return false
                }
                if (counter[char] == 0) delete counter[char]
            }
            return true
        })
        pairs.sort(([a1, a2], [b1, b2]) => {
            return (a1 + a2).length - (b1 + b2).length
        })
        return pairs
    }
    recursivelySearchWords(node, possibleNextChars, map) {
        let wordsFound = []
        if (node?.endOfWord) {
            wordsFound.push(node.endOfWord)
        }
        for (const nextChar of possibleNextChars) {
            const childNode = node?.children[nextChar];
            if (childNode) {
                wordsFound = wordsFound.concat(
                    this.recursivelySearchWords(childNode, map[nextChar], map)
                )
            }
        }
        return wordsFound
    }
    findPairs(array) {
        const pairs = [];
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array.length; j++) {
                if (i !== j && array[i].slice(-1)[0] === array[j][0]) {
                    pairs.push([array[i], array[j]])
                }
            }
        }
        return pairs
    }

}