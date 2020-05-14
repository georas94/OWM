"use strict"

$(document).ready(function(){


$("#listeVille").on("click", function(){
    
    let urlListeVilles = 'http://formation.webboy.fr/liste_des_villes.php';
    fetch(urlListeVilles)
    .then(response => response.json())
    .then((json) => {
            for (const listeVille of json) {
                let villes = listeVille.name ;
                let listeSelect = document.createElement("option");
                //let idVilles = $("#listeDeroulante").val(listeVille.id); 
                listeSelect.innerHTML = villes;
                listeSelect.value = listeVille.id; 
                let listeTitreFilms = document.querySelector("#listeDeroulante");
                listeTitreFilms.appendChild(listeSelect);        

            }
            afficheMeteo();   
            })
    })



       function afficheMeteo(){
       let idVille = $("#listeDeroulante").val();
       console.log(idVille)
       let apiKey = "0b015e5e4c76427207de0d35c2b9cba8";
        let urlAffichage = 'https://api.openweathermap.org/data/2.5/weather?id=' + idVille + '&appid=' + apiKey;
        fetch(urlAffichage)
            .then(response => response.json())
            .then((json) => {
                let degreConverti = Math.round(json.main.temp - 273.15);
                document.querySelector("#temperature").innerHTML = degreConverti;
                let metreSecondeEnKM = Math.round(json.wind.speed * 3.6);
                document.querySelector("#vitesseVent").innerHTML = metreSecondeEnKM;
                document.querySelector("#fleche").style.transform = 'rotateZ(' + json.wind.deg + 'deg)';
                
                

            });
    }

     $("select").change(function(){
            afficheMeteo();

        })
    }); //fermeture ready
