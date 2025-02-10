import { Header } from "../../components/Header"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { Textarea } from "~/components/ui/textarea"

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-primary mb-8">Upload a Meme</h1>
        <form className="space-y-4 max-w-md">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-foreground mb-1">
              Title
            </label>
            <Input id="title" type="text" placeholder="Enter meme title" />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-foreground mb-1">
              Image
            </label>
            <Input id="image" type="file" accept="image/*" />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-foreground mb-1">
              Description
            </label>
            <Textarea id="description" placeholder="Enter meme description" />
          </div>
          <Button type="submit" className="w-full hover:bg-primary/90">
            Upload Meme
          </Button>
        </form>
      </main>
    </div>
  )
}

