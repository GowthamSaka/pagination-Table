import {Component} from 'react'

import ReactPaginate from 'react-paginate'

import ContactItem from './components/ContactItem'

import './App.css'

class App extends Component {
  state = {
    blogsData: [],
    searchInput: '',
    usersPerPage: 10,
    arrayId: [],
    paginatedData: [],
  }

  componentDidMount() {
    this.getUsersData()
  }

  getUsersData = async () => {
    const response = await fetch(
      ' https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json',
    )
    const data = await response.json()
    const updatedData = data.map(eachData => ({
      id: eachData.id,
      name: eachData.name,
      email: eachData.email,
      role: eachData.role,
    }))
    console.log(updatedData)
    this.setState({
      blogsData: updatedData,
      paginatedData: updatedData.slice(0, 10),
    })
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  deleteUser = id => {
    const {paginatedData} = this.state
    const filteredUserData = paginatedData.filter(each => each.id !== id)
    this.setState({
      paginatedData: filteredUserData,
    })
  }

  changePage = selectedPage => {
    const {blogsData} = this.state
    const {selected} = selectedPage
    const filteredData = blogsData.slice(selected * 10, selected * 10 + 10)
    this.setState({paginatedData: filteredData})
  }

  deleteMultipleUsers = id => {
    const {paginatedData, arrayId} = this.state
    return paginatedData.forEach(data => {
      if (data.selected) {
        arrayId.push(data.id)
        const filteredDataList = paginatedData.filter(each => each.id !== id)
        this.setState({arrayId: filteredDataList})
      }
    })
  }

  render() {
    const {searchInput, paginatedData, blogsData, usersPerPage} = this.state
    const searchResults = paginatedData.filter(
      eachUser =>
        eachUser.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        eachUser.email.toLowerCase().includes(searchInput.toLowerCase()) ||
        eachUser.role.toLowerCase().includes(searchInput.toLowerCase()),
    )

    const pageCount = Math.ceil(blogsData.length / usersPerPage)

    return (
      <div className="app-container">
        <h1 className="heading">Users Data</h1>
        <input
          type="search"
          className="search-input"
          value={searchInput}
          onChange={this.onChangeSearchInput}
          placeholder="search by name or email or role"
        />
        <div className="table-container">
          <p className="caption-names">Check Box</p>
          <p className="caption-names">Name</p>
          <p className="caption-names">Email</p>
          <p className="caption-names role">Role</p>
          <p className="caption-names">Actions</p>
        </div>
        <ul className="users-list-container">
          {searchResults.map(eachUser => (
            <ContactItem
              key={eachUser.id}
              userDetails={eachUser}
              deleteUser={this.deleteUser}
            />
          ))}
        </ul>
        <div className="pagination-container">
          <button
            className="button"
            type="button"
            onClick={this.deleteMultipleUsers()}
          >
            Delete Selected
          </button>
          <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            pageCount={pageCount}
            onPageChange={this.changePage}
            containerClassName="paginationBttns"
            nextLinkClassName="nxtBttn"
            disabledClassName="paginationDisabled"
            activeClassName="paginationActive"
          />
        </div>
      </div>
    )
  }
}

export default App
