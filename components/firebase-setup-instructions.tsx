"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, ExternalLink } from "lucide-react"

export function FirebaseSetupInstructions() {
  return (
    <Card className="max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
          Firebase Setup Required
        </CardTitle>
        <CardDescription>Email/password authentication needs to be enabled in your Firebase project</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">To enable authentication:</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Go to the Firebase Console</li>
            <li>
              Select your project: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">movieapp-3c30b</code>
            </li>
            <li>Navigate to Authentication → Sign-in method</li>
            <li>Click on "Email/Password" provider</li>
            <li>Enable "Email/Password" authentication</li>
            <li>Save the changes</li>
          </ol>
        </div>

        <Button asChild className="w-full">
          <a
            href="https://console.firebase.google.com/project/movieapp-3c30b/authentication/providers"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            Open Firebase Console
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>

        <div className="text-sm text-muted-foreground">
          <p>
            <strong>Note:</strong> After enabling authentication, refresh this page and try registering again.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
