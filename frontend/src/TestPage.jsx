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
</div>;




// ! Code for returning places near you
// const [searchBox,setSearchBox] = useState()
// function onLoadSeachBox(ref){
//     setSearchBox(ref)
   
//     let service = new window.google.maps.places.PlacesService(document.getElementById('example'))
//     service.textSearch({location:'pyrmont', radius: '500', query:'restaurant'},callback)
   
    
// }
// function callback(results, status) {
//     if (status === window.google.maps.places.PlacesServiceStatus.OK) {
//       for (var i = 0; i < results.length; i++) {
//         var place = results[i];
        
//       }
//     }
//     else{
//         console.log
//        ("Naw")
//     }
//   }
// function onPlacesChanged(){   
//     console.log(dz)
//     console.log(searchBox.getPlaces())
// }





      {editId ? (
        <div>
        <JumpEditForm
          editId={editId}
          setIdOfEdit={setIdOfEdit}
          fetchJumps={fetchJumps}
          elementToEdit={editId}
        ></JumpEditForm>        
        <button style={{marginLeft: "1rem"}} className="btn btn-dark" onClick={()=>setIdOfEdit(null)}>Close</button>
        </div>

      ) : (
        <div className="background-img">
          <form onSubmit={handleSubmit}>
            <div
              style={{
                color: "white",
                backgroundColor: "transparent",
                borderStyle: "solid",
                borderWidth: "2px",
                borderColor: "black",
                marginLeft: "1rem",
                marginRight: "50rem",
                margin: "0em",
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
              style={{ margin: "1em", marginBottom: "0rem" }}
            >
              Log Jump
            </button>
          </form>
          <div style={{ margin: "1rem" }}>
            <div class="row">
              <div class="searched-chart">
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
                      <th className="font-link"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {jumps
                      .slice(0)
                      .reverse()
                      .map((el) => {
                        return (
                          <tr>
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
                              <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => setIdOfEdit(el)}
                              >
                                <i className="fas fa-edit">Edit</i>
                              </button>
                              <button
                                type="button"
                                style={{ marginLeft: ".5rem" }}
                                class="btn btn-danger"
                                onClick={() => handleDelete(el.id)}
                              >
                                <i class="far fa-trash-alt">Delete</i>
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
        </div>
      );
    };