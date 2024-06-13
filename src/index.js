// index.js

// Global Variables
const targetMenu = document.querySelector('#ramen-menu')
const targetDetail = document.querySelector("#ramen-detail")
const targetNewRamen = document.querySelector("#new-ramen")

// //After 1s, display the image
// setTimeout(function(){
// document.getElementById("shoyuImg").style.display = "block";
// }, 1000);

// Callbacks
const handleClick = (ramen) => {
  // Add code
  // display clicked ramen img and details (name and restaurant)
  // target each individual tags and replace it or clear section and create new tags
  // img, h2, h3
  
  const ramenImg = document.createElement("img")
  ramenImg.src = ramen.image 
  ramenImg.alt = ramen.name
  ramenImg.classList = "detail-image"
  
  const h2 = document.createElement("h2")
  h2.innerText = ramen.name
  h2.className = "name"
  
  const h3 = document.createElement("h3")
  h3.innerText = ramen.restaurant
  h3.className = "restaurant"
  
  document.querySelector('#ramen-detail').innerHTML = ""
  document.querySelector('#ramen-detail').append(ramenImg, h2, h3)

  document.getElementById('rating-display').innerHTML = ramen.rating
  document.getElementById('comment-display').innerHTML = ramen.comment
}

const addSubmitListener = () => {
  // Add code
  const formElement = document.getElementById('new-ramen');

  formElement.addEventListener("submit", (e) => {
    // stop submit from refreshing page
    e.preventDefault()

    // grab input values from user
    const newName = document.getElementById("new-name").value
    
    const newRestaurant = document.getElementById("new-restaurant").value

    const newImage = document.getElementById("new-image").value

    const newRating = document.getElementById("new-rating").value

    const newComment = document.getElementById("new-comment").value
    
    // add new elements to ramen-menu
    const newRamenObj = {
      name: newName,
      restaurant: newRestaurant,
      image: newImage,
      rating: newRating,
      comment: newComment,
    }
    // add to displayRamen
    const newRamen = document.createElement("img")
    newRamen.src = newImage
    newRamen.alt = newName
    document.querySelector('#ramen-menu').append(newRamen)
    newRamen.addEventListener("click", () => {handleClick(newRamenObj)})
  })
}

const displayRamens = () => {
  // Add code
  // fetch data, then display images onto page
  return fetch("http://localhost:3000/ramens") 
  .then((resp) => {
    if (resp.ok) {
      return resp.json()
    }})
  .then((ramens) => ramens.forEach((ramen) => {
    const img = document.createElement("img")
    img.src = ramen.image
    img.alt = ramen.name
    img.addEventListener("click", () => {handleClick(ramen)})
    document.querySelector('#ramen-menu').append(img)
  }))
}

const main = () => {
  // Invoke displayRamens here
  displayRamens()
  // Invoke addSubmitListener here
  addSubmitListener()
}

main(); // only function to be called, so start with const main

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
}