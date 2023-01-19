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
  const [user, token] = useAuth();

  function handleSubmit(event) {
    event.preventDefault();
    setId(props.id);
    let newJump = {
      id: props.id,
      jumpnum: jumpnum,
      date: date,
      place: place,
      aircraft: aircraft,
      equipment: equipment,
      altitude: altitude,
      freefall: freefall,
      description: description,
      user_id: user.id,
    };
    console.log(newJump);
    addNewJump(newJump);
  }

  useEffect(() => {
    fetchJumps();
  }, [])

  async function addNewJump(newJump) {
    await axios.post("http://127.0.0.1:8000/api/jump/", newJump, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log("New Jump", newJump)
    console.log("test", props.jump.aircraft)
  }

  async function fetchJumps() {
    let response = await axios.get("http://127.0.0.1:8000/api/jump/all/");
    console.log("response from axios", response.data)
    setJumps(response.data);
  }

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <div
        style={{
          color: "white",
          backgroundColor: "#764134",
          borderStyle: "solid",
          borderWidth: "2px",
          borderColor: "black",
          margin: "1em",
          borderRadius: ".75em",
          boxShadow: "10px 5px 5px #764134",
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
      <button type="submit" className="btn btn-dark">
        Log Jump
      </button>
      {/* <p>{jumps}</p> */}
    </form>
    {jumps.map(function(el){
      return <div>
        <p>{el.jumpnum}</p>
        <p>{el.date}</p>
        <p>{el.place}</p>
        <p>{el.aircraft}</p>
        <p>{el.equipment}</p>
        <p>{el.altitude}</p>
        <p>{el.freefall}</p>
        <p>{el.description}</p>
        <br></br>
        </div>
    })}
   
    </div>
  );
};

export default JumpForm;
