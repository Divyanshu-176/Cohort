function loadCard() {
    let cardDiv = document.createElement('div');
    cardDiv.setAttribute('class', 'card');
    cardDiv.setAttribute('draggable', 'true');

    cardDiv.innerHTML = `<h2 class="cardTitle" contenteditable="true">Task Title</h2>
              <h3 class="cardDes" contenteditable="true">Task Description</h3>

              <select name="taskImp" class="taskStat">
                  <option value="High" id="highImp">High</option>
                  <option value="Medium" id="medImp">Medium</option>
                  <option value="Low" id="lowImp">Low</option>
              </select>`;

    return cardDiv;
}
function addnew(category) {
    let newCard = loadCard();
    document.querySelector(`#cardPlace${category}`).appendChild(newCard);

    statColor(newCard);




  //Help Here
    newCard.addEventListener("dragstart", function(e) {
        let selected = e.target;

        let area = document.getElementById(`cardPlace${category}`);
        area.addEventListener("dragover", function(e) {
            e.preventDefault();
        });

        area.addEventListener("drop", function(e) {
            area.appendChild(selected);
            selected = null;
        });
    });
}



function statColor(newCard) {
    let status = newCard.querySelector('.taskStat');
    status.addEventListener('change', () => {
        if (status.value === 'High') {
            status.style.backgroundColor = '#f44336';
        } else if (status.value === 'Medium') {
            status.style.backgroundColor = '#ff9800';
        } else if (status.value === 'Low') {
            status.style.backgroundColor = '#4caf50';
        }
    });

}




