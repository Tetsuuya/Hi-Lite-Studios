import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import MagazineCard from '@/components/cards/MagazineCard'
import MagazineCardSkeleton from '@/components/cards/MagazineCardSkeleton'
import { useMagazineStore } from '@/store/magazineStore'
import { useIntersectionObserver } from '@/utils/useIntersectionObserver'

const MagazineSection = () => {
  const { items, loading, fetchItems } = useMagazineStore()
  const navigate = useNavigate()
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 })

  // Only fetch once when section becomes visible and items are empty
  useEffect(() => {
    if (isVisible && items.length === 0) {
      fetchItems()
    }
  }, [isVisible, items.length])

  const previews = items.slice(0, 3)

  return (
    <section ref={ref} id="magazine" className="relative bg-white px-4 sm:px-6 md:px-8 py-8 sm:py-12 overflow-hidden">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 sm:gap-10">
        <header className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-[#333333]">
              Hi‑Lite: <span className="font-extrabold">Magazine</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm md:text-base lg:text-lg italic text-[#333333]">
              A space for stories, snapshots, and the art behind every frame.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/magazine')}
            className="mt-3 sm:mt-5 mb-2 sm:mb-6 rounded-ee-2xl rounded-tl-2xl bg-[#333333] px-8 sm:px-12 md:px-16 py-2 sm:py-3 text-base sm:text-lg md:text-xl font-semibold text-white shadow-md transition hover:bg-[#444444] hover:shadow-[0_0_25px_rgba(51,51,51,0.35)] hover:scale-[1.02]"
          >
            Read More
            <span className="text-lg sm:text-xl md:text-2xl ml-2 sm:ml-4">→</span>
          </button>
        </header>

        <div className="grid gap-4 sm:gap-6 md:gap-10 grid-cols-1 md:grid-cols-3">
          {loading ? (
            // Show skeleton loaders while loading
            Array.from({ length: 3 }).map((_, index) => (
              <MagazineCardSkeleton key={`skeleton-${index}`} />
            ))
          ) : (
            previews.map((item) => (
              <MagazineCard
                key={item.id}
                title={item.title}
                image={item.cover_image || ''}
                excerpt={item.excerpt || ''}
                onClick={() => navigate(`/magazine/${item.id}`)}
              />
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default MagazineSection

