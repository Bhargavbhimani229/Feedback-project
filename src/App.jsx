import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

function App() {
  const [hover, setHover] = useState(0);
  const [star, setStar] = useState(0);
  const [feedback, setFeedback] = useState({});
  const [list, setList] = useState([]);

  const handleHover = (index) => {
    setHover(index);
    if (star !== 0) {
      setStar(0);
    }
  };

  const handleLeave = (index) => {
    setHover(0);
    setStar(index);
  };

  const handleDown = (index) => {
    setStar(index);
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFeedback({});
    setList([...list, { ...feedback, star: star }]);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-4">
              <h3 className="text-center mb-4 text-dark">Feedback Form</h3>
              <form onSubmit={handleSubmit}>
                <div className="text-center mb-3">
                  {[...Array(5).keys()].map((_, index) => (
                    <FaStar
                      key={index}
                      onMouseOver={() => handleHover(index + 1)}
                      onMouseLeave={() => handleLeave(index + 1)}
                      onMouseDown={() => handleDown(index + 1)}
                      color={hover > index || star > index ? 'gold' : 'lightgray'}
                      size={'32px'}
                      style={{ marginRight: '6px', cursor: 'pointer' }}
                    />
                  ))}
                </div>

                <div className="mb-3">
                  <textarea
                    name="message"
                    className="form-control form-control-lg"
                    placeholder="Write your feedback..."
                    value={feedback.message || ''}
                    onChange={handleChange}
                    rows="4"
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-100 fw-bold">
                  Submit Feedback
                </button>
              </form>
            </div>
          </div>

          {list.length > 0 && (
            <div className="card mt-5 shadow-sm">
              <div className="card-header bg-primary text-white text-center fw-bold">
                Submitted Feedbacks
              </div>
              <div className="table-responsive">
                <table className="table table-hover mb-0 text-center">
                  <thead className="table-light">
                    <tr>
                      <th>No</th>
                      <th>Message</th>
                      <th>Stars</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((val, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{val.message}</td>
                        <td>
                          {[...Array(5).keys()].map((_, i) => (
                            <FaStar
                              key={i}
                              color={val.star > i ? 'gold' : 'lightgray'}
                              size={'20px'}
                            />
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
