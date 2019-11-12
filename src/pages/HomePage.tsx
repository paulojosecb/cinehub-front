import React from 'react'

import ApiManager from '../services/ApiManager'

const HomePage: React.FC = () => {
  const apiManager = new ApiManager()
  apiManager.fetchUsers()
  return <div className="App">Home</div>
}

export default HomePage
