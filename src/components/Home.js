import React, { useEffect, useState } from "react";

const Home = (props) => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Loading state to manage data fetching
  const jobsPerPage = 5;

  useEffect(() => {
    // Fetch job data from the API
    fetch("https://jsonfakery.com/jobs")
      .then((response) => response.json())
      .then((data) => {
        setJobs(data);
        setFilteredJobs(data);
        setLoading(false); // Set loading to false after data is fetched
      });
  }, []);

  // Handle search term change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    filterJobs(e.target.value);
  };

  // Filter jobs based on search term
  const filterJobs = (search) => {
    let filtered = jobs;

    if (search) {
      filtered = filtered.filter((job) =>
        job.job_category.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredJobs(filtered);
  };

  // Pagination Logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <h1
        className="my-4"
        style={{ color: props.mode === "dark" ? "white" : "black" }}
      >
        Job Listings
      </h1>

      {/* Search Section */}
      <div className="row mb-4">
        <div className="col-md-6 d-flex">
          <input
            type="text"
            className="form-control"
            placeholder="Search by job title"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div
            className={`form-check m-3 form-switch text-${
              props.mode === "light" ? "grey" : "light"
            }`}
          >
            <input
              className="form-check-input"
              onClick={props.toggleMode}
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
              Mode
            </label>
          </div>
        </div>
      </div>

      {/* Display loading message while fetching */}
      {loading ? (
        <h2 >Loading...</h2>
      ) : currentJobs.length === 0 ? (
        <h2 style={{ justifyContent: "center", alignItems: "center",color: props.mode === "dark" ? "white" : "black" }}>
          Match Not Found
        </h2>
      ) : (
        <>
          {/* Job Listings Table */}
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>S. No.</th>
                <th>Position Title</th>
                <th>Company Name</th>
                <th>Location</th>
                <th>Job Type</th>
                <th>No. of Openings</th>
                <th>Salary</th>
                <th>Application Deadline</th>
              </tr>
            </thead>
            <tbody>
              {currentJobs.map((job, index) => (
                <tr
                  key={index}
                  className={props.mode === "light" ? "table-light" : "table-dark"}
                >
                  <td>{index + 1}</td>
                  <td>{job.job_category}</td>
                  <td>{job.company}</td>
                  <td>{job.location}</td>
                  <td>{job.employment_type}</td>
                  <td>{job.number_of_opening}</td>
                  <td>{job.salary_to}</td>
                  <td>{job.application_deadline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* Pagination */}
      <div className="mt-4">
        <button
          className="btn btn-secondary me-2"
          disabled={currentPage === 1}
          onClick={() => paginate(currentPage - 1)}
        >
          Previous
        </button>
        <button
          className="btn btn-secondary"
          disabled={currentPage === Math.ceil(filteredJobs.length / jobsPerPage)}
          onClick={() => paginate(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
