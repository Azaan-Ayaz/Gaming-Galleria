import React from 'react';

const CategoryForm = (props) => {
  const { handleSubmit, value, setValue } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-center mb-4">
        <input
        required
          type="text"
          className="form-control w-full border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
          placeholder="Enter new category"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <button
          type="submit"
          className="btn btn-primary mt-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-700 focus:outline-none"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
