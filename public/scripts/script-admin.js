function adminEdit(index) {
    username = document.getElementById("inputName").innerHTML;
    var r = prompt("Please write the new User Name from User in index " + index + ' .');
    if (r) {
        var url = '/admin/edit/?username=' + username + '&newUsername='+ r;
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", url, true); // false for synchronous request
        //xmlHttp.send(r);
        alert('The username '+ username +' changed to '+ r + '. Done !')
    } else {
      alert("It's cencel");
      console.log("It's cancel");
    }
}

function searchByNameOrPhone() {
    // Declare variables
    var firstInput, secondInput, firstFilter, secondFilter, table, tr, first_td, second_td, i, first_txtValue, second_txtValue;
    firstInput = document.getElementById("inputFirstName");
    secondInput = document.getElementById("inputSecond");
    firstFilter = firstInput.value.toUpperCase();
    secondFilter = secondInput.value.toUpperCase();
    table = document.getElementById("usersTable");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      first_td = tr[i].getElementsByTagName("td")[1];
      second_td = tr[i].getElementsByTagName("td")[2];
      if (first_td || second_td) {
        first_txtValue = first_td.textContent || first_td.innerText;
        second_txtValue = second_td.textContent || second_td.innerText;
        if (first_txtValue.toUpperCase().indexOf(firstFilter) > -1 && second_txtValue.toUpperCase().indexOf(secondFilter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
  