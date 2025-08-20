import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Edit3, 
  Save, 
  Eye, 
  UserCheck, 
  Zap, 
  ArrowRight,
  CheckCircle 
} from "lucide-react";

export default function EditingDemo() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl text-center">
              🎯 Universal Inline Editing System Demo
            </CardTitle>
            <p className="text-center text-gray-600">
              Edit any page content directly on live website pages with role-based access control
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* How It Works */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-bold text-blue-800 mb-4">✨ How Universal Editing Works:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-500 text-white rounded-full p-1">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800">Role-Based Access</h4>
                    <p className="text-sm text-blue-600">Only admin and editor users see edit controls</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-500 text-white rounded-full p-1">
                    <Edit3 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800">Hover to Edit</h4>
                    <p className="text-sm text-blue-600">Hover over content to reveal edit buttons</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-500 text-white rounded-full p-1">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800">Rich Text Editing</h4>
                    <p className="text-sm text-blue-600">Full formatting controls with live preview</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-500 text-white rounded-full p-1">
                    <Save className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800">Instant Save</h4>
                    <p className="text-sm text-blue-600">Changes save immediately to database</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Editable Page Types */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-green-200">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-green-700">
                    <Edit3 className="w-5 h-5 mr-2" />
                    Service Pages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    Edit main service category titles, descriptions, and content
                  </p>
                  <Badge variant="secondary" className="mb-2">Titles</Badge>
                  <Badge variant="secondary" className="mb-2">Descriptions</Badge>
                  <Badge variant="secondary" className="mb-2">Rich Content</Badge>
                  <Link href="/services/website-development">
                    <Button variant="outline" size="sm" className="w-full mt-2">
                      Try Editing Service Page
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-purple-200">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-purple-700">
                    <Edit3 className="w-5 h-5 mr-2" />
                    Sub-Service Pages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    Edit detailed sub-service information and specifications
                  </p>
                  <Badge variant="secondary" className="mb-2">Feature Lists</Badge>
                  <Badge variant="secondary" className="mb-2">Pricing Info</Badge>
                  <Badge variant="secondary" className="mb-2">Benefits</Badge>
                  <Link href="/services/website-development/ui-ux-design">
                    <Button variant="outline" size="sm" className="w-full mt-2">
                      Try Editing Sub-Service
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-orange-200">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-orange-700">
                    <Edit3 className="w-5 h-5 mr-2" />
                    Feature Pages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    Edit detailed feature descriptions and technical specs
                  </p>
                  <Badge variant="secondary" className="mb-2">Tech Specs</Badge>
                  <Badge variant="secondary" className="mb-2">Use Cases</Badge>
                  <Badge variant="secondary" className="mb-2">Examples</Badge>
                  <Link href="/services/website-development/ui-ux-design/wireframing-prototyping">
                    <Button variant="outline" size="sm" className="w-full mt-2">
                      Try Editing Feature Page
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Rich Text Features */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h3 className="font-bold text-purple-800 mb-4">📝 Rich Text Editor Features:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="flex items-center text-purple-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">Bold / Italic</span>
                </div>
                <div className="flex items-center text-purple-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">Bullet Lists</span>
                </div>
                <div className="flex items-center text-purple-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">Numbered Lists</span>
                </div>
                <div className="flex items-center text-purple-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">Links</span>
                </div>
                <div className="flex items-center text-purple-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">Images</span>
                </div>
                <div className="flex items-center text-purple-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">Live Preview</span>
                </div>
                <div className="flex items-center text-purple-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">Instant Save</span>
                </div>
                <div className="flex items-center text-purple-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">Undo/Cancel</span>
                </div>
              </div>
            </div>

            {/* Edit Mode Toggle */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="font-bold text-yellow-800 mb-3">🎛️ Edit Mode Toggle:</h3>
              <p className="text-yellow-700 mb-3">
                Look for the floating <Button size="sm" className="mx-1"><Eye className="w-3 h-3 mr-1" />Edit Page</Button> button on any service page (bottom-right corner)
              </p>
              <p className="text-sm text-yellow-600">
                This button only appears for admin and editor users and allows easy switching between view and edit modes.
              </p>
            </div>

            {/* Try It Out */}
            <div className="text-center bg-gray-100 rounded-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4">🚀 Ready to Try Universal Editing?</h3>
              <p className="text-gray-600 mb-4">
                Visit any service page and see the inline editing in action!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/services/website-development">
                  <Button className="w-full sm:w-auto">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Website Development Page
                  </Button>
                </Link>
                <Link href="/services/web-hosting">
                  <Button variant="outline" className="w-full sm:w-auto">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Web Hosting Page
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}