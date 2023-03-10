const Error = ({ error }) => {
  return (
    <div className="flex flex-col gap-4 w-full md:w-1/3 md:mx-auto">
      <p className="bg-red-100 text-red-900 p-4 text-center text-sm italic rounded-lg w-full my-10 mx-auto md:w-auto">
        {error}
      </p>
    </div>
  );
};

export default Error;
