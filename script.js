let map;
let marker;
let correctLocation = { lat: -6.930740294061416, lng: 107.7169765904484 }; // Ganti dengan lokasi yang sesuai

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: correctLocation,
  });

  marker = new google.maps.Marker({
    position: correctLocation,
    map: map,
    draggable: true,
  });

  google.maps.event.addListener(marker, "dragend", function (event) {
    console.log("Marker moved to: ", event.latLng.lat(), event.latLng.lng());
  });
}

document.getElementById("submit").addEventListener("click", function () {
  console.log("Submit button clicked");
  const markerPosition = marker.getPosition();
  const distance = google.maps.geometry.spherical.computeDistanceBetween(
    new google.maps.LatLng(correctLocation.lat, correctLocation.lng),
    markerPosition
  );

  const maxDistance = 50; // Jarak maksimum untuk dianggap benar

  if (distance <= maxDistance) {
    document.getElementById("result").innerText = "Jawaban Anda benar!";
    document.getElementById("result").style.color = "green"; // Umpan balik positif
  } else {
    document.getElementById(
      "result"
    ).innerText = `Jawaban Anda salah! Jarak dari lokasi yang benar: ${Math.round(
      distance
    )} meter.`;
    document.getElementById("result").style.color = "red"; // Umpan balik negatif
  }
});

// Memanggil initMap setelah DOM sepenuhnya dimuat
document.addEventListener("DOMContentLoaded", function () {
  initMap();
});

// Event listener untuk formulir nama
document
  .getElementById("nameForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Mencegah pengiriman formulir
    const nameInput = document.getElementById("nameInput").value;
    alert("Selamat datang, " + nameInput + "!"); // Menyapa pemain
    document.getElementById("rules").style.display = "block"; // Menampilkan aturan permainan
    document.getElementById("nameForm").style.display = "none"; // Menyembunyikan kolom nama

    // Buka halaman game baru dan kirim nama pemain sebagai parameter
    window.open(
      `game.html?playerName=${encodeURIComponent(nameInput)}`,
      "_blank"
    );
  });
