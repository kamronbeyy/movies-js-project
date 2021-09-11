let formEl = document.querySelector("#form");
let selectEl = document.querySelector("#select");
let inputEl = document.querySelector('#input-search');
let modals = document.querySelector('#modals');
let modalImgs = document.querySelector('.modal-imgs');
let modalTitles = document.querySelector('.modal-titles');
let modalOver = document.querySelector('.modal-overview');
let modalGenres = document.querySelector('.modal-genres');
let modalTime = document.querySelector('.modal-time');
let modalClose = document.querySelector('#modal-close');
let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgb(216, 215, 215);transform msFilter"><path d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z"></path></svg>`;

/* Films render  */
function renderMovies(films, element){
    for(let movies of films){
      let newLi = document.createElement('li');
      let newHeading = document.createElement('h3');
      let newImage = document.createElement('img');
      let listBox = document.createElement('div');
      let itemInfo = document.createElement('div');
      let linkEl = document.createElement('a');

      let div1 = document.createElement('div');
      let div2 = document.createElement('div');
      let div3 = document.createElement('div');
      let div4 = document.createElement('div');
      let div5 = document.createElement('div');
      let div = document.createElement("div");

      let span1 = document.createElement('span');
      let span2 = document.createElement('span');
      let span3 = document.createElement('span');
      let span4 = document.createElement('span');

      const data = new Date(movies.release_date);
      const year = data.getFullYear();
      const month = String(data.getMonth()).padStart(1, "0") ;
      const day = data.getDate();

      div.classList.add('spans-div');
      div1.classList.add('spans');
      div2.classList.add('spans');
      div3.classList.add('spans');
      div4.classList.add('spans');
      div5.classList.add('spans');
      newLi.setAttribute('class', 'list-item');
      newLi.classList.add('new');
      newImage.classList.add('list-item-img');
      listBox.classList.add('list-item-box');
      itemInfo.classList.add('list-item-info-box');
      linkEl.setAttribute('href', '#');
      linkEl.classList.add('item-info-link');
      linkEl.dataset.uuid = movies.id;
      newImage.setAttribute('src', movies.poster);
      newImage.setAttribute('width', '200px');
      newImage.setAttribute('height', '300px');
      newHeading.setAttribute('class', 'list-item-title');
    
      div1.innerHTML = svg;
      div2.innerHTML = svg;
      div3.innerHTML = svg;
      div4.innerHTML = svg;
      div5.innerHTML = svg;
      newHeading.textContent = movies.title;
      linkEl.textContent = 'Learn More';


      newLi.appendChild(span1);
      newLi.appendChild(span2);
      newLi.appendChild(span3);
      newLi.appendChild(span4);
      listBox.appendChild(newImage);
      newLi.appendChild(listBox);
      div.appendChild(div1);
      div.appendChild(div2);
      div.appendChild(div3);
      div.appendChild(div4);
      div.appendChild(div5);
      itemInfo.appendChild(div)
      itemInfo.appendChild(newHeading);
      itemInfo.appendChild(linkEl);
      newLi.appendChild(itemInfo);

      element.appendChild(newLi);

      linkEl.addEventListener('click', e =>{
        let target = e.target.dataset.uuid;
          modals.style.display = 'block';
          modals.style.display = 'flex';
          modals.style.alignItems = 'center';
          modals.style. justifyContent = 'center';

  
          if(target == movies.id){
            modalImgs.setAttribute('src', movies.poster);
            modalImgs.style.width = '330px';
            modalImgs.style.height = '415px';
            modalImgs.style.borderRadius = '15px';
            modalTitles.textContent = movies.title;
            modalOver.textContent = movies.overview;
            modalTime.textContent = `Release_date: ${year}.${month + 1}.${day}`;
            modalGenres.textContent = `Genres:${movies.genres}`;
          }
      });

      modalClose.addEventListener('click', e =>{
         modals.style.display = 'none';
      });

      VanillaTilt.init(document.querySelectorAll(".item-info-link"), {
        max: 35,
        speed: 400,
        // glare: true,
        // "max-glare": 1,
      });
  
    
  }
}

renderMovies(films, list );


/* Select render*/
function renderSelect(films, element){
  const result = [];

  films.forEach((movie) =>{
    movie.genres.forEach((genre) =>{
      if(!result.includes(genre)){
        result.push(genre);
      }
    })
  })
  element.innerHTML = null;

  result.forEach((genre) =>{
      const newOption = document.createElement('option');
      newOption.value = genre;
      newOption.textContent = genre;
    
      element.appendChild(newOption)
  })
}

renderSelect(films, selectEl);

/* Select function*/
selectEl.addEventListener('change', e =>{
   let selectGenres = selectEl.value.trim();
   let foundFilms = [];
   list.innerHTML = null;

   if(selectGenres){
     foundFilms = films.filter((film) =>{
       return film.genres.includes(selectGenres);
     })
   }

   renderMovies(foundFilms, list );
});


/* Search function*/
formEl.addEventListener('submit', e =>{
    e.preventDefault();

    function search(y){
        list.innerHTML = ''
        let regex = new RegExp(`${inputEl.value.trim()}`, "gi");
        console.log(regex);
        for(let searchFilms of y){
        
            if(searchFilms.title.match(regex) || searchFilms.overview.match(regex)){
                
                let newLi = document.createElement('li');
                let newHeading = document.createElement('h3');
                let newImage = document.createElement('img');
                let listBox = document.createElement('div');
                let itemInfo = document.createElement('div');
                let linkEl = document.createElement('a');
                let span1 = document.createElement('span');
                let span2 = document.createElement('span');
                let span3 = document.createElement('span');
                let span4 = document.createElement('span');

                let div1 = document.createElement('div');
                let div2 = document.createElement('div');
                let div3 = document.createElement('div');
                let div4 = document.createElement('div');
                let div5 = document.createElement('div');
                let div = document.createElement("div");
            
                const data = new Date(searchFilms.release_date);
                const year = data.getFullYear();
                const month = String(data.getMonth()).padStart(1, "0") ;
                const day = data.getDate();
            

                div.classList.add('spans-div');
                div1.classList.add('spans');
                div2.classList.add('spans');
                div3.classList.add('spans');
                div4.classList.add('spans');
                div5.classList.add('spans');
                newLi.setAttribute('class', 'list-item');
                newLi.classList.add('new');
                listBox.classList.add('list-item-box');
                itemInfo.classList.add('list-item-info-box');
                linkEl.setAttribute('href', '#');
                linkEl.classList.add('item-info-link');
                linkEl.dataset.uuid = searchFilms.id;
                newHeading.setAttribute('class', 'list-item-title');
                newImage.classList.add('list-item-img');
                newImage.setAttribute('src', searchFilms.poster);
                newImage.setAttribute('width', '200px');
                newImage.setAttribute('height', '300px')
            
                newHeading.textContent = searchFilms.title;
                linkEl.textContent = 'Learn More';
              
                newLi.appendChild(span1);
                newLi.appendChild(span2);
                newLi.appendChild(span3);
                newLi.appendChild(span4);
                listBox.appendChild(newImage);
                newLi.appendChild(listBox);
                div.appendChild(div1);
                div.appendChild(div2);
                div.appendChild(div3);
                div.appendChild(div4);
                div.appendChild(div5);
                itemInfo.appendChild(div)
                itemInfo.appendChild(newHeading);
                itemInfo.appendChild(linkEl);
                newLi.appendChild(itemInfo);
      
                list.appendChild(newLi);

                linkEl.addEventListener('click', e =>{
                  let target = e.target.dataset.uuid;
                    modals.style.display = 'block';
                    modals.style.display = 'flex';
                    modals.style.alignItems = 'center';
                    modals.style. justifyContent = 'center';
          
            
                    if(target == searchFilms.id){
                      modalImgs.setAttribute('src', searchFilms.poster);
                      modalImgs.style.width = '330px';
                      modalImgs.style.height = '415px';
                      modalImgs.style.borderRadius = '15px';
                      modalTitles.textContent = searchFilms.title;
                      modalOver.textContent = searchFilms.overview;
                      modalTime.textContent = `Release_date: ${year}.${month + 1}.${day}`;
                      modalGenres.textContent = `Genres:${searchFilms.genres}`;
                    }
                });
          
                modalClose.addEventListener('click', e =>{
                   modals.style.display = 'none';
                });
          
                VanillaTilt.init(document.querySelectorAll(".item-info-link"), {
                  max: 35,
                  speed: 400,
                  // glare: true,
                  // "max-glare": 1,
                });
            }
        }
    }  
      search(films)
}) 

/* A dan Z gacha Z dan A gacha render */
let select = document.querySelector("#selects");

select.addEventListener('change', (e) =>{

 function alifbo(films, element){
  if(select.value === "a_z"){

    for(let x of films){

        films.sort((a,b) =>{

            if(a.title > b.title){
                return 1
            }
            else if(a.title < b.title){
                return -1
            }
            else{
                return 0
            }
        })
        

    }
    renderMovies(films, list);


}else if(select.value === "z_a"){
     for(let x of films){

         
         films.sort((a,b) =>{

             if(a.title > b.title){
                return -1
            }
            else if(a.title < b.title){
                return 1
            }
            else{
                return 0
            }
        })
        
    }
}

 }
 alifbo(films, list);

    renderMovies(films, list );
});




/* Slider js coding */
const swiper = new Swiper('.swiper-container', {
    // Optional parameters
    // loop: true,
    effect: 'cube',
      grabCursor: true,
      cubeEffect:{
          shadow: true,
          slideShadows: true,
          shadowOffset:50,
          shadowScale: 0.94,
      },
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });
/* Slider js and */

/* Typed js coding */
var typed = new Typed('.anime', {
  // Waits 1000ms after typing "First"
  strings: [
      'telegram : komronbey_1718',
       'komronbeksunnatov1@gmail.com'
  ],

  typeSpeed: 100,
  backSpeed: 100,
  loop: true
});
/* Typed js coding and */



VanillaTilt.init(document.querySelector(".content-modal"), {
  max: 15,
  speed: 250,
  glare: true,
  "max-glare": 0.5,
});


