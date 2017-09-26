
$(document).ready(function()
    {
        //$("#submit").click(function(e){
        $('#submit').on('click', submit);
        function submit() {
            console.log("this one");
            var data_for_submit={};
            data_for_submit.title= String($("#inputid1").val());
            data_for_submit.content=String($("#inputid2").val());
          $.ajax({ //for communicating to server
                  
                  url: "http://localhost:5000/submit",// this need to be url where we hosting our server
                  method: "POST",
                  contentType: "application/json",
                  data: JSON.stringify(data_for_submit),
                  success: function(response){
                    console.log(response);
                    },
                    error: function(response) {
                        alert("Communication to server fail");
                    }
                }) 
        }
       // })   
    })

    