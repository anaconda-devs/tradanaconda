const generateBtn = document.getElementById('generate-btn');
const signalResult = document.getElementById('signal-result');
const currencySelect = document.getElementById('currency-pair');
const timeframeSelect = document.getElementById('timeframe');
const languageSelect = document.getElementById('language');
const signalTime = document.getElementById('signal-time');

let currentSignal = null;
let loadingTimeout = null;

// Обновление времени
function updateTime() {
    const now = new Date();
    signalTime.textContent = now.toLocaleTimeString('ru-RU', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
    });
}
setInterval(updateTime, 1000);
updateTime();

// Функция загрузки сигнала
function generateSignal() {
    // Очищаем предыдущий таймаут
    if (loadingTimeout) clearTimeout(loadingTimeout);
    
    const pair = currencySelect.value;
    const timeframe = timeframeSelect.value;
    
    // Анимация загрузки
    generateBtn.classList.add('loading');
    generateBtn.disabled = true;
    
    signalResult.innerHTML = `
        <div class="loader">
            <div class="loader-spinner"></div>
            <div class="loader-text">
                Анализируем рынок...
                <small>Таймфрейм: ${timeframe}</small>
            </div>
        </div>
    `;
    
    // Имитация загрузки 2-3 секунды
    loadingTimeout = setTimeout(() => {
        // Рандомный сигнал
        const isBuy = Math.random() > 0.5;
        const probability = Math.floor(Math.random() * 15) + 70; // 70-85%
        
        signalResult.innerHTML = `
            <div class="signal-details">
                <div class="signal-pair">${pair}</div>
                <div class="signal-direction ${isBuy ? 'buy' : 'sell'}">
                    ${isBuy ? 'ПОКУПКА' : 'ПРОДАЖА'}
                </div>
                <div class="signal-probability">
                    Точность сигнала
                    <span>${probability}%</span>
                </div>
            </div>
        `;
        
        currentSignal = { pair, isBuy, probability };
        generateBtn.classList.remove('loading');
        generateBtn.disabled = false;
    }, 2000 + Math.random() * 1000); // 2-3 секунды
}

// Обработчик смены валютной пары
currencySelect.addEventListener('change', () => {
    if (currentSignal) {
        // Показываем анимацию загрузки при смене пары
        signalResult.classList.add('currency-loading');
        
        setTimeout(() => {
            signalResult.innerHTML = `
                <div class="skeleton">
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                </div>
            `;
            
            setTimeout(() => {
                signalResult.classList.remove('currency-loading');
                // Показываем старый сигнал или плейсхолдер
                if (currentSignal) {
                    const { pair, isBuy, probability } = currentSignal;
                    signalResult.innerHTML = `
                        <div class="signal-details">
                            <div class="signal-pair">${pair}</div>
                            <div class="signal-direction ${isBuy ? 'buy' : 'sell'}">
                                ${isBuy ? 'ПОКУПКА' : 'ПРОДАЖА'}
                            </div>
                            <div class="signal-probability">
                                Точность сигнала
                                <span>${probability}%</span>
                            </div>
                        </div>
                    `;
                } else {
                    signalResult.innerHTML = `
                        <div class="signal-placeholder">
                            Нажмите "Получить сигнал"
                        </div>
                    `;
                }
            }, 400);
        }, 200);
    }
});

// Генерация сигнала по кнопке
generateBtn.addEventListener('click', generateSignal);

// Смена языка (имитация)
languageSelect.addEventListener('change', (e) => {
    const lang = e.target.value;
    const texts = {
        ru: {
            btn: 'Получить сигнал',
            placeholder: 'Нажмите "Получить сигнал"',
            title: 'Торговый сигнал'
        },
        en: {
            btn: 'Get Signal',
            placeholder: 'Press "Get Signal"',
            title: 'Trading Signal'
        },
        uz: {
            btn: 'Signal olish',
            placeholder: '"Signal olish" tugmasini bosing',
            title: 'Savdo signali'
        }
    };
    
    generateBtn.textContent = texts[lang].btn;
    document.querySelector('.signal-header h2').textContent = texts[lang].title;
    
    if (!currentSignal) {
        document.querySelector('.signal-placeholder').textContent = texts[lang].placeholder;
    }
});
