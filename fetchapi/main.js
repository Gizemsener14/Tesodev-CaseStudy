let searchable = [];

//json file'a erişip cors hatası almamak için json:server oluşturarak json file'ın datasını kullandım.
const renderPosts = async () => {
    let uri = 'http://localhost:3000/data';

    const res = await fetch(uri);
    const posts = await res.json();
    console.log(posts.length);

    //100 tane ayrı grup array var
    // sırayla her grubun ilk elemanını yani NameSurname alıyoruz
    //Her grupta 6 bilgi türü var, sadece isim-soyisimleri almak için array'in ikinci dimension'ı her seferinde 6 artmalı
    for(var y=0; y<posts.length; y++){
        for(var z=0; z<posts.length; z=z+6){
          if(posts[y][z] != undefined){
            console.log(posts[y][z]);
            let word = posts[y][z];
            console.log("word is "+posts[y][z]);
            searchable.push(word);
            console.log(" searchable 1 is "+searchable[1]);
            //json file'da  okunan datalardan saadece isimleri array'e kayıt ettim
            //Bu isimlerden aarama yapılacak

          }
            
        }

    }
    


    //console.log(posts[1]);
}

renderPosts();


const searchInput = document.getElementById('search');
const searchWrapper = document.querySelector('.wrapper');
const resultsWrapper = document.querySelector('.results');

searchInput.addEventListener('keyup', () => { //search bar'a yazılmaya başlandığında çalışacak
  let results = [];
  let input = searchInput.value; //yazılan input kayıt edildi
  if (input.length) {
    results = searchable.filter((item) => { //input ve json file'daki datalar karşılaştırılır
      return item.toLowerCase().includes(input.toLowerCase());
    });
  }
  renderResults(results);
});

let searchinglist = [];

function renderResults(results) {
  if (!results.length) {
    return searchWrapper.classList.remove('show');
  }

  const content = results
    .map((item) => {
      let word2 =item;
      searchinglist.push(word2);
      return `<li>${item}</li>`;
    })
    .join('');

  searchWrapper.classList.add('show');
  resultsWrapper.innerHTML = `<ul>${content}</ul>`;
}


//Search button ---------------------------------------------------------------------------------------------------------
//search bar'dan alınan input ile eşleşen sonuçlar,array olarak RecordsResultList html sayfasına inner html olarak gönderilecektir.

const buttonelement = document.getElementById("result-list-button");
buttonelement.addEventListener('click', () => { 
  for(var t=0; t<searchinglist.length;t++){
    console.log("list is"+searchinglist[t]);
    const arr1 =[];
    const arr3 = searchinglist.concat(arr1);
    //var kelime= searchinglist[t];
    console.log("aarr 3 is "+arr3[t]);
    
    
  }
  window.location = 'RecordsResultList.html';
  return arr3;
  
})

//RecordsResultList onload olduğunda data resultlist'e gösterilmeli
function onloadevent(arr3){

  const listelement = document.getElementById("resultlist");
  
 
  for(var t=0; t<arr3.length;t++){
    console.log("sending data is"+arr3[t]);
    console.log("list is"+arr3[t]);
    var w= arr3[t];
    
      var contentinner;
      contentinner += `<li>${w}</li>` ;    
      console.log("contentinner is"+contentinner);

      //searchWrapper.classList.add('show');
      listelement.innerHTML = `<ul>${contentinner}</ul>`;
    
  }
  
}

