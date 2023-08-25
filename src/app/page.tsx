"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useState } from "react";
import ListView from "@/components/ui/listview";


const guardRails = z.string().max(3, {
  message: "Max of 3 Characters is allowed",
}).min(1, {
  message: "Atleast 1 character is required",
})

type InputType = 'top' | 'left' | 'right' | 'bottom';
type ResultsType = null | Array<[string, string]>

const formSchema = z.object({
  top: guardRails,
  left: guardRails,
  right: guardRails,
  bottom: guardRails
})

const flexCenter = `flex items-center justify-center `

export default function Home() {
  const [results, setResults] = useState<ResultsType>(null)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      top: "",
      left: "",
      right: "",
      bottom: ""
    },
  })
  const resultsId = 'results'
  const inputs: InputType[] = ['top', 'left', 'right', 'bottom']
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
    fetch('/api/solver', {
      method: 'POST',
      body: JSON.stringify(values)
    }).then(response => response.json())
      .then(json => {
        setResults(json)
        setTimeout(() => {
          const element = document.getElementById(resultsId);
          if (element) {
            window.scrollTo({
              top: element.offsetTop + element.offsetHeight,
              behavior: 'smooth'
            });
          }
        }, 0);
      })
  }
  return (
    <>
      <main className='mt-12'>
        <h1 className={`
      ${flexCenter}
      text-3xl md:text-3xl lg:text-5xl
      mb-4
      `}> Letter Box Solver </h1>
        <section className={`${flexCenter} mx-auto w-[100px] h-[100px] md:w-[200px] md:h-[200px]`}>
          <Link
            className={`h-[100%]`}
            href="https://www.nytimes.com/puzzles/letter-boxed">
            <Image
              src="https://www.nytimes.com/games-assets/v2/assets/expansion-games/letter-boxed-card-icon.svg"
              alt="Image"
              width={100}
              height={100}
              className="rounded-md object-cover w-[100px] h-[100px] md:w-[200px] md:h-[200px]" />
          </Link>
        </section>
        <section className={`px-8 mt-5`}>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}>
              <div className={`mb-5 flex flex-col justify-center items-center gap-5`}>
                {inputs.map(input =>
                  <FormField
                    key={input}
                    control={form.control}
                    name={input}
                    render={({ field }) => (
                      <FormItem className={`w-[100%] max-w-sm form-input`} >
                        <FormLabel className="flex justify-center w-[100%]">Letters on {input}</FormLabel>
                        <FormControl>
                          <Input
                            className={`text-slate-800 w-[100%]`}
                            placeholder={`Add letter on ${input}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
              <div className={`container flex flex-row flex-wrap justify-center form-input`}>
                <Button type="reset" className={"bg-slate-800 w-[100px]"} variant={"ghost"}>Clear</Button>
                <Button type="submit" className={"bg-slate-800 w-[100px]"} variant={"outline"}>Predict</Button>
              </div>
            </form>
          </Form>
        </section>
        <section id={resultsId} className={`px-8 mt-10 pb-[65px]`}>
          {Array.isArray(results) && (results.length > 0 ? <>
            <h1 className={`flex justify-center items-center text-2xl`}>Results:</h1>
            <ListView results={results} />
          </> : <h1 className={`flex justify-center items-center text-2xl`}>No Results Found</h1>)}
        </section>
      </main>
      <footer className={"footer flex flex-row gap-2 items-center h-[60px]"}>
        Made with
        <svg className="heart" viewBox="0 0 22 18" width={20} height={20} focusable="false">
          <path d="M15.5 6.44236e-08C14.6267 6.44236e-08 13.7655 0.203316 12.9844 0.593847C12.2034 0.984378 11.524 1.5514 11 2.25C10.2916 1.30553 9.30408 0.607875 8.17719 0.255861C7.0503 -0.096152 5.84122 -0.0846785 4.72122 0.288657C3.60121 0.661992 2.62707 1.37826 1.93676 2.336C1.24646 3.29375 0.875 4.44441 0.875 5.625C0.875 12.3656 10.2406 17.6812 10.6344 17.9062C10.7459 17.969 10.872 18.0013 11 18C11.1281 18.0022 11.2544 17.9698 11.3656 17.9062C13.0903 16.898 14.708 15.7169 16.1937 14.3812C19.4656 11.4375 21.125 8.49375 21.125 5.625C21.125 4.13316 20.5324 2.70242 19.4775 1.64752C18.4226 0.592632 16.9918 6.44236e-08 15.5 6.44236e-08Z" fill="#F47046"></path>
        </svg>
        by
        <Link
          className={'underline underline-offset-4'}
          href={"https://github.com/pranomvignesh"}>PranomVignesh</Link>
      </footer>
    </>
  )
}
