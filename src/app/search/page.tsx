import { Header } from "~/components/Header";
import { MemeGrid } from "~/components/MemeGrid";

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <div className="group relative overflow-hidden rounded-xl bg-neutral-900/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neutral-950/90" />
            <div className="relative space-y-6 p-6">
              {/* Search Input */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <input
                  type="text"
                  placeholder="Search memes..."
                  className="flex-1 rounded-lg bg-white/5 px-4 py-3 text-base text-white/90 placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                />
                <button className="rounded-lg bg-orange-500 px-6 py-3 font-medium text-white transition-all hover:bg-orange-400">
                  Search
                </button>
              </div>

              {/* Filters */}
              <div className="space-y-4">
                <h2 className="text-lg font-medium text-white/90">Filters</h2>
                <div className="flex flex-wrap gap-3">
                  <select className="rounded-lg bg-white/5 px-4 py-2 text-sm text-white/75 focus:outline-none focus:ring-2 focus:ring-orange-500/50">
                    <option value="">Sort by</option>
                    <option value="latest">Latest</option>
                    <option value="popular">Most Popular</option>
                    <option value="trending">Trending</option>
                  </select>
                  <select className="rounded-lg bg-white/5 px-4 py-2 text-sm text-white/75 focus:outline-none focus:ring-2 focus:ring-orange-500/50">
                    <option value="">Category</option>
                    <option value="funny">Funny</option>
                    <option value="animals">Animals</option>
                    <option value="gaming">Gaming</option>
                  </select>
                </div>
              </div>

              {/* Popular Tags */}
              <div className="space-y-3">
                <h2 className="text-lg font-medium text-white/90">
                  Popular Tags
                </h2>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Funny",
                    "Cats",
                    "Dogs",
                    "Programming",
                    "Gaming",
                    "Memes",
                    "Trending",
                    "Anime",
                    "Sports",
                  ].map((tag) => (
                    <button
                      key={tag}
                      className="rounded-lg bg-white/5 px-3 py-1.5 text-sm text-white/75 transition-all hover:bg-white/10 hover:text-orange-500"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-medium text-white/90">
              Search Results
            </h2>
            <p className="text-sm text-white/50">
              Showing a hardcoded number like 12 results
            </p>
          </div>
          <MemeGrid />
        </div>
      </main>
    </div>
  );
}
