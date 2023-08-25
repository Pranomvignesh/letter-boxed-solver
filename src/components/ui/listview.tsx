"use client"
type ListViewProps = {
    results: Array<[string, string]>
}

export default function ListView({ results }: ListViewProps) {
    return (
        <div className="flex flex-col justify-center items-center gap-2 mt-3">
            {results.map(([word_1, word_2], index) =>
                <div key={index} className="flex gap-2 items-center justify-evenly w-[250px] text-md">
                    <div className="mr-2 w-[25px] font-lg">#{index + 1}</div>
                    <div className="word w-[100px] font-lg">{word_1}</div>
                    <div className="word w-[100px] font-lg">{word_2}</div>
                </div>
            )}
        </div>
    )
}