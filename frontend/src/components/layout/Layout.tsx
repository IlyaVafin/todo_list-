import type { ReactNode } from "react"
import Header from "../header/Header"
import s from "./Layout.module.css"
const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<div className={s.containerMain}>
			<Header />
			<main>{children}</main>
		</div>
	)
}

export default Layout
