const UserCard = ({ user, onDelete }) => {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
        <div>
          <h3 className="font-medium">{user.name}</h3>
          <p className="text-sm text-gray-600">{user.email}</p>
          <span className={`text-xs px-2 py-1 rounded-full ${
            user.isAdmin ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {user.isAdmin ? 'Admin' : 'User'}
          </span>
        </div>
        <div className="space-x-2">
          <button className="text-sm bg-yellow-500 text-white px-2 py-1 rounded">
            Edit
          </button>
          <button 
            onClick={onDelete}
            className="text-sm bg-red-500 text-white px-2 py-1 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    );
  };
  
  export default UserCard;