import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const ViewJumps = (props) => {
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
  



  useEffect(() => {
    fetchJumps();
  }, []);


  async function fetchJumps() {
    let response = await axios.get("http://127.0.0.1:8000/api/jump/all/");
    console.log("response from axios", response.data);
    setJumps(response.data);
  }

  return (  
        <div className="background-img">
        <h1 className="font-link title" style={{"margin-left": "7em"}}>Logged Jumps</h1>
        <div className="searched-chart">
          <table className="table table-striped">
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
                    <tr key={el.id}>                   
                      <td>{el.id}</td>
                      <td>{el.date}</td>
                      <td>{el.place}</td>
                      <td>{el.aircraft}</td>
                      <td>{el.equipment}</td>
                      <td>{el.altitude}</td>
                      <td>{el.freefall}</td>
                      <td>{el.description}</td>               
                      <td>{el.weather}</td>         
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>    
  );
};

export default ViewJumps;