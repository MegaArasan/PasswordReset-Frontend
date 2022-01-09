import { useParams } from "react-router-dom";
import { API_URL } from "./globalconstant.js";

export function Changepass() {
  const { id } = useParams();
  // console.log(id);
  return id ? <Updatepassword id={id} /> : null;
}
// updatpassword
function Updatepassword({ id }) {
  // const { history } = useHistory();
  // console.log(id);
  const Result = (id) => {
    fetch(`${API_URL}/forgotpassword/verify`, {
      method: "GET",
      headers: { "x-auth-token": id },
    })
      .then((response) => {
        const Status = response.status;
        return Status;
      })
      .then((Status) =>
        Status === 200
          ? window.location.replace(`/resetpassword/${id}`)
          : alert("Please enter the registered email")
      );
  };

  Result(id);

  // Loading Page
  return (
    <div className="loader-container">
      <div className="box-loader">
        <img
          src="https://c.tenor.com/28DFFVtvNqYAAAAC/loading.gif"
          alt="loading"
          className="Loading"
        />
      </div>
    </div>
  );
}
