import React from 'react'

export default function ConfirmDelete(id) {


  function doSomething(){
    document.getElementById('id_confrmdiv'); //this is the replace of this line

    document.getElementById('id_truebtn').onClick = function(){
      fetch(`https://backpfhenryv2.herokuapp.com/habitaciones/${id}`,
      {
        method: 'DELETE',
        headers: {
          api: `b1eb0ff9c64d38b4e55d56d45047188a9baa1b3c572f349d815a517e976e0c78e48e61224f04ee990f25f75fe4dc66a7f9a6196a950faa997a65749b012853f6`
        } 
      }
    )
      .then((response) => response.json())
      .then((data) => {
      getAllRooms()
      })
      .catch((error) => {
        if (error.response) {
          const { response } = error;
          console.log(response.data);
          console.log(response.status);
          console.log(response.headers);
        }
      });
        alert('true');
    };
    document.getElementById('id_falsebtn').onClick = function(){
         alert('false');
       return false;
    };
}

  return (
    <div>
      <div id="id_confrmdiv">If you DELETE all the room data will be lost!!! Are you sure you want to delete?
        <button id="id_truebtn">Yes</button>
        <button id="id_falsebtn">No</button>
      </div>
      <button onclick="doSomething()">submit</button>
    </div>
  )
}
