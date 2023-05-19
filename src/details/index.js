import { getOportunity } from '../data.js'
import { setFeature } from '../helpers.js'


export function setupOportunity(query) {
    getOportunity(query).then(res => {
        const cods = document.querySelectorAll('.cod')
        cods.forEach((cod) => cod.innerHTML = `Cód. ${res.data.idOportunidade}`)

        const titles = document.querySelectorAll('.title')
        titles.forEach((title) => title.innerHTML = res.data.titulo)

        const addresses = document.querySelectorAll('.address')
        addresses.forEach((address) => address.innerHTML = `${res.data.logradouro}, ${res.data.numeroResidencia} - ${res.data.bairro} - ${res.data.cidade} - ${res.data.uf}`)

        document.querySelector('.description').innerHTML = res.data.descricao
        document.querySelector('.benefits').innerHTML = res.data.beneficios

        setFeature(res.data.dormitorios, 'Dormitório', 'bedroom')
        setFeature(res.data.vagas, 'Vaga', 'garage')
        setFeature(res.data.suite, 'Suíte', 'suite')
        setFeature(res.data.banheiros, 'Banheiro', 'bathroom')
    })
}
  