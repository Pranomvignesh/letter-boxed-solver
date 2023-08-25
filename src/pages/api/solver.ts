// Imports
import { readFileSync } from "fs";
import { resolve } from "path";

import { LetterBoxFinder } from "@/lib/algorithm/classes/LetterBoxFinder";
import { NextApiRequest, NextApiResponse } from "next";

// Classes
const wordsData = readFileSync(resolve('./src/lib/algorithm/data/words.txt'), 'utf8')
const words = wordsData.split('\n').filter(word => word.trim())

const LetterBoxSolver = new LetterBoxFinder(words)

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    let results: any = [];
    try {
        const { top, left, right, bottom } = JSON.parse(req.body)
        results = LetterBoxSolver.solveFor(top, left, right, bottom)
        results = results.slice(0, 10)
        console.log(results)
        res.status(200).json(results)
    } catch (e) {
        res.status(500).json(results)
    }
}

export default handler