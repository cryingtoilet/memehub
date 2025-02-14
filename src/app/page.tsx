import { Header } from "../components/Header";
import { MemeGrid } from "../components/MemeGrid";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-4xl font-bold text-primary">Trending Memes</h1>
        <MemeGrid />
      </main>
    </div>
  );
}
