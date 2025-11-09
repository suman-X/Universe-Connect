import { Footer } from "@/components/ui/footer"

export default function FooterDemo() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content */}
      <div className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-center mb-4">
            Footer Component Demo
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Scroll down to see the footer in action
          </p>
          
          {/* Demo variants */}
          <div className="space-y-16">
            <div>
              <h2 className="text-2xl font-bold mb-4">Default Footer</h2>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <Footer variant="default" />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Minimal Footer</h2>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <Footer variant="minimal" />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Custom Styled Footer</h2>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <Footer 
                  variant="default" 
                  className="bg-gray-900 text-white border-gray-800"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actual footer for the page */}
      <Footer variant="default" />
    </div>
  )
}
