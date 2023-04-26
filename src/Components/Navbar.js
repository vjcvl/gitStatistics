import React, { useEffect, useState } from 'react'
import {  fetchApi, handleQueryUserSearch, handleSearch } from '../graphQl';
import { useDispatch, useSelector } from 'react-redux';
import { update_repo, update_type } from '../reducer/repoReducer';

const Navbar = () => {
  const [search,setSearch] = useState("")
  const repoState = useSelector(state => state.repo)
  const [data,setData] = useState({})
  const dispatch = useDispatch()
  const [type,setType] = useState("REPOSITORY")
  const handleFormSearch = async (event) =>{    
    event.preventDefault()
    let query
    if(type === "REPOSITORY"){
      query = handleSearch(search, type)
    }
    if(type === "USER"){
      query = handleQueryUserSearch(search, type)
    }
    let response = await fetchApi(query)
    setData(response.data)
    dispatch(update_repo(response.data))
    dispatch(update_type(type))
    console.log(repoState)
  }
  const handleChange = (event) => {
    setSearch(event.target.value)
  }
 const handleSelect = (event) => {
    setType(event.target.value)
 }


  return (
//     <nav className="navbar navbar-expand-lg navbar bg-dark" data-bs-theme="dark">
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand">Git Statistics</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    {/* <div class="collapse navbar-collapse" id="navbarSupportedContent"> */}
      
      <form className="d-flex" role="search" onSubmit={handleFormSearch}>
       <ul class="navbar-nav px-2">
      <select class="form-select" onChange={handleSelect} value={type} aria-label="Default select example" style={{width: '130px'}}>
  <option value="REPOSITORY" selected>Repository</option>
  <option value="USER">User</option>
</select>
      </ul>
         <input className="form-control me-2" type="search" placeholder="Search" value={search} onChange={handleChange} aria-label="Search"/>
         <button className="btn btn-outline-success" type="submit">Search</button>
       </form>
    </div>
  {/* </div> */}
</nav>
  )
}

export default Navbar