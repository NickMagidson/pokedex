"use client"
import Image from "next/image"
import { motion } from "motion/react"
import {
  Card,
  CardContent,
  // CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function PokemonDisplayCard({ name, sprite, id, altText }: { name: string, sprite: string, id: number, altText: string }) {
  return (
    <motion.div
    key={name}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ duration: 0.3 }}
    variants={{
      visible: { opacity: 1, scale: 1 },
      hidden: { opacity: 0, scale: 0 }
    }}
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.8 }}
    onClick={() => console.log(name)}
  >
    <Card className="flex flex-col justify-center w-auto shadow-md">
      <CardHeader className='flex flex-row justify-end p-0 pt-1 pe-2'>
        <CardTitle className='font-thin'>{id}</CardTitle>
      </CardHeader>
      <CardContent className='p-0'>
        <Image className='mx-auto pb-1' src={sprite} width={70} height={70} alt={altText} />
        {/* <CardDescription>
          <p>HP: {pokemon.stats[0].base_stat}</p>
          <p>Attack: {pokemon.stats[1].base_stat}</p>
          <p>Defense: {pokemon.stats[2].base_stat}</p>
        </CardDescription> */}
      </CardContent>
      <CardFooter className='p-0 pb-1 pt-1 rounded-lg bg-gray-100'>
        <CardTitle className='mx-auto font-normal'>{name}</CardTitle>
      </CardFooter>
    </Card>
  </motion.div>
  )
}