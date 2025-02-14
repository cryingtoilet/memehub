import { Header } from "~/components/Header";
import { MemeCard } from "~/components/MemeCard";

// This would typically come from a database
const getMemeById = async (id: string) => {
  try {
    console.log("Fetching meme with ID:", id);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/memes`,
    );
    const memes = await response.json();
    console.log("Memes from API:", memes);
    // Convert the string id to a number for comparison
    const numericId = parseInt(id);
    const meme = memes.find((meme: any) => meme.id === numericId);
    console.log("Found meme:", meme);
    return meme;
  } catch (error) {
    console.error("Error fetching meme:", error);
    return null;
  }
};

export default async function MemePage({ params }: { params: { id: string } }) {
  const meme = await getMemeById(params.id);

  if (!meme) {
    return <div>Meme not found</div>;
  }

  // Create a new object without the onClick prop
  const { onClick, ...memeWithoutClick } = meme;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <MemeCard {...memeWithoutClick} />
      </main>
    </div>
  );
}
