
const seeNotesBtn = document.querySelector('.seenotesbtn');
const addNotesDiv = document.getElementsByClassName('addnotesdiv')[0];
const viewNotesDiv = document.getElementsByClassName('viewnotesdiv')[0];

seeNotesBtn.addEventListener('click' , switchDivs);

function switchDivs() {
    if (addNotesDiv.style.display === "block") {
        addNotesDiv.style.display = "none";
        viewNotesDiv.style.display = "block";
        document.querySelector('.searchdiv').style.display = "block";
    } else if (viewNotesDiv.style.display === "block") {
        viewNotesDiv.style.display = "none"
        addNotesDiv.style.display = "block";
        document.querySelector('.searchdiv').style.display = "none";
    } else {
        alert('error switching tabs')
    }
}

const addImageBtn = document.querySelector('.addimagebtn');
const addVideoBtn = document.querySelector('.addvideobtn');


addImageBtn.addEventListener('click' , function() {
    let pasteImageUrlDiv = document.querySelector('.pasteimageurldiv');
    if (pasteImageUrlDiv.style.display == 'block') {
        pasteImageUrlDiv.style.display = 'none'
    } else {
        pasteImageUrlDiv.style.display = 'block'
    }
})
addVideoBtn.addEventListener('click' , function() {
    let pasteVideoUrlDiv = document.querySelector('.pastevideourldiv');
    if (pasteVideoUrlDiv.style.display == 'block') {
        pasteVideoUrlDiv.style.display = 'none'
    } else {
        pasteVideoUrlDiv.style.display = 'block'
    }
})

const attachImageBtn = document.querySelector('.attachimagebtn');
const attachVideoBtn = document.querySelector('.attachvideobtn')
let imgIds = 1;
let videoIds = 1;

function detachImg(thisImg , id) {
    thisImg.parentElement.remove();
    document.querySelector('.addnotesform').querySelector("#" + CSS.escape(id)).remove();
}
function detachVideo(thisImg , id) {
    thisImg.parentElement.remove();
    document.querySelector('.addnotesform').querySelector("#" + CSS.escape(id)).remove();
}

attachImageBtn.addEventListener('click' , function () {
    const addNotesForm = document.querySelector('.addnotesform');
    const newImageInput = document.createElement('input');
    newImageInput.setAttribute("type" , "hidden");
    newImageInput.setAttribute("name" , "imageUrl")
    newImageInput.id = imgIds;
    newImageInput.value = document.querySelector('.imageurlfield').value;
    addNotesForm.appendChild(newImageInput);

    let pasteImageUrlDiv = document.querySelector('.pasteimageurldiv');
    pasteImageUrlDiv.style.display = "none";

    const imagesAttachedDiv = document.querySelector('.imagesattacheddiv')
    imagesAttachedDiv.style.display = 'flex';

    const container = document.createElement('div');
    container.id = imgIds++;
    container.className = 'container';
    container.style.position = 'relative';
    const cross = document.createElement('img');
    cross.src = "https://thumbs.dreamstime.com/b/check-marks-red-cross-icon-simple-vector-illustration-140098693.jpg"
    cross.style.position = 'absolute';
    cross.style.top = 0;
    cross.style.right = 0;
    cross.style.width = '20px';
    cross.style.cursor = 'pointer';
    cross.addEventListener('click' , function(){let thisimg = this; detachImg(thisimg , container.id)});
    container.append(cross)

    const imageToAttach = document.createElement('img');
    imageToAttach.style.width = '100px';
    imageToAttach.src = document.querySelector('.imageurlfield').value;
    container.appendChild(imageToAttach);
    imagesAttachedDiv.appendChild(container)
})

attachVideoBtn.addEventListener('click' , function () {
    const addNotesForm = document.querySelector('.addnotesform');
    const newVideoInput = document.createElement('input');
    newVideoInput.setAttribute("type" , "hidden");
    newVideoInput.setAttribute("name" , "videoUrl")
    newVideoInput.id = videoIds;
    newVideoInput.value = document.querySelector('.videourlfield').value;
    addNotesForm.appendChild(newVideoInput);

    let pasteVideoUrlDiv = document.querySelector('.pastevideourldiv');
    pasteVideoUrlDiv.style.display = "none";

    const videosAttachedDiv = document.querySelector('.videosattacheddiv')
    videosAttachedDiv.style.display = 'flex';

    const container = document.createElement('div');
    container.id = videoIds++;
    container.style.position = 'relative';
    container.className = 'container';
    let cross = document.createElement('img');
    cross.src = "https://thumbs.dreamstime.com/b/check-marks-red-cross-icon-simple-vector-illustration-140098693.jpg"
    cross.style.position = 'absolute';
    cross.style.top = 0;
    cross.style.right = 0;
    cross.style.width = '20px';
    cross.style.cursor = 'pointer';
    cross.addEventListener('click' , function(){let thisImg = this; detachVideo(thisImg , container.id)});
    container.append(cross)
    

    const iframeToAttach = document.createElement('iframe');
    iframeToAttach.style.width = '400px';
    iframeToAttach.src = document.querySelector('.videourlfield').value;
    container.appendChild(iframeToAttach);
    videosAttachedDiv.appendChild(container)
})

// notes search bar
const notesSearchbarDiv = document.querySelector('.searchdiv');
const notesSearchBar = document.querySelector('.searchdiv input')
const titles = document.querySelectorAll('.notediv h3');
notesSearchBar.addEventListener('keyup' , function() {
    // console.log(notesSearchBar , titles , notesSearchbarDiv)
    for (let i = 0; i < titles.length; i++) {
        let title = titles[i];
        console.log(notesSearchBar.value.toLowerCase())
        console.log(title.innerHTML.toLowerCase())
        console.log('---------------');
        
        if (title.innerHTML.toLowerCase().includes(notesSearchBar.value.toLowerCase())) {
            title.parentElement.style.display = "block";
        } else {
            title.parentElement.style.display = "none";
        }
    }
    
})
