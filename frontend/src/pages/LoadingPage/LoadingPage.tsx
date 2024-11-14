import { LoadingBar } from '@/components/LoadingBar'

export default function LoadingPage() {
  return (
    <div
      style={{
        backgroundImage: 'url("loading-screen.png")',
      }}
      className="flex flex-col h-full overflow-hidden bg-cover justify-end gap-4 px-10 items-center pb-16"
    >
      <img src="/ton-coin.png" alt="ton coin" className="size-28" />
      <h1 className="text-white text-4xl font-bold text-center">CRYPTO WODY</h1>
      <p className="text-[#718BC3] text-xl font-medium">Based on TON</p>
      <LoadingBar />
    </div>
  )
}
