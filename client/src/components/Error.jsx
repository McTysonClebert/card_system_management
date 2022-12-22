const Error = ({ error }) => {
  return (
    <p className="bg-red-100 text-red-900 p-4 text-center text-sm italic rounded-lg w-screen my-10 md:w-1/3">
      {error}
    </p>
  );
};

export default Error;
