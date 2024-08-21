const form = document.querySelector('#formulario');
const result = document.querySelector('#resultado');
const pageDiv = document.querySelector('#paginacion')

//crear variable para el generador
let pagPages = 40;
let iterador;
let totalPages;
let pageActual=1;


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
    
    validateApi();
}

async function validateApi(){
    const search = document.querySelector('#termino').value;
    const key = '45474888-2744e73ea41eee74ea2d3e78e';
    const url = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=${pagPages}&page=${pageActual}`

    //traer los datos de la api

    try {
        const request = await fetch(url)
        const result = await request.json()
        totalPages = getPage(result.totalHits)
        showImg(result.hits)
    } catch (error) {
        
    }
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
    deleteHtml(result);
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

        result.appendChild(resultDiv);

    });
    printGenerator();
}

function printGenerator(){
    deleteHtml(pageDiv)
    iterador = createPage(totalPages);
    while(true){
        const {value,done} = iterador.next();

        if(done) return;

        //cado contrario
        const buuton = document.createElement('A');
        buuton.href = '#';
        buuton.dataset.pag = value;
        buuton.textContent = value;
        buuton.classList.add('siguiente','bg-yellow-400','px-4','py-1','mr-2','font-bold','rounded')
        buuton.onclick = () => {
            pageActual = value
            validateApi();
        }
        pageDiv.appendChild(buuton);
    }
}


function getPage(total){
    return parseInt(Math.ceil(total/pagPages))
}

//Generador para la cantidad de elementos
function *createPage(total){
    for(let i = 1; i<=total; i++){
        yield i;
    }
}

function deleteHtml(param){
    while(param.firstChild){
        param.removeChild(param.firstChild)
    }
}