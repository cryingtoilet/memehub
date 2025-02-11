import { Header } from "../../components/Header";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Search } from "lucide-react";

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-4xl font-bold text-primary">Search Memes</h1>
        <div className="mb-8 flex space-x-2">
          <Input
            type="text"
            placeholder="Search for memes..."
            className="flex-grow"
          />
          <Button type="submit" className="hover:bg-primary/90">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
        <p className="text-muted-foreground">
          Enter a search term to find memes.
        </p>
      </main>
    </div>
  );
}
