const searchbar = document.querySelector(".searchbar");
window.onload = search();

let timer = null;
searchbar.addEventListener('keyup' , function() {
  if (timer) {
    window.clearTimeout(timer)
  }
  timer = window.setTimeout(function() {
    timer = null;
    search();
  } , 1000)
})

function search() {
    const data = {
        title:searchbar.value
    }
      fetch('/seenotes', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((topics) => {
          populate(topics)

        })
        .catch((error) => {
          console.error('Error:', error);
        });
}

function populate(topics) {
    const ulToAttachTo = document.querySelector('ul');
    ulToAttachTo.innerHTML = '';
    for (i = 0; i < topics.length; i++) {
        let listElement = document.createElement('li');
        let aDiv = document.createElement('div'); aDiv.className = "adiv";
        let link = document.createElement('a');

        let editDeleteDiv = document.createElement("div"); editDeleteDiv.className = "editdeletediv"
        let editForm = document.createElement("form"); editForm.setAttribute("method" , "post"); editForm.action = `/edittopic/${topics[i]._id}`
        let deleteForm = document.createElement("form"); deleteForm.setAttribute("method" , "post"); deleteForm.action = `/deletetopic/${topics[i]._id}`
        let editFormBtn = document.createElement('button'); editFormBtn.setAttribute("type" , "submit"); editForm.className = "editnoteform";
        let deleteFormBtn = document.createElement("button"); deleteFormBtn.setAttribute("type" , "submit"); deleteForm.className = "deletenoteform";
        editFormBtn.innerHTML = "Edit";
        deleteFormBtn.innerHTML = "Delete"

        editForm.appendChild(editFormBtn);
        deleteForm.appendChild(deleteFormBtn)
        editDeleteDiv.appendChild(editForm);
        editDeleteDiv.appendChild(deleteForm);


        listElement.style.display = "flex";
        editDeleteDiv.style.display  = "flex";

        link.innerHTML = topics[i].title;
        link.href = `/seenotes/${topics[i]._id}`

        aDiv.appendChild(link)
        listElement.appendChild(aDiv)
        ulToAttachTo.appendChild(listElement);
        listElement.appendChild(editDeleteDiv);
    }
}
/*
        <form class="editnoteform" action="/editnote/<%=note.id%>?topicid=<%= topic.id %>" method="POST">
            <button>Edit</button>
        </form>
        <form class="deletenoteform" action="/deletenote/<%=note.id%>" method="POST">
        <button>Delete</button>
        </form>   
*/