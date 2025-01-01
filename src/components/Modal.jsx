import { useState } from 'react';

const Modal = ({ onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ username, password });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
      <div className="bg-white w-1/4 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4 font-medium">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded "
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-4 outline-none px-4 py-2 rounded bg-red-500 text-white hover:scale-105">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded outline-none hover:scale-105">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
