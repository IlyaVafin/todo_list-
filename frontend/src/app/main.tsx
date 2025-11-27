import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter } from "react-router-dom"
import Layout from "../components/layout/Layout"
import App from "./App"
import AuthContextProvider from "@/shared/context/auth/AuthContextProvider"
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5,
			gcTime: 1000 * 60 * 5,
		},
	},
})
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<AuthContextProvider>
					<Layout>
						<App />
					</Layout>
				</AuthContextProvider>
			</QueryClientProvider>
		</BrowserRouter>
	</StrictMode>
)
