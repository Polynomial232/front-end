import React, { useRef, useState } from "react"
import ContactList from "../contactList"

function Search() {
    const childFunc = useRef(null)

    return (
        <>
            <input
                type="text"
                id="searchEmail"
                placeholder="email"
                onChange={(e) =>
                    childFunc.searchUpdate({ email: e.target.value })
                }
            />
            <ContactList childFunc={childFunc} />
        </>
    )
}

export default Search
