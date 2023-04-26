import React, { useEffect, useState } from 'react'
import { openSource, handleQueryUserSearch, fetchApi } from '../graphQl';
import { useSelector } from 'react-redux';
import star_svg from '../assets/star.svg'
const UserProfile = () => {
    const [data,setData] = useState(null)
    const [userRepo,setUserRepo] = useState([])
    const [repo,setRepo] = useState([])
    const login = openSource.githubUserName
    const [cardData,setCardData] = useState([]) 
    const repoDetails = useSelector(state => state.repo)
    const fetchUser = async() => {
        let query = handleQueryUserSearch(login,"USER")
        console.log(query)
        let response = await fetchApi(query)
        console.log(response)
        const {data:{data:{search:{edges}}}} = response
        setData(edges[0].node)
    }
    useEffect(()=>{
        fetchUser()
      },[])

      useEffect(()=>{
        setCardData([{label: 'Repositories',count: data?.repositories?.totalCount},
        {label:'Projects',count: data?.projects?.totalCount},
        {label:'Issues',count: data?.issues?.totalCount},
        {label:'Pull Requests',count: data?.pullRequests?.totalCount}])
        setUserRepo(data?.repositories?.nodes)
        console.log(data)
      },[data])

  useEffect(()=>{
    if(repoDetails.value !== null){
      if(repoDetails.type === "REPOSITORY"){
        console.log(repoDetails)
        const {value:{data:{search:node}}} = repoDetails
        if(node.edges.length > 0){
          setUserRepo([])
          setRepo(node.edges)
          console.log(node.edges)
        }
      }
      if(repoDetails.type === "USER"){
        const {value:{data:{search:node}}} = repoDetails
        setUserRepo([])
        setRepo(node.edges)
        console.log(node.edges)
      }
    }
},[repoDetails])
  return (
    <div className="container-fluid">
  <div className="row align-items-start justify-content-start py-4 px-4">
    <div className="col-lg-3 col-sm-12 px-1 py-3">
      <div className='text-center'>
      <img className="rounded-circle" src={data?.avatarUrl} height="200px"/>
      </div>
      <div className='pt-4 fs-4'>{data?.name}</div>
      <div className='pt-2 fs-6'>{data?.login}</div>
      <div className="row align-items-start py-4">
      <div className='col-4'>Followers:{data?.followers?.totalCount}</div>
      <div className='col-4'>Following:{data?.following?.totalCount}</div>
      </div>
    </div>
    <div className="col px-2 py-3">
      {/* card list */}
        <div className ='row align-items-start'>
          {cardData?.map((object,index)=>{
            return(
              <div className='col-lg-3 col-sm-6' key={index}>
            <div className="card">
              <div className="card-body">
              <h5 className="card-title">{object.label}</h5>
              <p className="card-text">{object.count}</p>
              </div>
            </div>  
        </div>
            )
          })}
  {/* repolist */}
     {userRepo?.length > 0  && <div className='row align-items-start justify-content-start pt-5 ms-2'>
      <div>User Repositories</div>
      {userRepo?.map((ele,index)=>{
        let ts = ele?.createdAt?.split("T")[0]
      return(
        <div key={index} className='col-10 my-3 border-bottom border-info-subtle rounded'>
         {ele.name?<div className='fs-6'>{ele.name}</div>:<div className='fs-6'>{ele.login}</div>}
         <div className='row align-items-start justify-content-between'>
         {ele.description?<p className='col-10 fs-12'>{ele.description}</p>:<p className='col-10 fs-12'>{ele.bio}</p>}
         {ele.stargazerCount?<p className='col-2'>
                <img src={star_svg} height="14px" className='pb-1'/> {ele.stargazerCount}
                </p>:<p className='col-2 fst-italic fs-6'><br/>
                <span className='fst-italic fs-12'>{ts}</span>
                </p>}
         </div>
        </div>
       )
        }) }
        </div>}    
        { repo.length > 0 &&
      <div className='row align-items-start justify-content-start pt-5 ms-2'>
        <div>Results</div>
      {repo?.map((ele,index)=>{
        let ts = ele?.node?.createdAt?.split("T")[0]
        return(
             <div key={index} className='col-10 my-3 border-bottom border-info-subtle rounded'>
              {ele.node.name?<div className='fs-6'>{ele.node.name}</div>:<div className='fs-6'>{ele.node.login}</div>}
              <div className='row align-items-start justify-content-between'>
              {ele.node.description?<p className='col-10 fs-12'>{ele.node.description}</p>:<p className='col-10 fs-12'>{ele.node.bio}</p>}
              {ele.node.stargazerCount?<p className='col-2'>
                <img src={star_svg} height="14px" className='pb-1'/> {ele.node.stargazerCount}
                </p>:<p className='col-2'> created at<br/>
                <span className='fst-italic fs-12'>{ts}</span>
                </p>}
              </div>
             </div>
            )
        }) }
        </div>}
        </div>
    </div>
  </div>
</div>
  )
}

export default UserProfile