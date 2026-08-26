/**
 * Portfolio Command Center design reminder: a dark technical editorial shell
 * with calm signal hierarchy, project-led storytelling, and no generic chrome.
 */
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";

export default function App() {
  return (
    <ErrorBoundary>
      <TooltipProvider>
        <Home />
      </TooltipProvider>
    </ErrorBoundary>
  );
}
