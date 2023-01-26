import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const JumpForm = (props) => {
  const [id, setId] = useState("");
  const [jumpnum, setJumpnum] = useState("");
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");
  const [aircraft, setAircraft] = useState("");
  const [equipment, setEquipment] = useState("");
  const [altitude, setAltitude] = useState("");
  const [freefall, setFreefall] = useState("");
  const [description, setDescription] = useState("");
  const [jumps, setJumps] = useState([]);
  const [cw, setCw] = useState();
  const [user, token] = useAuth();

  const weatherForJump = `Temp:${props.weather.temperature} Wind Speed:${props.weather.windspeed} Wind Direction:${props.weather.winddirection}`;

  function handleSubmit(event) {
    event.preventDefault();
    console.log("weather", props.weather);
    setId(props.id);
    let newJump = {
      jumpnum: jumpnum,
      date: date,
      place: place,
      aircraft: aircraft,
      equipment: equipment,
      altitude: altitude,
      freefall: freefall,
      description: description,
      weather: weatherForJump,
      user: user,
    };
    console.log("object we arre trying to post", newJump);
    addNewJump(newJump);
    fetchJumps();
    window.location.reload();
  }

  useEffect(() => {
    fetchJumps();
  }, []);

  async function addNewJump(newJump) {
    await axios.post("http://127.0.0.1:8000/api/jump/", newJump, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log("New Jump", newJump);
  }

  async function fetchJumps() {
    let response = await axios.get("http://127.0.0.1:8000/api/jump/", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log("response from axios", response.data, props.weather);
    setJumps(response.data);
  }

  return (
    <div className="background-img">
      <form onSubmit={handleSubmit}>
        <div
          style={{
            color: "white",
            backgroundColor: "transparent",
            borderStyle: "solid",
            borderWidth: "2px",
            borderColor: "black",
            marginTop: "0rem",
            margin: "1em",
            borderRadius: ".75em",
            boxShadow: "10px 5px 5px #764134",
            opacity: "50%",
          }}
        >
          <input
            type="text"
            className="form-control"
            placeholder="Enter Jump Number"
            onChange={(event) => setJumpnum(event.target.value)}
          />
          <input
            type="date"
            className="form-control"
            placeholder="Enter Date"
            onChange={(event) => setDate(event.target.value)}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Enter Place"
            onChange={(event) => setPlace(event.target.value)}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Aircraft..."
            onChange={(event) => setAircraft(event.target.value)}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Equipment..."
            onChange={(event) => setEquipment(event.target.value)}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Altitude..."
            onChange={(event) => setAltitude(event.target.value)}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Freefall..."
            onChange={(event) => setFreefall(event.target.value)}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Jump Description..."
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-dark"
          style={{ "margin-left": "1em" }}
        >
          Log Jump
        </button>
        {/* <p>{jumps}</p> */}
      </form>
      <div class="container">
        <div class="row">
          <div class="col-12">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th className="font-link">Jump Number</th>
                  <th className="font-link">Date</th>
                  <th className="font-link">DropZone</th>
                  <th className="font-link">Aircraft</th>
                  <th className="font-link">Equipment</th>
                  <th className="font-link">Altitude</th>
                  <th className="font-link">Freefall</th>
                  <th className="font-link">Jump Description</th>
                  <th className="font-link">Jump Weather </th>
                </tr>
              </thead>
              <tbody>
                {jumps
                  .slice(0)
                  .reverse()
                  .map((el) => {
                    return (
                      <tr>
                        <th scope="row">1</th>
                        <td>{el.jumpnum}</td>
                        <td>{el.date}</td>
                        <td>{el.place}</td>
                        <td>{el.aircraft}</td>
                        <td>{el.equipment}</td>
                        <td>{el.altitude}</td>
                        <td>{el.freefall}</td>
                        <td>{el.description}</td>
                        <td>{el.weather}</td>
                        <td>
                          <button type="button" class="btn btn-primary">
                            <i class="far fa-eye"></i>
                          </button>
                          <button type="button" class="btn btn-success">
                            <i class="fas fa-edit"></i>
                          </button>
                          <button type="button" class="btn btn-danger">
                            <i class="far fa-trash-alt"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      ;
    </div>
  );
};

export default JumpForm;

// {jumps.slice(0).reverse().map(function(el){
//   return <div>
//     <p>{el.jumpnum}</p>
//     <p>{el.date}</p>
//     <p>{el.place}</p>
//     <p>{el.aircraft}</p>
//     <p>{el.equipment}</p>
//     <p>{el.altitude}</p>
//     <p>{el.freefall}</p>
//     <p>{el.description}</p>
//     <br></br>
//     </div>
// })}
