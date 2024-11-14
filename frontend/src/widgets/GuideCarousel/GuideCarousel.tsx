import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { memo, useRef, useState } from 'react'
import Content from './Content'
import Pagination from './Pagination'

interface GuideCarouselProps {
  close: () => void
  open?: boolean
}

export default memo(function GuideCarousel({ close, open }: GuideCarouselProps) {
  const [slide, setSlide] = useState(0)
  const [swiper, setSwiper] = useState(null)

  const nextSlide = () => {
    swiper?.slideNext()
  }

  if (!open) return

  return (
    <div className="fixed top-0 left-0 size-full z-50 bg-overlay-1 appear">
      <Swiper
        slidesPerView={1}
        className="h-full"
        onSlideChange={(swiper) => {
          setSlide(swiper.realIndex)
        }}
        onSwiper={setSwiper}
      >
        <SwiperSlide className="flex flex-col pt-10 px-4">
          <Content onClick={nextSlide} />
        </SwiperSlide>
        <SwiperSlide className="flex flex-col pt-10 px-4">
          <Content onClick={nextSlide} />
        </SwiperSlide>
        <SwiperSlide className="flex flex-col pt-10 px-4">
          <Content onClick={nextSlide} />
        </SwiperSlide>
        <SwiperSlide className="flex flex-col pt-10 px-4">
          <Content onClick={close} />
        </SwiperSlide>
      </Swiper>
      <div className="flex gap-0.5 absolute bottom-32 left-4">
        <Pagination page={slide} total={4} />
      </div>
    </div>
  )
})
