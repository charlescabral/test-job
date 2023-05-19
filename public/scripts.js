(function () {
    'use strict';

    function queryVerify() {
      const urlParams = new URLSearchParams(window.location.search);
      const query = urlParams.get('oportunity');
      return {
        isHome: !query,
        query: query
      };
    }
    function setFeature(number, string, icon) {
      if (!number) return;
      const plural = number > 1 ? `s` : '';
      document.querySelector('.features').innerHTML += `
        <li>
            <i class="featureIcon ${icon}"></i>
            <p>${number} ${string + plural}</p>
        </li>
    `;
    }

    async function getList() {
      const response = await fetch("/oportunities");
      return await response.json();
    }
    async function getOportunity(query) {
      const response = await fetch(`/oportunity/${query}`);
      return await response.json();
    }

    const CUSTOM_SELECT_CLASSNAME_WRAPPER = 'custom-select-wrapper';
    const CUSTOM_SELECT_CLASSNAME_HIDDEN = 'custom-select-hidden';
    const CUSTOM_SELECT_CLASSNAME_OPTIONS = 'custom-select-options';
    const CUSTOM_SELECT_CLASSNAME_OPTIONS_IS_OPEN = 'custom-select-is-open';
    const CUSTOM_SELECT_CLASSNAME_OPTION = 'custom-select-option';
    const CUSTOM_SELECT_CLASSNAME_OPTION_SELECTED = 'custom-select-option-selected';
    const CUSTOM_SELECT_CLASSNAME_HEAD = 'custom-select-head';
    const CUSTOM_SELECT_CLASSNAME_VALUE = 'custom-select-value';
    const CUSTOM_ON_CHANGE_EVENT = 'onChange';

    const defaultSettings = {
      containerClass: '',
      selectValueClass: '',
      headClass: '',
      optionsClass: ''
    };
    function CustomSelect(selector, settings = defaultSettings) {
      if (!validateSelectElement(selector)) {
        throw new Error('Validation select element error!');
      }
      const newOnChange = new Event(CUSTOM_ON_CHANGE_EVENT);
      const originSelectElement = document.querySelector(selector);
      const globalNewSelectElement = document.createElement('div');
      const globalSelectValueElement = document.createElement('div');
      const newSelectHeadElement = document.createElement('div');
      const newOptionsElement = document.createElement('div');
      originSelectElement.insertAdjacentElement('beforebegin', globalNewSelectElement);
      globalNewSelectElement.append(originSelectElement);
      addMainClassNames();
      addAdditionalClassNames();
      createNewSelectHead();
      createNewSelectOptions();
      addOutsideClickEvent();
      function addMainClassNames() {
        originSelectElement.classList.add(CUSTOM_SELECT_CLASSNAME_HIDDEN);
        globalNewSelectElement.classList.add(CUSTOM_SELECT_CLASSNAME_WRAPPER);
        globalSelectValueElement.classList.add(CUSTOM_SELECT_CLASSNAME_VALUE);
        newSelectHeadElement.classList.add(CUSTOM_SELECT_CLASSNAME_HEAD);
        newOptionsElement.classList.add(CUSTOM_SELECT_CLASSNAME_OPTIONS);
      }
      function addAdditionalClassNames() {
        const {
          containerClass,
          headClass,
          optionsClass,
          selectValueClass
        } = settings;
        if (containerClass) {
          globalNewSelectElement.classList.add(containerClass);
        }
        if (selectValueClass) {
          globalSelectValueElement.classList.add(selectValueClass);
        }
        if (headClass) {
          newSelectHeadElement.classList.add(headClass);
        }
        if (optionsClass) {
          newOptionsElement.classList.add(optionsClass);
        }
      }
      function validateSelectElement(element) {
        if (element && typeof element === 'string') {
          const elementItem = document.querySelectorAll(element)?.[0];
          if (elementItem instanceof HTMLElement && elementItem.tagName.toUpperCase() === 'SELECT') {
            return true;
          }
        }
        return false;
      }
      function createNewSelectHead() {
        newSelectHeadElement.addEventListener('click', () => {
          globalNewSelectElement.classList.toggle(CUSTOM_SELECT_CLASSNAME_OPTIONS_IS_OPEN);
        });
        const {
          label
        } = getValue();
        globalSelectValueElement.innerText = label;
        newSelectHeadElement.appendChild(globalSelectValueElement);
        globalNewSelectElement.append(newSelectHeadElement);
      }
      function createNewSelectOptions() {
        const {
          value: selectedOptionValue
        } = getValue();
        for (const optionItem of originSelectElement.options) {
          const newOptionItemElement = document.createElement('div');
          newOptionItemElement.classList.add(CUSTOM_SELECT_CLASSNAME_OPTION);
          if (optionItem.value === selectedOptionValue) {
            newOptionItemElement.classList.add(CUSTOM_SELECT_CLASSNAME_OPTION_SELECTED);
          }
          newOptionItemElement.setAttribute('data-value', optionItem.value);
          newOptionItemElement.innerText = optionItem.label;
          newOptionItemElement.addEventListener('click', e => {
            setValue(e.target.getAttribute('data-value'));
          });
          newOptionsElement.append(newOptionItemElement);
        }
        globalNewSelectElement.append(newOptionsElement);
      }
      function addOutsideClickEvent() {
        document.addEventListener('click', e => {
          if (!globalNewSelectElement.contains(e.target)) {
            closeMenu();
          }
        });
      }
      function closeMenu() {
        globalNewSelectElement.classList.remove(CUSTOM_SELECT_CLASSNAME_OPTIONS_IS_OPEN);
      }
      function setValue(value) {
        globalNewSelectElement.querySelectorAll(`.${CUSTOM_SELECT_CLASSNAME_OPTION}`).forEach(item => {
          item.classList.remove(CUSTOM_SELECT_CLASSNAME_OPTION_SELECTED);
          const dataValue = item.getAttribute('data-value');
          if (dataValue === value) {
            originSelectElement.value = value;
            globalSelectValueElement.innerText = item.innerHTML;
            item.classList.add(CUSTOM_SELECT_CLASSNAME_OPTION_SELECTED);
            closeMenu();
            globalNewSelectElement.dispatchEvent(newOnChange);
          }
        });
      }
      function getValue() {
        return {
          label: originSelectElement.selectedOptions?.[0].label,
          value: originSelectElement.selectedOptions?.[0].value
        };
      }
      function onChange(callback) {
        if (typeof callback !== 'function') return;
        globalNewSelectElement.addEventListener(CUSTOM_ON_CHANGE_EVENT, () => {
          callback(getValue());
        });
      }
      return {
        setValue,
        getValue,
        onChange
      };
    }

    function setupOportunities(element) {
      getList().then(res => {
        res.data.map(oportunity => {
          element.innerHTML += `
                <option value="/detail/?oportunity=${oportunity.idOportunidade}">
                    Cód. ${oportunity.idOportunidade} - ${oportunity.titulo}
                </option>
            `;
        });
      }).then(res => {
        const customSelect = new CustomSelect('.custom-select');
        const button = document.querySelector("#cta");
        button.disabled = true;
        button.addEventListener('click', () => {
          window.location.replace(customSelect.getValue().value);
        });
        customSelect.onChange(data => {
          const isFalse = parseInt(data.value);
          button.disabled = isFalse;
        });
      });
    }

    function setupOportunity(query) {
      getOportunity(query).then(res => {
        const cods = document.querySelectorAll('.cod');
        cods.forEach(cod => cod.innerHTML = `Cód. ${res.data.idOportunidade}`);
        const titles = document.querySelectorAll('.title');
        titles.forEach(title => title.innerHTML = res.data.titulo);
        const addresses = document.querySelectorAll('.address');
        addresses.forEach(address => address.innerHTML = `${res.data.logradouro}, ${res.data.numeroResidencia} - ${res.data.bairro} - ${res.data.cidade} - ${res.data.uf}`);
        document.querySelector('.description').innerHTML = res.data.descricao;
        document.querySelector('.benefits').innerHTML = res.data.beneficios;
        setFeature(res.data.dormitorios, 'Dormitório', 'bedroom');
        setFeature(res.data.vagas, 'Vaga', 'garage');
        setFeature(res.data.suite, 'Suíte', 'suite');
        setFeature(res.data.banheiros, 'Banheiro', 'bathroom');
      });
    }

    if (queryVerify().isHome) {
      setupOportunities(document.querySelector('#oportunities'));
    } else {
      setupOportunity(queryVerify().query);
    }

})();
