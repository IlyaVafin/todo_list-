import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"

import { BrowserRouter } from "react-router-dom"
import App from "./App"
import Layout from "../components/layout/Layout"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
const queryClient = new QueryClient()
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<Layout>
					<App />
				</Layout>
			</QueryClientProvider>
		</BrowserRouter>
	</StrictMode>
)
