import { Header } from "../../components/Header"

export default function NotificationsPage() {
  const notifications = [
    { id: 1, message: "Your meme 'Funny Cat' got 100 likes!", time: "2 hours ago" },
    { id: 2, message: "@memeLord commented on your post", time: "1 day ago" },
    { id: 3, message: "Your meme 'Programming Joke' is trending!", time: "3 days ago" },
  ]

  return (
    <div className="min-h-screen bg-background justify-center">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-primary mb-8">Notifications</h1>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div key={notification.id} className="bg-card rounded-lg p-4 shadow">
              <p className="text-card-foreground">{notification.message}</p>
              <p className="text-muted-foreground text-sm mt-2">{notification.time}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

