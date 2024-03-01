const btnSearch = document.getElementById('btnSearch');
const getID = document.getElementById('getID');

const API_Key = "at_eNZuDuEf9aVexX0iCDMoBsnUwcaNO";

let map;

btnSearch.addEventListener('click', () => {
    const geoIP = async (getID) => {
        try {
            const getDataFromIPIFY = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${API_Key}&ipAddress=${getID}`);
            const responseData = await getDataFromIPIFY.json();
            const lat = responseData.location.lat;
            const lng = responseData.location.lng;
            updateMap(lat, lng);
            console.log(responseData);
        } catch (error) {
            console.log(error);
        }
    };

    geoIP(getID.value);
});

function updateMap(lat, lng) {
    if (map) {
        map.remove();
    }
    
    map = L.map('myMap').setView([lat, lng], 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([lat, lng]).addTo(map)
        .bindPopup('You are here :)')
        .openPopup();

    map.on('click', onMapClick);
}

function onMapClick(e) {
    alert(`Position: ${e.latlng}`);
}