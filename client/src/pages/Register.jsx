import { useEffect } from "react";
import { useState } from "react";
import { Puff } from "react-loader-spinner";
import { useUser } from "../hooks/useUser";
import Error from "../components/Error";

const roles = ["admin", "user"];

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const { registerUser, isLoading, error } = useUser();

  const handleRegister = async (e) => {
    e.preventDefault();
    await registerUser({ username, password, role: selectedRole });
  };

  return (
    <div
      // className="bg-slate-800 text-white w-screen h-auto flex-1 p-4 flex flex-col justify-center items-center overflow-y-auto"
      className="bg-slate-800 text-white w-screen overflow-y-auto p-4 md:w-screen h-screen"
    >
      {error && <Error error={error} />}

      <h1 className="text-2xl font-bold my-3 text-center">Register</h1>
      <form className="flex flex-col gap-4 w-full md:w-1/3 md:mx-auto">
        {isLoading && (
          <div className="flex justify-center items-center">
            <Puff />
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label className="font-bold" htmlFor="name">
            Username
          </label>
          <input
            required
            value={username}
            className="bg-gray-900 py-2 px-4 outline-none border-none rounded-lg text-lg"
            type="text"
            placeholder="Enter the username of the user"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-bold" htmlFor="name">
            Password
          </label>
          <input
            required
            value={password}
            className="bg-gray-900 py-2 px-4 outline-none border-none rounded-lg text-lg"
            type="text"
            placeholder="Enter the password of the user"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-bold" htmlFor="type">
            Role
          </label>
          <select
            defaultValue={selectedRole}
            className="bg-gray-900 py-2 px-4 outline-none border-none rounded-lg text-lg"
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            {roles.map((role, index) => (
              <option key={index} value={role}>
                {role.toLocaleUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-sky-300 text-slate-900 font-bold py-3 px-4 my-2 outline-none border-none rounded-lg text-xl"
          onClick={handleRegister}
          disabled={isLoading}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
