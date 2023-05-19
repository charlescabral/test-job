
export function queryVerify() {
    const urlParams = new URLSearchParams(window.location.search)
    const query = urlParams.get('oportunity')
    return {
        isHome: !query,
        query: query
    }    
}

export function setFeature(number, string, icon) {
    if (!number) return
    const plural = number > 1 ? `s` : ''
    document.querySelector('.features').innerHTML += `
        <li>
            <i class="featureIcon ${icon}"></i>
            <p>${number} ${string + plural}</p>
        </li>
    `
    
}