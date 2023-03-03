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
function addImageFunction() {
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
}

function addVideoFunction () {
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
}

attachImageBtn.addEventListener('click' , addImageFunction)
attachVideoBtn.addEventListener('click' , addVideoFunction)

let allImagesUrls = document.querySelectorAll('.imagesattacheddiv input');
let imageUrlFieldInputTag = document.querySelector('.imageurlfield');
allImagesUrls.forEach(inputTag => {
    imageUrlFieldInputTag.value = inputTag.value;
    // inputTag.remove();
    addImageFunction();
})

let allVideosUrls = document.querySelectorAll('.videosattacheddiv input');
let videoUrlFieldInputTag = document.querySelector('.videourlfield');
allVideosUrls.forEach(inputTag => {
    videoUrlFieldInputTag.value = inputTag.value;
    // inputTag.remove();
    addVideoFunction();
})

