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

