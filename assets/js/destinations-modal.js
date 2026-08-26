// Country Information Database
const destinationData = {
  "Spain": { region: "Europe", time: "10-15 Days", type: "Schengen Tourist", validity: "Up to 90 Days", image: "../assets/images/destinations/spain.jpg" },
  "Italy": { region: "Europe", time: "10-15 Days", type: "Schengen Tourist", validity: "Up to 90 Days", image: "../assets/images/destinations/italy.jpg" },
  "France": { region: "Europe", time: "10-15 Days", type: "Schengen Tourist", validity: "Up to 90 Days", image: "../assets/images/destinations/france.jpg" },
  "Netherlands": { region: "Europe", time: "10-15 Days", type: "Schengen Tourist", validity: "Up to 90 Days", image: "../assets/images/destinations/netherlands.jpg" },
  "Romania": { region: "Europe", time: "10-14 Days", type: "National Visa", validity: "Up to 90 Days", image: "../assets/images/destinations/romania.jpg" },
  "Portugal": { region: "Europe", time: "10-15 Days", type: "Schengen Tourist", validity: "Up to 90 Days", image: "../assets/images/destinations/portugal.jpg" },
  "Germany": { region: "Europe", time: "10-15 Days", type: "Schengen Tourist", validity: "Up to 90 Days", image: "../assets/images/destinations/germany.jpg" },
  "United Kingdom": { region: "Europe", time: "15-20 Days", type: "Standard Visitor", validity: "6 Months", image: "../assets/images/destinations/uk.jpg" },
  "United States (USA)": { region: "Americas", time: "Appointment Dependent", type: "B1/B2 Visitor", validity: "Up to 10 Years", image: "../assets/images/destinations/usa.jpg" },
  "Uruguay": { region: "Americas", time: "15-20 Days", type: "Tourist Visa", validity: "Up to 90 Days", image: "../assets/images/destinations/uruguay.jpg" },
  "Canada": { region: "Americas", time: "20-30 Days", type: "Visitor Visa (VTR)", validity: "Up to 10 Years", image: "../assets/images/destinations/canada.jpg" },
  "Brazil": { region: "Americas", time: "7-10 Days", type: "Tourist eVisa", validity: "Up to 90 Days", image: "../assets/images/destinations/brazil.jpg" },
  "New Zealand": { region: "Oceania", time: "15-20 Days", type: "Visitor Visa", validity: "Up to 9 months", image: "../assets/images/destinations/newzealand.jpg" },
  "Australia": { region: "Oceania", time: "15-25 Days", type: "Visitor Visa (subclass 600)", validity: "3 to 12 Months", image: "../assets/images/destinations/australia.jpg" },
  "Turkey": { region: "Asia", time: "3-5 Days", type: "eVisa / Sticker Visa", validity: "30 to 90 Days", image: "../assets/images/destinations/turkey.jpg" },
  "Thailand": { region: "Asia", time: "3-5 Days", type: "Tourist Visa / eVisa", validity: "60 Days", image: "../assets/images/destinations/thailand.jpg" },
  "Malaysia": { region: "Asia", time: "2-4 Days", type: "eVISA Tourist", validity: "30 Days", image: "../assets/images/destinations/malaysia.jpg" },
  "China": { region: "Asia", time: "7-10 Days", type: "L Tourist Visa", validity: "30 to 90 Days", image: "../assets/images/destinations/china.jpg" },
  "Japan": { region: "Asia", time: "7-12 Days", type: "Temporary Visitor", validity: "Up to 90 Days", image: "../assets/images/destinations/japan.jpg" },
  "United Arab Emirates": { region: "Middle East", time: "24-48 Hours", type: "Tourist eVisa", validity: "30 or 60 Days", image: "../assets/images/destinations/uae.jpg" },
  "Saudi Arabia": { region: "Middle East", time: "24-48 Hours", type: "Tourist eVisa / Umrah", validity: "1 Year (Multiple)", image: "../assets/images/destinations/saudiArabia.jpg" },
  "Zimbabwe": { region: "Africa", time: "3-5 Days", type: "Category B/C Visa", validity: "30 Days", image: "../assets/images/destinations/zimbabwe.jpg" },
  "Eswatini": { region: "Africa", time: "5-7 Days", type: "Visitor Visa", validity: "30 Days", image: "../assets/images/destinations/eswatini.jpg" },
  "Lesotho": { region: "Africa", time: "3-5 Days", type: "eVisa / Tourist", validity: "30 Days", image: "../assets/images/destinations/lesotho.jpg" }
};

// Open Quick Info Modal Function
function openDestinationModal(countryName) {
  const data = destinationData[countryName] || {
    region: "Global",
    time: "7-15 Days",
    type: "Tourist Visa",
    validity: "Standard Stay",
    image: "../assets/images/logo.png"
  };

  document.getElementById('modalBanner').style.backgroundImage = `url('${data.image}')`;
  document.getElementById('modalRegion').innerText = data.region;
  document.getElementById('modalCountry').innerText = countryName;
  document.getElementById('modalTime').innerText = data.time;
  document.getElementById('modalType').innerText = data.type;
  document.getElementById('modalValidity').innerText = data.validity;
  
  // Set CTA URLs
  document.getElementById('modalContactLink').href = `contact.html?destination=${encodeURIComponent(countryName)}`;
  document.getElementById('modalWhatsappBtn').onclick = function() {
    openWhatsApp(`${countryName} Visa Inquiry`);
  };

  document.getElementById('destinationModal').classList.add('active');
}

// Close Modal Function
function closeDestinationModal() {
  document.getElementById('destinationModal').classList.remove('active');
}

// Close Modal on Overlay Click
document.addEventListener('DOMContentLoaded', () => {
  const modalOverlay = document.getElementById('destinationModal');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeDestinationModal();
      }
    });
  }
});