const grid = document.getElementById('grid');

const lightColors = [
    { name: 'Moon Raker', hex: '#e7cef4' },
    { name: 'Malibu', hex: '#97dcf5' },
    { name: 'Cream Can', hex: '#f6cb5e' },
    { name: 'Mischka', hex: '#e5e0e6' },
    { name: 'Riptide', hex: '#83e1e3' },
    { name: 'Drover', hex: '#fbfab1' },
    { name: 'Bright Green', hex: '#61f504' },
    { name: 'Snuff', hex: '#dce0ef' },
    { name: 'Picton Blue', hex: '#35daf0' },
    { name: 'Prelude', hex: '#cac0e9' },
    { name: 'Deco', hex: '#d0d888' },
    { name: 'Sandwisp', hex: '#eaf4ae' },
    { name: 'Lola', hex: '#e3d4df' },
    { name: 'Rob Roy', hex: '#efcb6a' },
    { name: 'Sinbad', hex: '#9fcbd8' },
    { name: 'French Lilac', hex: '#e7d5f3' },
    { name: 'Cherub', hex: '#f5cbe6' },
    { name: 'Aqua Island', hex: '#a3c9db' },
    { name: 'Green Yellow', hex: '#99fc27' },
    { name: 'Melanie', hex: '#dcbcd4' },
    { name: 'Lightning Yellow', hex: '#fbca29' },
    { name: 'Banana Mania', hex: '#fbefa8' },
    { name: 'Bermuda', hex: '#89d8d0' },
    { name: 'Geyser', hex: '#e0e4e7' },
    { name: 'Fall Green', hex: '#eae9b1' },
];

const darkColors = [
    { name: 'Blue', hex: '#4616f4' },
    { name: 'Electric Violet', hex: '#5f2afe' },
    { name: 'Indigo', hex: '#4361c4' },
    { name: 'Green Pea', hex: '#19623c' },
    { name: 'Cornflower', hex: '#4977eb' },
    { name: 'Salem', hex: '#0a6e3e' },
    { name: 'Medium Purple', hex: '#9556de' },
    { name: 'Smoky', hex: '#5d556d' },
    { name: 'Governor Bay', hex: '#4f3cb8' },
    { name: 'Cranberry', hex: '#d95b7a' },
    { name: 'Elm', hex: '#1e6b71' },
    { name: 'Cadillac', hex: '#a3487d' },
    { name: 'Razzmatazz', hex: '#d81153' },
    { name: 'Purple Heart', hex: '#4c3dcf' },
    { name: 'Cerise', hex: '#cf2a74' },
    { name: 'Amaranth', hex: '#ef345d' },
    { name: 'Killarney', hex: '#2a6532' },
    { name: 'Cabaret', hex: '#d6407a' },
    { name: 'Coral Tree', hex: '#a86e7f' },
    { name: 'Strikemaster', hex: '#8c5d7a' },
    { name: 'Cerulean Blue', hex: '#2c46d9' },
    { name: 'Lochinvar', hex: '#278589' },
    { name: 'Comet', hex: '#585770' },
    { name: 'Tapestry', hex: '#a05077' },
    { name: 'Science Blue', hex: '#0569e3' },
];

grid.innerHTML = '';

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function hexToRgb(hex) {
    let r = 0, g = 0, b = 0;
    if (hex.length == 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length == 7) {
        r = parseInt(hex[1] + hex[2], 16);
        g = parseInt(hex[3] + hex[4], 16);
        b = parseInt(hex[5] + hex[6], 16);
    }
    return { r, g, b };
}

function luminance(r, g, b) {
    const a = [r, g, b].map(function (v) {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function contrastRatio(hex1, hex2) {
    const rgb1 = hexToRgb(hex1);
    const rgb2 = hexToRgb(hex2);
    const lum1 = luminance(rgb1.r, rgb1.g, rgb1.b);
    const lum2 = luminance(rgb2.r, rgb2.g, rgb2.b);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
}

function createCard() {
    const card = document.createElement('div');
    card.classList.add('card');

    const isLightBackground = Math.random() > 0.5;
    const bgColor = isLightBackground ? getRandomElement(lightColors) : getRandomElement(darkColors);
    const textColor = isLightBackground ? getRandomElement(darkColors) : getRandomElement(lightColors);

    card.style.backgroundColor = bgColor.hex;
    card.style.color = textColor.hex;

    const ratio = contrastRatio(bgColor.hex, textColor.hex);

    const bgColorName = document.createElement('h2');
    bgColorName.classList.add('bg-color-name');
    bgColorName.textContent = `${bgColor.name}`;

    const textColorName = document.createElement('p');
    textColorName.classList.add('text-color-name');
    textColorName.textContent = `and ${textColor.name}`;

    const lcText = textColor.name.toLowerCase();
    const lcBg = bgColor.name.toLowerCase();

    const sentence = document.createElement('p');
    sentence.classList.add('sentence');
    sentence.textContent = `The quick, ${lcBg}, and ${lcText} fox jumped over the lazy dog.`;

    const nameWrap = document.createElement('div');
    nameWrap.classList.add('name-wrap');
    nameWrap.appendChild(bgColorName);
    nameWrap.appendChild(textColorName);

    const container = document.createElement('div');
    container.classList.add('container');
    container.appendChild(nameWrap);
    container.appendChild(sentence);

    const fixedRatio = ratio.toFixed(2);

    let wcagLevel;

    if (fixedRatio >= 7) {
        wcagLevel = 'AAA'
    } else if (fixedRatio >= 4.5) {
        wcagLevel = 'AA'
    } else {
        wcagLevel = 'A';
    }

    const ratioText = document.createElement('p');
    nameWrap.appendChild(ratioText);
    ratioText.textContent = `Contrast: ${fixedRatio} (${wcagLevel})`;
    ratioText.style.fontSize = '12px';

    card.appendChild(container);
    return card;
}

const numberOfCards = 50;

for (let i = 0; i < numberOfCards; i++) {
    const card = createCard();
    grid.appendChild(card);
}
