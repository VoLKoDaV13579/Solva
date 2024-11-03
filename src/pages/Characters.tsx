import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import { getCharacters } from '../utils/api'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCharacters, setPage } from '../store/slices/charactersSlice'
import CharactersTable from '../components/CharactersTable'


const Characters = () => {
    return (
        <div>
            <Nav />
            <CharactersTable />
        </div>
    )
}

export default Characters