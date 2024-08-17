const form = document.querySelector('#formulario');
const result = document.querySelector('#resultado');

window.onload = () => {
    form.addEventListener('submit', validateForm);
}

function validateForm(e){
    e.preventDefault();

    const search = document.querySelector('#termino').value;

    if(search ===''){
        showAlert(`It can't be empty`);
        return
    }

    const key = '45474888-2744e73ea41eee74ea2d3e78e';
    const url = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=100`

    //traer los datos de la api
    fetch(url)
        .then(request => {
            return request.json();
        })
        .then(result => showImg(result.hits))
}

function showAlert(message){
    const existAlert = document.querySelector('.bg-red-100');
    if(!existAlert){
        const alertDiv = document.createElement('P');
        alertDiv.classList.add('bg-red-100','border-red-400','text-red-700','px-4','py-3','rounded','max-w-lg','mx-auto','mt-6','text-center')
        alertDiv.innerHTML = `
            <strong class="font-bold"> Error! </strong>
            <span class="block sm:inline"> ${message} </span>
        `
        result.appendChild(alertDiv);
        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
    }
}

function showImg(img){
    deleteHtml();
    img.forEach(imgPixabay => {
        const {likes,views,previewURL,largeImageURL,tags} = imgPixabay
        const resultDiv = document.createElement('DIV');
        resultDiv.classList.add('w-1/2','md:w-1/3','lg:w-1/4','p-3','mb-4')
        resultDiv.innerHTML = `
            <div class="bg-white p-2 rounded">
                <img class="w-full h-64 object-cover" src="${previewURL}" alt="Img de ${tags}">
                <p> <strong> ${likes} </strong> i like you </p>
                <p> <strong> ${views} </strong> views</p>
                <a class="block w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5 p-1"
                    href="${largeImageURL}" 
                    target="_blank" class="text-blue-500"> Ver imagen </a>
            </div>
        `

        result.appendChild(resultDiv)
    });
}

function deleteHtml(){
    while(result.firstChild){
        result.removeChild(result.firstChild)
    }
}