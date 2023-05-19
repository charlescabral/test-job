import { getList } from './data.js'
import CustomSelect from './custom-select.js'


export function setupOportunities(element) {
    
    getList().then(res => {
        res.data.map((oportunity => {
            element.innerHTML += `
                <option value="/detail/?oportunity=${oportunity.idOportunidade}">
                    Cód. ${oportunity.idOportunidade} - ${oportunity.titulo}
                </option>
            `
        }))
    }).then(res => {
        const customSelect = new CustomSelect('.custom-select');
        const button = document.querySelector("#cta")

        button.disabled = true

        button.addEventListener( 'click', () => {
            window.location.replace(customSelect.getValue().value)
        });
    
        customSelect.onChange((data) => {
            const isFalse = parseInt(data.value)
            button.disabled = isFalse
        })
    })
}
  