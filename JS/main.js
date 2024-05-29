let display = document.getElementById('show');

let bookmarkContainer = [];

if(localStorage.getItem('AllBookmarks') == null){
    bookmarkContainer = [];
}else{
    bookmarkContainer = JSON.parse(localStorage.getItem('AllBookmarks'));
    showBookmarks();
}

document.getElementById('SiteName').addEventListener('input', validateName);
document.getElementById('SiteURL').addEventListener('input', validateURL);

function validateName() {
    let SiteName = document.getElementById('SiteName').value;
    let SiteNameError = document.getElementById('SiteNameError');

    if(SiteName.length > 3) {
        SiteNameError.textContent = '';
        return true;
    } else {
        SiteNameError.textContent = 'Name must be greater than 3 characters.';
        return false;
    }
}

function validateURL() {
    let SiteURL = document.getElementById('SiteURL').value;
    let SiteURLError = document.getElementById('SiteURLError');
    let urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

    if(urlPattern.test(SiteURL)) {
        SiteURLError.textContent = '';
        return true;
    } else {
        SiteURLError.textContent = 'Enter a valid URL.';
        return false;
    }
}

function addBookmark(){
    let SiteName= document.getElementById('SiteName').value;
    let SiteURL = document.getElementById('SiteURL').value;

    if(validateName() && validateURL()) {
        let Bookmark = {
            'SiteName': SiteName,
            'SiteURL': SiteURL,
        };
        bookmarkContainer.push(Bookmark);
        localStorage.setItem('AllBookmarks', JSON.stringify(bookmarkContainer));

        showBookmarks();
    }
}

function showBookmarks(){
    let box ='';

    for(let i = 0 ; i < bookmarkContainer.length; i++){
        box +=`
            <tr>
                <td>${i+1}</td>
                <td>${bookmarkContainer[i].SiteName}</td>
                <td>
                    <a href="${bookmarkContainer[i].SiteURL}" target="_blanck" class="btn btn-visit d-block m-auto"><i class="fa-solid fa-eye"></i> Visit</a>
                </td>
                <td>
                    <button class="btn btn-danger delete d-block m-auto" onclick="deleteBookmark(${i})"><i class="fa-solid fa-trash-can pe-1"></i>Delete</button>
                </td>
            </tr>
        `
    }

    display.innerHTML = box;
}


function deleteBookmark(index){
    bookmarkContainer.splice(index,1);
    showBookmarks();
    localStorage.setItem('AllBookmarks',JSON.stringify(bookmarkContainer));

}