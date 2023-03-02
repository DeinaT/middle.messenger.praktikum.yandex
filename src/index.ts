import Nav from './components/nav/nav';
import './css/style.sass';

window.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('#app')!;

    const navList = new Nav();
    root.append(navList.getContent()!);

    navList.dispatchComponentDidMount();
});
