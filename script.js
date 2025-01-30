/* Mengakses elemen pada HTML */
const bmiForm = document.getElementById("bmiForm");
const resultContainer = document.getElementById("result-container");

/* Button (hitung BMI) */
bmiForm.addEventListener("submit", function (e) {
  e.preventDefault();

  /* Rumus BMI */
  function hitungBMI(berat, tinggi) {
    let tinggiMeter = tinggi / 100;
    return (berat / (tinggiMeter * tinggiMeter)).toFixed(1);
  }

  /* Bar meter progres */
  function updateBMIIndicator(bmi) {
    const bmiIndicator = document.getElementById("bmiIndicator");
    let position = "0%";
    let category = "";

    if (bmi < 18.5) {
      position = "10%"; // Kurus
      category = "kurus";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      position = "35%"; // Berat Ideal
      category = "ideal";
    } else if (bmi >= 25 && bmi <= 29.9) {
      position = "65%"; // Berat Berlebih
      category = "berlebih";
    } else {
      position = "90%"; // Obesitas
      category = "obesitas";
    }

    bmiIndicator.style.left = position;
    bmiIndicator.className = "bmi-indicator ${category}";
  }

  /* Identifikasi hasil BMI */
  function kategoriBMI(bmi) {
    if (bmi < 18.5) return "Kekurangan berat badan";
    if (bmi >= 18.5 && bmi <= 24.9) return "Normal (Ideal)";
    if (bmi >= 25 && bmi <= 29.9) return "Kelebihan berat badan";
    return "Kegemukan (Obesitas)";
  }

  /* Ambil nilai input */
  const usia = document.getElementById("usia").value;
  const gender = document.getElementById("gender").value;
  const berat = parseFloat(document.getElementById("berat").value);
  const tinggi = parseFloat(document.getElementById("tinggi").value);

  /* Validasi input */
  if (!usia || berat <= 0 || tinggi <= 0) {
    alert("Harap masukkan usia, berat, dan tinggi dengan benar.");
    return;
  }

  const bmi = hitungBMI(berat, tinggi);
  const kategori = kategoriBMI(bmi);

  /* Menampilkan hasil ke dalam elemen HTML */
  document.getElementById("genderOutput").innerText =
    gender === "male" ? "Laki-laki" : "Perempuan";
  document.getElementById("tinggiOutput").innerText = tinggi;
  document.getElementById("beratOutput").innerText = berat;
  document.getElementById("bmiValue").innerText = bmi;
  document.getElementById("kategoriBMI").innerText = kategori;

  updateBMIIndicator(bmi);

  /* Pastikan hasil ditampilkan */
  resultContainer.classList.remove("hidden");
});

/* Fungsi reset */
function resetForm() {
  bmiForm.reset();
  resultContainer.classList.add("hidden");
}
