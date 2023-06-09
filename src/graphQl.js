import axios from "axios";


export const openSource = {
  githubConvertedToken: "ghp_mFdRf2J2ku3bKkUt=JUXSI60mvrUym53O6zh8",
  githubUserName: "vjcvl",
};

  export const handleQueryUserSearch = (value,type) => {
	return{
		query: `query MyQuery {
			search(query: "${value}", type: ${type}, first: 10) {
			  edges {
				node {
				  ... on User {
					id
					email
					name
					bio
					bioHTML
					createdAt
					login
					avatarUrl
					repositories(first: 10, orderBy: {field: UPDATED_AT, direction: DESC}) {
					  totalCount
					  nodes {
						stargazerCount
						name
						nameWithOwner
						languages(first: 4) {
						  edges {
							node {
							  id
							}
						  }
						}
						description
					  }
					}
					followers {
					  totalCount
					}
					following {
					  totalCount
					}
					projects {
					  totalCount
					}
					issues {
						totalCount
					}
					pullRequests {
					  totalCount
					}
				  }
				}
			  }
			}
		  }`
   }
  }

  export const handleSearch = (value,type)=>{
	return{
		query:`query MyQuery {
			search(query: "${value}", type: ${type}, first: 10) {
			  edges {
				node {
				  ... on Repository {
					nameWithOwner
					description
					createdAt
					stargazerCount
					resourcePath
					languages(first: 5) {
					  edges {
						node {
						  name
						}
					  }
					}
					name
				  }
				}
			  }
			}
		  }`
}
  }
export const baseUrl = "https://api.github.com/graphql";
let token = openSource.githubConvertedToken.split("=").join('')
console.log(token)
export const headers = {
  "Content-Type": "application/json",
  Authorization: "bearer " + token,
};

export const fetchApi = async(query) => {
	try {
		let response = await axios.post(`${baseUrl}`,JSON.stringify(query),{headers});
		return response
	} catch (error) {
		return error
	}
}
