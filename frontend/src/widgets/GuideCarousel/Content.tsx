import { Button } from '@/components/Button'

interface ContentProps {
  onClick: () => void
}

export default function Content({ onClick }: ContentProps) {
  return (
    <>
      <img src="/pidor.png" className="aspect-[4/3] object-contain w-full" />
      <h2 className="text-4xl font-bold mt-5">Headning name</h2>
      <p className="text-sm mt-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto blanditiis deleniti necessitatibus ducimus nihil
        accusantium labore tempore quibusdam placeat totam aliquam sequi ab quo repudiandae quasi amet, illum facere
        ratione.
      </p>
      <Button className="self-end shadow-sm mt-10" variant="outline" onClick={onClick}>
        Continue
      </Button>
    </>
  )
}
