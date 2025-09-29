
const tbodey = document.getElementById('tbody')
const boton = document.getElementById('button')
const botonCancel = document.getElementById('buttonCancel')

let data = JSON.parse(localStorage.getItem('users')) || []

let uid = data.length > 0 ? Math.max(...data.map(u => Number(u.id))) + 1 : 1


let editIdi = null


const renderaizer = () => {
    tbodey.innerHTML = ''


    data.forEach(user => {

        const { id, name, lastName, role, age, profetion } = user
        const row = document.createElement('tr')

        row.innerHTML = `
    <td>${id}</td>
    <td>${name}</td>
    <td>${lastName}</td>
    <td>${role}</td>
    <td>${age}</td>
    <td>${profetion}</td>
    <td class="accionsContainer">
        <button class="update" data-id="${id}" >Update</button>
        <button class="delete" data-id="${id}" >Delete</button>
    </td>
    
    `
        tbodey.append(row)

    })

}

botonCancel.addEventListener("click", () => {
    boton.textContent = "Create"
    editIdi = null

    document.getElementById('name').value = ''
    document.getElementById('lastname').value = ''
    document.getElementById('role').value = ''
    document.getElementById('age').value = ''
    document.getElementById('profetion').value = ''

    botonCancel.classList.add('buttonCancelOff')
    boton.classList.remove('buttonUpdate')

})


tbodey.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        let sure = confirm('Quieres borrar este elemento?')
        if (!sure) return
        const borrado = e.target.getAttribute('data-id')
        data = data.filter(user => user.id !== borrado)
        localStorage.setItem('users', JSON.stringify(data))
        renderaizer()
    }
})

tbodey.addEventListener('click', (e) => {
    if (e.target.classList.contains('update')) {
        botonCancel.classList.remove('buttonCancelOff')
        const findItem = e.target.getAttribute('data-id')
        const updateItem = data.find(u => u.id == findItem)
        const { name, lastName, role, age, profetion } = updateItem

        document.getElementById('name').value = name
        document.getElementById('lastname').value = lastName
        document.getElementById('role').value = role
        document.getElementById('age').value = age
        document.getElementById('profetion').value = profetion

        editIdi = findItem
        boton.textContent = 'Update'
        boton.classList.add('buttonUpdate')

    }
})


renderaizer()
boton.addEventListener("click", () => {

    if (editIdi) {

        const index = data.findIndex(u => u.id == editIdi)
        if (index !== -1) {
            data[index].name = document.getElementById('name').value;
            data[index].lastName = document.getElementById('lastname').value;
            data[index].role = document.getElementById('role').value;
            data[index].age = document.getElementById('age').value;
            data[index].profetion = document.getElementById('profetion').value;
        }

        editIdi = null
        boton.textContent = "Create"
        boton.classList.remove('buttonUpdate')
        botonCancel.classList.add('buttonCancelOff')
        

    } else {

        let user = {
            id: uid,
            name: document.getElementById('name').value,
            lastName: document.getElementById('lastname').value,
            role: document.getElementById('role').value,
            age: document.getElementById('age').value,
            profetion: document.getElementById('profetion').value

        }

        const { id, name, lastName, role, age, profetion } = user

        if (name == '' || lastName == '' || role == '' || age == '' || profetion == '') return alert('Aun hay campos sin completar')
        if (!isNaN(name) || !isNaN(lastName) || !isNaN(role) || !isNaN(profetion)) return alert('No se admiten números')

        data.push(user)
        uid++

        console.log(data)


    }

    localStorage.setItem('users', JSON.stringify(data))
    renderaizer()

    document.getElementById('name').value = ''
    document.getElementById('lastname').value = ''
    document.getElementById('role').value = ''
    document.getElementById('age').value = ''
    document.getElementById('profetion').value = ''

})