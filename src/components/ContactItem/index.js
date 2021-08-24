import './index.css'

const ContactItem = props => {
  const {userDetails, deleteUser} = props
  const {name, email, role, id} = userDetails

  const onDelete = () => {
    deleteUser(id)
  }

  return (
    <li className="table-cell">
      <div className="box">
        <input type="checkbox" />
      </div>
      <div className="box">
        <p className="captions">{name}</p>
      </div>
      <div className="box">
        <p className="captions">{email}</p>
      </div>
      <div className="box">
        <p className="captions">{role}</p>
      </div>
      <div className="box icon">
        <button className="buttons" type="button">
          <img
            src="https://img.icons8.com/ios/50/000000/edit-file.png"
            alt="edit-icon"
            className="edit-icon"
          />
        </button>
        <button className="buttons" onClick={onDelete} type="button">
          <img
            src="https://img.icons8.com/material-rounded/24/000000/delete-trash.png"
            alt="delete"
            className="delete-icon"
          />
        </button>
      </div>
    </li>
  )
}

export default ContactItem
