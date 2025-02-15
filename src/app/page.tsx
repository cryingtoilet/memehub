import { Header } from "../components/Header";
import { MemeGrid } from "../components/MemeGrid";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <MemeGrid />
      </main>
    </div>
  );
}
