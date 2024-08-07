// inputs
const names=$('#name');
const surname=$('#surname');
const phonenumber=$('#phonenumber');
const streetname=$('#streetname');
const streetname2=$('#streetname2');
const city=$('#city');
const postcode=$('#postcode');

const searchInput=$('.search-bar')
//buttons
const submitbtn=$('.submit-form');
const searchbtn=$('.search-button');
const addbtn= $('.add-btn');
const cancelForm=$('.cancel-form')

//display



// functions
const searches = () => {
    const $tr=$('tr')
    // regular expresseion to make search more comprehennsive
    let search = searchInput.val().toLowerCase().trim().replace(/\s+/g, ' ').replace(/[.,-]/g, '');
    
    
    $tr.each(function() {
        let row = $(this);
        let firstCellText = row.find('td:first-child').text().toLowerCase();
        if (firstCellText.includes(search)) {
            row.show();
        } else {
            row.hide();
        }
    });
}


const addContact = ()=>{
    $('.contact-form').css('display','block')
    $('.display').css('display','none')
    $('.error').text('')
}




const submits = (event)=>{
   // learnt how to get value from inputs with jquery
    // URL: https://www.youtube.com/watch?v=h0OKBGe4s5Q
   event.preventDefault();


if (names.val()!==''&&
    surname.val()!==''&&
    phonenumber.val()!==''&&
    streetname.val()!==''&&
    city.val()!==''&&
    postcode.val()!==''
){
    let tr =$('<tr>');
    let tdName=$('<td>')
    let tdNumber=$('<td>')
    let tdStreet=$('<td>')
    let tdCity=$('<td>')
    let tdCode=$('<td>')
    let tdAction = $('<td>');
    let deleteButton = $('<button>').html('<i class="fa-solid fa-trash-can"></i> <span>Delete</span>').addClass('delete');


    tr.append(tdName, tdNumber, tdStreet, tdCity, tdCode, tdAction);
    // setting the text of the table to the form field values
    tdName.text(`${names.val()} ${surname.val()}`)
    tdNumber.html('<span class="hide"><i class="fa-solid fa-phone"></i></span> ' + phonenumber.val())
    tdStreet.text(`${streetname.val()} ${streetname2.val()}`)
    tdCity.text(city.val())
    tdCode.text(postcode.val())
    tdAction.append(deleteButton);


    $('.contact-table').append(tr)

     // Clearing form fields
     names.val('');
     surname.val('');
     phonenumber.val('');
     streetname.val('');
     streetname2.val('');
     city.val('');
     postcode.val('');

    $('.contact-form').css('display','none')
    $('.display').css('display','block')
}else {
    let validation = [names.val(),surname.val(),phonenumber.val(),streetname.val(),city.val(),postcode.val()]
   for(let i=0;i<validation.length;i++){
    if(validation[i]==''){
    $('.error'+i).text('is required')
    }
   }
   
}
totalContacts();

}



//  adding event listeners
addbtn.on('click', addContact);
submitbtn.on('click',submits);

searchInput.on('keyup',searches);


const cancelForms=(event)=>{
    event.preventDefault();
    $('.contact-form').css('display','none')
    $('.display').css('display','block')
    //removes isrequired message then closing form
    $('.error').text('')
}

cancelForm.on('click', cancelForms )

// Delete contact inspired by radwan503 AddRemoveTable--Jquery on GitHub
// https://github.com/radwan503/AddRemoveTable--Jquery

    $(document).on('click', '.delete', function() {
        let verify = confirm("Are you sure you want to delete contact details for "+$(this).closest('tr').find('td:first').text());
if (verify) {
    //Logic to delete the item
    $(this).closest('tr').remove();
        totalContacts();
        
}
    });


const totalContacts =()=>{
    if($('tbody tr').length===1){
        $('.totalContacts h3').text('1 Contact')

    }else
    $('.totalContacts h3').text($('tbody tr').length + ' Contacts')
    }

totalContacts();
