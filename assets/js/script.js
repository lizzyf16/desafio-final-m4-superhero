function buscarsuperhero() {
    let hero = document.getElementById("floatingInput").value;
      if (isNaN(hero) || hero < 1 || hero > 732) {
          alert("¡Solo existen 732 SuperHero!\n(Ingresa un valor en ese rango para buscar)");
          resetHero();
      }
      else {
          obtenerData(hero);
      }
  };
// validación formulario

function resetHero(){
    var element = document.getElementById("#formHero");
    $(".row").css("display", "none");
    element.reset();
  };

   function cargarGrafico(datos = [], nombre="") {
        const chart = new CanvasJS.Chart("chartsuper", {
         theme: "light2", // "light1", "light2", "dark1", "dark2"
         exportEnabled: false,
         animationEnabled: true,
         title: {
             text: "Estadistícas de poder para " +nombre
         },
         data: [{
             type: "pie",
             startAngle: 25,
             toolTipContent: "<b>{label}</b>: {y}",
             showInLegend: "true",
             legendText: "{label}",
             indexLabelFontSize: 16,
             indexLabel: "{label} - {y}",
             dataPoints: datos,
            }]
          });
          chart.render();
    }


    function obtenerData(numsuperhero) {
        let url= "https://www.superheroapi.com/api.php/3525635500807579/"+numsuperhero;

        $.ajax(url)
            .done(function (datos) {
                let { powerstats, name, connections, appearance, image, work, biography, id} = datos;
                const superherodata = {
                    name,
                connections: connections["group-affiliation"] +"\n"+ connections["relatives"],
                    publisher: biography["publisher"],
                    height: appearance["height"],
                    weight: appearance["weight"],
                    occupation: work["occupation"],
                    firstappearance: biography["first-appearance"],
                    aliases: biography["aliases"],
                    image: image["url"],
                    id,
                                }
                                // cargarGrafico(Object.keys(powerstats).map(item=>({label:item, y:powerstats[item]})));
                cargarGrafico(Object.entries(powerstats).map(item=>({label:item[0], y:item[1]})), name);
                llenadodedatos(superherodata);
            })
            .fail(function () {
                alert("error");
            })
           
        }
                       // Muestra la sección


  function llenadodedatos(datosuper ={}){
    $(".row").css("display", "flex");
    document.getElementById("name").innerText = datosuper.name;
    document.getElementById("id").innerText = datosuper.id;
    document.getElementById("image").src = datosuper.image;
    // $("#image").attr("src",datosuper.image)
    document.getElementById("connections").innerText = datosuper.connections;
    document.getElementById("publisher").innerText = datosuper.publisher;
    document.getElementById("height").innerText = datosuper.height;
    document.getElementById("weight").innerText = datosuper.weight;
    document.getElementById("occupation").innerText = datosuper.occupation;
    document.getElementById("firstappearance").innerText = datosuper.firstappearance;
    document.getElementById("aliases").innerText = datosuper.aliases;
};
