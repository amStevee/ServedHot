// import "dotenv/config";
import axios from "axios";

const slides = document.getElementById("slides") as HTMLDivElement | null,
  search = document.getElementById("search") as HTMLInputElement | null,
  search_button = document.getElementById(
    "search_button"
  ) as HTMLButtonElement | null,
  searchError = document.getElementById("searchError") as HTMLDivElement | null;
const is_open = document.getElementById("is_open") as HTMLDivElement | null;
const all_categories = document.getElementById(
  "all_categories"
) as HTMLDivElement | null;

setCarouselDelay();
getLocation();

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
              lunit: "km",
              lang: "en_US",
            },
            headers: {
              "X-RapidAPI-Key": process.env.API_KEY2,
              "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
            },
          });

          if (
            slides != undefined &&
            is_open != undefined &&
            all_categories != undefined
          ) {
            slides.innerHTML = data
              .map((dta: any) =>
                dta?.rating > 4.0
                  ? `<div class="c">
                <article class="card fade">
                  <img src="${
                    dta.photo?.images.large.url ||
                    "./image/undraw_Chef_cu0r.png"
                  }" alt="${dta.photo?.caption}" />
                  <div class="card_content">
                    <h3 class="card_title">${dta.name || "x"}</h3>
                    <span class="card_subtitle">${dta.address}</span>
                    <a href="${dta.website}">WEBSITE</a>
                  </div>
                </article>
              </div>`
                  : ""
              )
              .join("");

            all_categories.innerHTML = data
              .map(
                (dta: any) =>
                  `<a href="${
                    dta.website
                  } target="_blank""><div class="isopen allcat">
                <img src="${
                  dta.photo?.images.large.url || "./image/undraw_Chef_cu0r.png"
                }" alt="${dta.photo?.caption}" />
                <div class="isopen_content">
                  <h3>${dta.name || "x"}</h3>
                  <p>${dta.address}</p>
                  <p class="desc">${dta.description || "x"}</p>
                </div>
              </div></a>`
              )
              .join("");

            is_open.innerHTML = data
              .map((dta: any) =>
                !dta.is_closed
                  ? `<div class="isopen">
                <img src="${
                  dta.photo?.images.large.url || "./image/undraw_Chef_cu0r.png"
                }" alt="${dta.photo?.caption}" />
                <div class="isopen_content">
                  <h3>${dta.name || "x"}</h3>
                  <p>${dta.address}</p>
                  <p class="desc">${dta.description || "x"}</p>
                  <h4><a href="${dta.website}">more details..</a></h4>
                </div>
              </div>`
                  : ""
              )
              .join("");
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

          if (
            slides != undefined &&
            is_open != undefined &&
            all_categories != undefined
          ) {
            slides.innerHTML = data
              .map(
                (dta: any) =>
                  dta?.rating > 4.0 &&
                  `<div class="c">
                <article class="card fade">
                  <img src="${
                    dta.photo?.images.large.url ||
                    "../image/undraw_Chef_cu0r.png"
                  }" alt="${dta.photo?.caption}" />
                  <div class="card_content">
                    <h3 class="card_title">${dta.name || "x"}</h3>
                    <span class="card_subtitle">${dta.address}</span>
                    <p class="card_description">
                      ${dta.description || "x"}
                    </p>
                    <a href="${dta.website}">WEBSITE</a>
                  </div>
                </article>
              </div>`
              )
              .join("");

            is_open.innerHTML = data
              .map(
                (dta: any) =>
                  !dta.is_closed &&
                  `
          <div class="isopen" onclick="${dta.website}">
            <img src="${
              dta.photo?.images.large.url || "../image/undraw_Chef_cu0r.png"
            }" alt="${dta.photo?.caption}" />
            <div class="isopen_content">
              <h3>${dta.name || "x"}</h3>
              <p>${dta.address}</p>
              <p class="desc">${dta.description || "x"}</p>
              <h4>OPEN</h4>
            </div>
          </div>`
              )
              .join("");

            all_categories.innerHTML = data
              .map(
                (dta: any) =>
                  `
          <div class="isopen" onclick="${dta.website}">
            <img src="${
              dta.photo?.images.large.url || "../image/undraw_Chef_cu0r.png"
            }" alt="${dta.photo?.caption}" />
            <div class="isopen_content">
              <h3>${dta.name || "x"}</h3>
              <p>${dta.address}</p>
              <p class="desc">${dta.description || "x"}</p>
              <h4>OPEN</h4>
            </div>
          </div>`
              )
              .join("");
            console.log(data);
          }
        } catch (error) {
          throw error;
        }
      }
    }
  );
}

// PASSIN SEARCH VALUE TO GETLATLONG FUNCTION
async function searchRestaurant(e: any) {
  e.preventDefault() as HTMLInputElement;
  const search_term = search?.value;
  if (search_term !== null) {
    GetLatlong(search_term || "");
  } else {
    searchError?.setAttribute("style", "display:none;");
  }
}

search_button?.addEventListener("click", searchRestaurant);
