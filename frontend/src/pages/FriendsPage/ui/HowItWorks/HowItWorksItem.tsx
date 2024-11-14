import Diamond from '@/icons/DiamondColor.svg'

export interface HowItWorksItemProps {
  heading: string
  desc: string
}

export default function HowItWorksItem({ heading, desc }: HowItWorksItemProps) {
  return (
    <li className="flex gap-4 items-start">
      <Diamond className="size-[1.625rem] min-w-[1.625rem]" />
      <div className="flex flex-col gap-1 font-semibold tracking-tight grow">
        <h3 className="text-[15px] ">{heading}</h3>
        <p className="text-foreground-8 text-[13px] leading-4">{desc}</p>
      </div>
    </li>
  )
}
