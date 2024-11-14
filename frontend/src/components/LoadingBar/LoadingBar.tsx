import { cva } from '@/lib/cva'

interface LoadingBarProps {
  classname?: string
}

const LoadingBar = ({ classname }: LoadingBarProps) => {
  return (
    <div className={cva('w-full h-2 bg-white/20 rounded-md overflow-hidden relative', classname)}>
      <div
        className="absolute h-full bg-blue-500 rounded-md animate-loading"
        style={{
          boxShadow: '0px 4px 22.9px 0px rgba(8, 166, 255, 0.53)',
        }}
      ></div>
    </div>
  )
}

export default LoadingBar
