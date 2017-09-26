
$(document).ready(function(req,res)
    {

        var id = localStorage.getItem('id');

    $.ajax({ //for communicating to server

                  url: "http://localhost:5000/post?id="+ id ,//this need to be url where we hosting our server
                  id:id,
                  method: "GET",
                  contentType: "application/json",
                  success: function(response){
                    console.log(response);
                    $('#title').append(response.title);
                    $('#content').append(response.content);
                    },
                    error: function(response) {
                        alert("Communication to server fail");
                    }
                }) 
                //localStorage.clear(); 
    })