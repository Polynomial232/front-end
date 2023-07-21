import { useState } from "react"
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import LoginFrom from "./components/loginForm"
import ContactList from "./components/contactList"
import Search from "./components/search/search"

function App() {
    return (
        <>
            {/* <LoginFrom /> */}
            <Search />
        </>
    )
}

export default App
