import axios from "axios";

const slides = document.getElementById("slides") as HTMLDivElement | null,
  search = document.getElementById("search") as HTMLInputElement | null,
  search_button = document.getElementById(
    "search_button"
  ) as HTMLButtonElement | null,
  searchError = document.getElementById("searchError") as HTMLDivElement | null;

setCarouselDelay();

function setCarouselDelay() {
  setInterval(scrolling, 10000);
  setInterval(scrollingl, 10000);
  scrollingr();
  function scrolling() {
    slides?.scrollBy(100, -100);
  }

  function scrollingl() {
    slides?.scrollBy(100, -100);
  }

  function scrollingr() {
    slides?.scrollBy(300, -300);
  }
}

// const options = {
//   params: {
//     latitude: "12.91285",
//     longitude: "100.87808",
//     limit: "30",
//     currency: "USD",
//     distance: "2",
//     open_now: "false",
//     lunit: "km",
//     lang: "en_US",
//   },
//   headers: {
//     "X-RapidAPI-Key": "8b548f0d36mshb24846c09cc0cfcp1edf30jsn199b6fc034a8",
//     "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
//   },
// };
const URL = "https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng";

//GET USER LOCATION AND FETCH DATA
async function getLocation() {
  let x = document.getElementById("demo") as HTMLDivElement | null;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        try {
          const {
            data: { data },
          } = await axios.get(URL, {
            params: {
              latitude: latitude,
              longitude: longitude,
              limit: "30",
              currency: "USD",
              open_now: "false",
              lunit: "km",
              lang: "en_US",
            },
            headers: {
              "X-RapidAPI-Key":
                "8b548f0d36mshb24846c09cc0cfcp1edf30jsn199b6fc034a8",
              "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
            },
          });
          if (slides != undefined) {
            slides.innerHTML = data
              .map(
                (dta: any) => `<div class="c">
              <article class="card fade">
                <img src="${
                  dta.photo?.images.large.url ||
                  "../image/header_background.jpg"
                }" alt="${dta.photo?.caption}" />
                <div class="card_content">
                  <h3 class="card_title">${dta.name || "x"}</h3>
                  <span class="card_subtitle">${dta.address}</span>
                  <p class="card_description">
                    ${dta.description}
                  </p>
                  <a href="${dta.website}">WEBSITE</a>
                </div>
              </article>
            </div>`
              )
              .join("");
            console.log(data);
          }
        } catch (error) {
          throw error;
        }
      }
    );
  } else {
    if (x?.innerHTML !== undefined) {
      x.innerHTML = `<p>An error occured</P>`;
    }
  }
}

//GET LETLONG FROM SEARCH INPUT
function GetLatlong(address: string) {
  var geocoder = new google.maps.Geocoder();

  geocoder.geocode(
    {
      address: address,
    },
    async function (results: any, status: any) {
      if (status == google.maps.GeocoderStatus.OK) {
        var latitude = results[0].geometry.location.lat();
        var longitude = results[0].geometry.location.lng();
        try {
          const {
            data: { data },
          } = await axios.get(URL, {
            params: {
              latitude: latitude,
              longitude: longitude,
              limit: "30",
              currency: "USD",
              distance: "2",
              open_now: "false",
              lunit: "km",
              lang: "en_US",
            },
            headers: {
              "X-RapidAPI-Key":
                "8b548f0d36mshb24846c09cc0cfcp1edf30jsn199b6fc034a8",
              "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
            },
          });
          if (slides != undefined) {
            slides.innerHTML = data
              .map(
                (dta: any) => `<div class="c">
              <article class="card fade">
                <img src="${dta.photo.images.thumbnail.url}" alt="${
                  dta.photo.caption
                }" />
                <div class="card_content">
                  <h3 class="card_title">${dta.name || "x"}</h3>
                  <span class="card_subtitle">Address: ${dta.address}</span>
                  <p class="card_description">
                    ${dta.description}
                  </p>
                </div>
              </article>
            </div>`
              )
              .join("");
          }
        } catch (error) {
          throw error;
        }
      }
    }
  );
}

// SEARCH RESTAURANTS AND FETCH DATA FROM API
async function searchRestaurant(e: any) {
  e.preventDefault() as HTMLInputElement;
  const search_term = search?.value;
  if (search_term !== null) {
    GetLatlong(search_term || "");
  } else {
    searchError?.setAttribute("style", "display:none;");
  }
}

getLocation();
search_button?.addEventListener("click", searchRestaurant);
