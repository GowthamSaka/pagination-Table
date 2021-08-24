import {Component} from 'react'

import ReactPaginate from 'react-paginate'

import ContactItem from './components/ContactItem'

import './App.css'

class App extends Component {
  state = {
    blogsData: [],
    searchInput: '',
    setPageNumber: 0,
    usersPerPage: 10,
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
    this.setState({
      blogsData: updatedData,
    })
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  deleteUser = id => {
    const {blogsData} = this.state
    const filteredUserData = blogsData.filter(each => each.id !== id)
    this.setState({
      blogsData: filteredUserData,
    })
  }

  changePage = ({selected}) => {
    const {setPageNumber} = this.state
    return setPageNumber(selected)
  }

  render() {
    const {searchInput, blogsData, usersPerPage} = this.state
    const searchResults = blogsData.filter(eachUser =>
      eachUser.name.toLowerCase().includes(searchInput.toLowerCase()),
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
          placeholder="search by name"
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
          <button className="button" type="button">
            Delete Multiple
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
