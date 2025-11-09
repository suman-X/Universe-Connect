import * as React from "react"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "default" | "minimal"
}

const Footer = React.forwardRef<HTMLElement, FooterProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <footer
        ref={ref}
        className={cn(
          "w-full border-t bg-background",
          variant === "minimal" ? "py-6" : "py-12",
          className
        )}
        {...props}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {variant === "default" ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand Section */}
              <div className="col-span-1 md:col-span-2">
                <h3 className="text-xl font-bold text-blue-600 mb-4">
                  UniVerse Connect
                </h3>
                <p className="text-gray-600 mb-4 max-w-md">
                  Connecting students worldwide through hackathons, events, and AI-powered team building.
                </p>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="/explore"
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      Explore Events
                    </a>
                  </li>
                  <li>
                    <a
                      href="/team-builder"
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      Team Builder
                    </a>
                  </li>
                  <li>
                    <a
                      href="/global-network"
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      Global Network
                    </a>
                  </li>
                  <li>
                    <a
                      href="/profile"
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      My Profile
                    </a>
                  </li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      API Reference
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      Community
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      Support
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          ) : null}

          {/* Bottom Bar */}
          <div
            className={cn(
              "flex flex-col md:flex-row justify-between items-center",
              variant === "default" ? "mt-8 pt-8 border-t" : ""
            )}
          >
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} UniVerse Connect. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    )
  }
)
Footer.displayName = "Footer"

export { Footer }
