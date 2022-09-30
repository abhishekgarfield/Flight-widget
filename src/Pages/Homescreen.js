import { useEffect } from "react";

const Homescreen = () => {
  useEffect(() => {
    var d = new Date();
    var starttime = (
      new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime() / 1000
    ).toFixed(0);
    var endtime = (
      new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1).getTime() / 1000
    ).toFixed(0);
    console.log(`start: ${starttime} ,end:${endtime}`);
    const url = `https://opensky-network.org/api/flights/departure?airport=EDDF&begin=${starttime}
        &end=${endtime}`;
    fetch(url, {
      method: "Get",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        display(data.slice(0, 6));
      });
  }, []);
  function display(flights) {
    const table = document.getElementById("table-body");

    for (const flight of flights) {
      console.log(flight);
      var tablerow = document.createElement("tr");
      var rowicon = document.createElement("td");
      rowicon.style.fontSize = "50px";

      rowicon.innerHTML = "✈";

      var d = new Date(flight.lastSeen * 1000);

      var formatdata = `${("0" + d.getHours()).substr(-2)}:${(
        "0" + d.getMinutes()
      ).substr(-2)}`;
      tablerow.append(rowicon);
      const temp = {
        callsign: flight.callsign.trim(),
        destination: flight.estArrivalAirport,
        pickup: flight.estDepartureAirport,
        distance: flight.estDepartureAirportHorizDistance,
        lastseen: formatdata,
      };

      for (const key in temp) {
        var el = document.createElement("td");
        temp[key]
          .toString()
          .split("")
          .forEach((item, index) => {
            console.log(index);
            var div = document.createElement("div");

            div.textContent = item;
            div.className = "inside";
            el.append(div);
          });
        tablerow.appendChild(el);
      }
      table.appendChild(tablerow);
    }
  }

  return (
    <div className="First-container">
      <div className="heading">
        <h1>DEPARTURES</h1>
      </div>
      <table>
        <tr>
          <thead>
            <th></th>
            <th>CALLSIGN</th>
            <th>DROP</th>
            <th>PICKUP</th>
            <th>GATE</th>
            <th>TIME</th>
          </thead>
          <tbody id="table-body"></tbody>
        </tr>
      </table>
    </div>
  );
};
export default Homescreen;
