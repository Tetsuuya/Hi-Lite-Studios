import { useEffect, useState, useCallback } from 'react'
// import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import MagazineCardSkeleton from '@/components/cards/MagazineCardSkeleton'
import MagazineFeatured from '@/components/sections/MagazineFeatured'
import MagazineGrid from '@/components/sections/MagazineGrid'
import MagazineSearchResults from '@/components/sections/MagazineSearchResults'
import StarBlack from '@/assets/images/StarBlack.png'
import { useMagazineStore } from '@/store/magazineStore'
// import BorderBlue from '@/assets/images/BorderBlue.png'

const Magazine = () => {
  // const navigate = useNavigate()
  
  // Zustand store
  const { items, loading, currentPage, totalPages, searchQuery, fetchItems, searchItems, setCurrentPage, setSearchQuery } = useMagazineStore()

  const [inputValue, setInputValue] = useState('')
  const [pinnedItem, setPinnedItem] = useState<any>(null)

  // Search only on Enter or button click
  const handleSearchSubmit = useCallback(async () => {
    if (inputValue.trim()) {
      setSearchQuery(inputValue)
      await searchItems(inputValue, 1)
    } else {
      setSearchQuery('')
      await fetchItems(1)
    }
  }, [inputValue, searchItems, fetchItems, setSearchQuery])

  // Handle typing - just update input, no search
  const handleInputChange = useCallback((value: string) => {
    setInputValue(value)
  }, [])

  // Handle Enter key
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchSubmit()
    }
  }, [handleSearchSubmit])



  // Fetch all items on mount
  useEffect(() => {
    fetchItems(1)
  }, [fetchItems])

  // Remove per-article effects from main listing page

  // Cache the pinned item when items first load
  useEffect(() => {
    if (!searchQuery && items.length > 0) {
      const pinned = items.find((item: any) => item.is_pinned)
      if (pinned) {
        setPinnedItem(pinned)
      }
    }
  }, [items, searchQuery])



  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
  }, [setCurrentPage])

  // Use cached pinned item, or find from current items
  const featuredItem = pinnedItem || (items.find((item: any) => item.is_pinned) || (items.length > 0 ? items[0] : null))
  // Grid items exclude the featured item
  const gridItems = items.filter((item: any) => item.id !== featuredItem?.id)

  return (
    <div className="page-fade min-h-screen bg-white py-8 sm:py-12 pb-24 sm:pb-50">
      <div className="flex w-full flex-col gap-8 sm:gap-12 px-4 sm:px-6 md:px-22">
        {/* Header with Title and Divider */}
        <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="flex items-center justify-center gap-1 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#333333] flex-wrap">
                <span>Hi‑Lite</span>
                <img
                  src={StarBlack}
                  alt="star-black"
                  className="inline-block h-[1em] w-[1em] align-middle"
                />
                <span>Magazine</span>
              </h1>

              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#444444] max-w-2xl px-2">
                A visual diary of shoots, ideas, and the creative journeys that shape our work.
              </p>
          <div className="relative w-full flex flex-col items-center pt-6 sm:pt-8">
            {/* Top line */}
            <div className="relative w-full mb-6 sm:mb-8">
              <div className="w-screen left-1/2 -translate-x-1/2 h-0.5 bg-black relative" />
              <img
                src={StarBlack}
                alt="star-black"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16"
              />
            </div>
          </div>
        </div>

            {loading && !pinnedItem ? (
              // Show skeleton loaders only during initial load (when no pinned item yet)
              <section className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 md:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <MagazineCardSkeleton key={`skeleton-${index}`} />
                ))}
              </section>
            ) : (
              <>
                {/* Featured Story Card - Isolated Component */}
                <MagazineFeatured pinnedItem={featuredItem} />

                {/* Search Bar and Grid Title */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 mt-4 sm:mt-6 px-2 sm:px-4">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#333333] italic">Latest Stories</h3>
                  <div className="w-full sm:w-64 relative">
                    <input
                      type="text"
                      placeholder="Search stories..."
                      value={inputValue}
                      onChange={(e) => handleInputChange(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base border-2 border-[#222222] rounded-full focus:outline-none focus:ring-2 focus:ring-[#c21205] focus:ring-offset-2"
                    />
                    <button
                      type="button"
                      onClick={handleSearchSubmit}
                      className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:text-[#333333] transition"
                    >
                      <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#666666]" />
                    </button>
                  </div>
                </div>

                {/* Grid Section */}
                {searchQuery ? (
                  // Show search results in isolated component
                  <MagazineSearchResults />
                ) : (
                  // Show regular grid in isolated component
                  <MagazineGrid gridItems={gridItems} />
                )}

                {/* Pagination */}
                {!searchQuery && totalPages > 1 && (
                  <div className="flex items-center justify-center gap-1 sm:gap-2 mt-6 sm:mt-8 flex-wrap px-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm border border-[#222222] rounded hover:bg-[#222222] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ← Prev
                    </button>
                    <div className="flex gap-0.5 sm:gap-1 flex-wrap justify-center">
                      {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => handlePageChange(i + 1)}
                          className={`px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm rounded ${currentPage === i + 1 ? 'bg-[#222222] text-white' : 'border border-[#222222] hover:bg-gray-100'}`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm border border-[#222222] rounded hover:bg-[#222222] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next →
                    </button>
                  </div>
                )}
              </>
            )}
      </div>
    </div>
  )
}

export default Magazine
