"use client"
// import { BiCopy } from "react-icons/bi";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableRow,
} from "@/components/ui/table"

type ListViewProps = {
    results: Array<[string, string]>
}


// type CopyDivProps = {
//     word: string
// }

// function CopyDiv({ word }: CopyDivProps) {
//     return <div className="flex justify-space-between">
//         <div>{word}</div>
//         <BiCopy />
//     </div>
// }

export default function ListView({ results }: ListViewProps) {
    return (
        <div className="flex flex-col justify-center items-center gap-2 mt-3">
            {results.map(([word_1, word_2], index) =>
                <div className="flex gap-2 items-center justify-evenly w-[250px] text-md">
                    <div className="mr-2 w-[25px] font-lg">#{index + 1}</div>
                    <div className="word w-[100px] font-lg">{word_1}</div>
                    <div className="word w-[100px] font-lg">{word_2}</div>
                </div>
            )}
        </div>
        // <Table className="mb-20">
        //     <TableCaption>List of possible words</TableCaption>
        //     <TableBody>
        //         {results.map(([word1, word2]) =>
        //             <TableRow>
        //                 <TableCell className="font-medium">{word1}</TableCell>
        //                 <TableCell className="font-medium">{word2}</TableCell>
        //             </TableRow>
        //         )}
        //     </TableBody>
        // </Table>
    )
}