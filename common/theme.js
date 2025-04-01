
const SUN_ICON_RAW = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><g fill="none" stroke-width="9" stroke="#000"><path d="M28.5 19.93c0 4.812-3.871 8.715-8.645 8.715-4.773 0-8.64-3.903-8.64-8.715 0-4.813 3.867-8.715 8.64-8.715 4.774 0 8.645 3.902 8.645 8.715zm0 0M19.93 8.93v-6.5M19.93 37.418v-6.5M30.723 19.797h6.5M2.45 19.715h6.5M7.258 7.828l4.594 4.598M27.625 27.637l4.598 4.593M27.77 12.305l4.593-4.598M7.34 32.078l4.594-4.598" stroke-width=".9"/></g></svg>'
const MOON_ICON_RAW = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><path d="M25.313 20c0-6.23 3.355-12.047 8.761-15.176l1.852-1.07-1.852-1.07a19.951 19.951 0 00-10-2.684 19.865 19.865 0 00-14.14 5.86A19.865 19.865 0 004.074 20a19.865 19.865 0 005.86 14.14A19.865 19.865 0 0024.074 40c3.512 0 6.969-.926 10-2.684l1.852-1.07-1.852-1.07c-5.406-3.13-8.761-8.946-8.761-15.176zm-1.239 17.527C14.41 37.527 6.547 29.664 6.547 20c0-9.664 7.863-17.527 17.527-17.527 2.383 0 4.735.488 6.91 1.422a20.122 20.122 0 00-5.386 5.964 19.992 19.992 0 005.386 26.246 17.53 17.53 0 01-6.91 1.422zm0 0"/></svg>'
const SUN_ICON_DATA_URI = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%3E%3Cg%20fill%3D%22none%22%20stroke-width%3D%229%22%20stroke%3D%22%23000%22%3E%3Cpath%20d%3D%22M28.5%2019.93c0%204.812-3.871%208.715-8.645%208.715-4.773%200-8.64-3.903-8.64-8.715%200-4.813%203.867-8.715%208.64-8.715%204.774%200%208.645%203.902%208.645%208.715zm0%200M19.93%208.93v-6.5M19.93%2037.418v-6.5M30.723%2019.797h6.5M2.45%2019.715h6.5M7.258%207.828l4.594%204.598M27.625%2027.637l4.598%204.593M27.77%2012.305l4.593-4.598M7.34%2032.078l4.594-4.598%22%20stroke-width%3D%22.9%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E'
const MOON_ICON_DATA_URI = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%3E%3Cpath%20d%3D%22M25.313%2020c0-6.23%203.355-12.047%208.761-15.176l1.852-1.07-1.852-1.07a19.95%2019.95%200%200%200-10-2.684%2019.86%2019.86%200%200%200-14.14%205.86A19.86%2019.86%200%200%200%204.074%2020a19.86%2019.86%200%200%200%205.86%2014.14A19.86%2019.86%200%200%200%2024.074%2040c3.512%200%206.969-.926%2010-2.684l1.852-1.07-1.852-1.07c-5.406-3.13-8.761-8.946-8.761-15.176m-1.239%2017.527C14.41%2037.527%206.547%2029.664%206.547%2020S14.41%202.473%2024.074%202.473c2.383%200%204.735.488%206.91%201.422a20.1%2020.1%200%200%200-5.386%205.964%2019.99%2019.99%200%200%200%205.386%2026.246%2017.5%2017.5%200%200%201-6.91%201.422m0%200%22%2F%3E%3C%2Fsvg%3E'

function getTheme() {
    return localStorage.getItem('theme') ?? 'light'
}

function getThemeIcon(theme) {
    return theme === 'light' ? MOON_ICON_DATA_URI : SUN_ICON_DATA_URI
}

function updateDocumentTheme(theme) {
    document.getElementsByTagName('html')[0].setAttribute('theme', theme)
}

class ThemeToggleButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const theme = getTheme()

        this.themeContainer = document.createElement('div');
        this.themeButton = document.createElement('button');
        this.themeButton.id = 'theme-toggle';
        

        this.themeImage = document.createElement('img');
        this.themeImage.id = 'theme-image';
        this.themeImage.setAttribute('theme', theme);
        this.themeImage.src = getThemeIcon(theme);

        this.themeButton.appendChild(this.themeImage);
        this.themeContainer.appendChild(this.themeButton);

        const style = document.createElement('style');
        style.textContent = `
            button {
                cursor: pointer;
                border: 1px solid transparent;
                padding: 3px;
                padding-bottom: none;
                border-radius: 5px;
                background: inherit;
                color: inherit;
            }
                
            button:hover {
                border: 1px solid;
            }

            #theme-image[theme="dark"] {
                filter: invert(82%) sepia(5%) saturate(508%) hue-rotate(357deg) brightness(91%) contrast(93%);
            }
        `;

        this.shadowRoot.appendChild(this.themeContainer);
        this.shadowRoot.appendChild(style);

        this.themeButton = this.shadowRoot.querySelector('#theme-toggle');
        this.themeImage = this.shadowRoot.querySelector('#theme-image');

        this.themeButton.addEventListener('click', this.toggleTheme.bind(this));
        
        updateDocumentTheme(theme)
    }

    toggleTheme() {
        const theme = getTheme() === 'light' ? 'dark' : 'light'
        localStorage.setItem('theme', theme)
        this.themeImage.setAttribute('src', getThemeIcon(theme))
        this.themeImage.setAttribute('theme', theme)
        updateDocumentTheme(theme)
    }
}

customElements.define('theme-toggle', ThemeToggleButton);
// document.body.appendChild(document.createElement('theme-toggle'));