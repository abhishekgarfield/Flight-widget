import { toBeDisabled } from "@testing-library/jest-dom/dist/matchers";
import { useEffect, useState } from "react";

export const Homescreen = () => {
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
    const table = document.getElementsByTagName("table");

    for (const flight of flights) {
      console.log(flight);
      var tablerow = document.createElement("tr");
      var rowicon = document.createElement("td");
      rowicon.textContent = "✈";
      tablerow.append(rowicon);
      const temp = {
        callsign: flight.callsign,
        destination: flight.estArrivalAirport,
        pickup: flight.estDepartureAirport,
        distance: flight.estDepartureAirportHorizDistance,
        lastseen: flight.lastSeen,
      };
      for (const key in temp) {
        var el = document.createElement("td");
        temp[key]
          .toString()
          .split("")
          .forEach((item) => {
            var div = document.createElement("div");
            div.textContent = item;
            div.className = "inside";
            el.append(div);
          });
        tablerow.appendChild(el);
      }
      table[0].appendChild(tablerow);
    }
  }

  return (
    <div className="First-container">
      <div className="heading">
        <h1>DEPARTURES</h1>
      </div>
      <table>
        <tr>
          <th></th>
          <th>TIME</th>
          <th>DESTINATION</th>
          <th>FLIGHT</th>
          <th>GATE</th>
          <th>REMARKS</th>
        </tr>
      </table>
    </div>
  );
};
