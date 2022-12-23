import { useEffect } from "react";
import { useState } from "react";
import { Puff } from "react-loader-spinner";
import { useUser } from "../hooks/useUser";
import Error from "../components/Error";
import { useUserContext } from "../context/UserContext";

const PasswordUpdate = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { updateUser, isLoading, error } = useUser();
  const { user } = useUserContext();

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    await updateUser({ token: user.token, oldPassword, newPassword });
  };

  return (
    <div className="bg-slate-800 text-white w-screen overflow-y-auto p-4 md:w-screen h-screen">
      {error && <Error error={error} />}

      <h1 className="text-2xl font-bold my-4 text-center">Update Password</h1>

      <form className="flex flex-col gap-4 w-full md:w-1/3 md:mx-auto">
        {isLoading && (
          <div className="flex justify-center items-center">
            <Puff />
          </div>
        )}

        <div className="flex flex-col gap-1">
          {/* TODO:Korije Name */}
          <label className="font-bold" htmlFor="name">
            Old Password
          </label>
          <input
            required
            value={oldPassword}
            className="bg-gray-900 py-2 px-4 outline-none border-none rounded-lg text-lg"
            type="text"
            placeholder="Enter your old password"
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-bold" htmlFor="name">
            New Password
          </label>
          <input
            required
            value={newPassword}
            className="bg-gray-900 py-2 px-4 outline-none border-none rounded-lg text-lg"
            type="text"
            placeholder="Enter your new password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-sky-300 text-slate-900 font-bold py-3 px-4 my-2 outline-none border-none rounded-lg text-xl"
          onClick={handlePasswordUpdate}
          disabled={isLoading}
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default PasswordUpdate;
