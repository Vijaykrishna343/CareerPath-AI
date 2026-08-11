import { Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Career Explorer</h3>
            <p className="text-muted-foreground">
              Discover your perfect career path with our comprehensive industry guides and job roadmaps.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Career Resources
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Education Guides
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Vijaykrishna343/CarrerPath-AI"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  View on GitHub
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Stay Connected</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to our newsletter for the latest career insights and opportunities.
            </p>
            <div className="flex gap-2">
              <input type="email" placeholder="Your email" className="px-3 py-2 rounded-md border bg-background" />
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md">Subscribe</button>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Career Explorer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
