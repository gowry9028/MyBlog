
$(document).ready(function()
    {
     $.ajax({ //for communicating to server
                  
                  url: "http://localhost:5000/list",// this need to be url where we hosting our server
                  method: "GET",
                  contentType: "application/json",
                  success: function(response){
                    console.log(response);
                    var list = "";
                    var i;

                    for(i=0; i<response.length; i++){
                   list +="<li><a href='/read?id="+response[i]._id+"'' class='addressClick' id='"+response[i]._id+"'>"+response[i].title+"</a></li>";
                   //list +="<li><a href='/post?id="+response[i]._id+"' id='"+response[i]._id+"'>"+response[i].title+"</a></li>";
                    }

                      $("a").on('click',function () {
console.log(addressClick);
                            var addressValue = $(this).attr("id");
            
                             //if (localStorage) {
console.log(addressValue);
                      // var$(this).attr("href");
                        // Save the name in localStorage.
                       localStorage.setItem('id', addressValue);
                   // }
                            //alert(addressValue );
                        });

                     $("#titles").append(list);
                    },
                    error: function(response) {
                        alert("Communication to server fail");
                    }
                })     
    })

/*$(document).on('click', "a", function () {
    var id = $(this).attr("id");
    localStorage.setItem('id', id);
    console.log(id);
});
*/