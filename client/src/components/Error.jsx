const Error = ({ error }) => {
  return (
    <p className="bg-red-100 text-red-900 p-4 text-center text-sm italic rounded-lg w-screen my-10 mx-auto md:w-auto">
      {error}
    </p>
  );
};

export default Error;
