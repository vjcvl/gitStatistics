import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: null,
    status: '',
    type:''
}


const repoDetails = createSlice({
    name: 'repo',
    initialState,
    reducers: {
      update_repo: (state,action) => {
          state.value = action.payload
          state.status = "UPDATED"
        },
      update_type: (state,action) => {
          state.type = action.payload
        },
    }
  })
  
  export default repoDetails.reducer
  export const { update_type,update_repo } = repoDetails.actions