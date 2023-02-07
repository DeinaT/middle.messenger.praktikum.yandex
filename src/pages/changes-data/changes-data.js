import changes_data_template from './changes-data.hbs';
import '../../components/button/button.js'
import '../../components/input/input.js'
import '../../css/style.sass'

window.addEventListener('DOMContentLoaded', () => {
    const changes_data = document.querySelector('#changes_data');

    changes_data.innerHTML = changes_data_template();
});