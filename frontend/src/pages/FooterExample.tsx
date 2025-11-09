import { Footer } from '../components/ui/footer';

const FooterExample = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
            Footer Component Integration ✅
          </h1>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              🎉 Setup Complete!
            </h2>
            <p className="text-gray-600 mb-4">
              Your Universe Connect project now has:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
              <li>✅ TypeScript support (.tsx files)</li>
              <li>✅ shadcn/ui component structure</li>
              <li>✅ Path aliases (@/ imports)</li>
              <li>✅ Tailwind CSS with design tokens</li>
              <li>✅ lucide-react icons</li>
              <li>✅ Footer component with 2 variants</li>
            </ul>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">
                📁 New Directory Structure:
              </h3>
              <pre className="text-sm text-blue-800 overflow-x-auto">
{`frontend/
├── src/
│   ├── components/
│   │   ├── ui/              ← shadcn/ui components
│   │   │   ├── footer.tsx   ← Your new footer
│   │   │   └── index.ts
│   │   └── blocks/          ← Demo components
│   │       └── footer-demo.tsx
│   └── lib/
│       └── utils.ts         ← cn() utility`}
              </pre>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">
                🚀 How to Use:
              </h3>
              <pre className="text-sm text-green-800 overflow-x-auto">
{`import { Footer } from "@/components/ui/footer"

// Default footer
<Footer variant="default" />

// Minimal footer
<Footer variant="minimal" />

// Custom styled
<Footer className="bg-gray-900 text-white" />`}
              </pre>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Default Footer Preview</h2>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <Footer variant="default" />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Minimal Footer Preview</h2>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <Footer variant="minimal" />
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <a
              href="/dashboard"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Back to Dashboard
            </a>
          </div>
        </div>
      </div>

      {/* Page footer */}
      <Footer variant="default" />
    </div>
  );
};

export default FooterExample;
