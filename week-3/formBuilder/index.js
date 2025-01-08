let formPreviewDiv=document.querySelector('.previewForm');
let fieldTypeInput=document.getElementById('fieldType');
let fieldLabelInput=document.getElementById('fieldLabel');



function loadComponent(){
//     const deleteButton= document.createElement('button');
//     deleteButton.innerText='Delete';
//     deleteButton.setAttribute('onclick','deleteForm()');

    let previewType = document.createElement(`input`);
    previewType.type= fieldTypeInput.value.toLowerCase();

    let previewLabel = document.createElement('label');
    previewLabel.innerHTML=fieldLabelInput.value

    formPreviewDiv.appendChild(previewLabel);
    formPreviewDiv.appendChild(previewType);
    formPreviewDiv.appendChild(deleteButton);
    

    
}

function addForm(){
    if (fieldLabelInput.value.trim()===''){
        alert('Field Label is required');
        return;
    }
    document.querySelector('.previewForm').innerHTML='';
    loadComponent();
}




