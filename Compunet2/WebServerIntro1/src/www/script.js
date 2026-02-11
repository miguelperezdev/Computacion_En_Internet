// ===== INICIALIZACIÓN DEL SISTEMA =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('[SYSTEM] Initializing HACK interface...');

    // Actualizar fecha actual
    updateCurrentDate();

    // Inicializar terminal
    initTerminal();

    // Inicializar efectos de estado
    initStatusEffects();

    // Configurar eventos para imágenes
    setupImageEvents();

    // Efectos de sonido (opcional)
    initSoundEffects();

    console.log('[SYSTEM] Interface ready. Access granted.');
});

// ===== FUNCIÓN: ACTUALIZAR FECHA =====
function updateCurrentDate() {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).replace(/\//g, '-') + ' GMT';

    document.getElementById('currentDate').textContent = formattedDate;

    // Actualizar cada segundo
    setTimeout(updateCurrentDate, 1000);
}

// ===== FUNCIÓN: INICIALIZAR TERMINAL =====
function initTerminal() {
    const terminalOutput = document.getElementById('terminalOutput');
    const currentLine = document.getElementById('currentLine');

    // Mensajes del sistema
    const systemMessages = [
        "Initializing system...",
        "Checking security protocols...",
        "Firewall status: ACTIVE",
        "Encryption: AES-256 enabled",
        "Loading user profile...",
        "Access level: ROOT",
        "Establishing secure connection...",
        "Connection stabilized at 1.4 Gb/s",
        "Loading media database...",
        "System ready for commands"
    ];

    let messageIndex = 0;

    // Función para añadir nueva línea
    function addTerminalLine() {
        if (messageIndex < systemMessages.length) {
            const newLine = document.createElement('div');
            newLine.className = 'terminal-line';
            newLine.textContent = systemMessages[messageIndex];
            newLine.style.animationDelay = (messageIndex * 0.1) + 's';

            // Insertar antes de la línea actual
            terminalOutput.insertBefore(newLine, currentLine);
            messageIndex++;

            // Auto-scroll
            terminalOutput.scrollTop = terminalOutput.scrollHeight;

            // Programar siguiente línea
            if (messageIndex < systemMessages.length) {
                setTimeout(addTerminalLine, 800);
            }
        }
    }

    // Efecto de cursor parpadeante
    let cursorVisible = true;
    setInterval(() => {
        if (currentLine) {
            if (cursorVisible) {
                currentLine.textContent = currentLine.textContent.replace('_', '');
                cursorVisible = false;
            } else {
                currentLine.textContent += '_';
                cursorVisible = true;
            }
        }
    }, 500);

    // Iniciar secuencia de mensajes
    setTimeout(addTerminalLine, 1000);

    // Simular comando de usuario
    setTimeout(() => {
        const userCommand = document.createElement('div');
        userCommand.className = 'terminal-line';
        userCommand.textContent = "sudo start_media_server";
        userCommand.style.color = '#00ff88';
        userCommand.style.fontWeight = 'bold';
        terminalOutput.insertBefore(userCommand, currentLine);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }, 9000);
}

// ===== FUNCIÓN: EFECTOS DE ESTADO =====
function initStatusEffects() {
    const connections = document.getElementById('connections');
    const bandwidth = document.getElementById('bandwidth');
    const serverStatus = document.getElementById('serverStatus');
    const security = document.getElementById('security');

    // Valores aleatorios para conexiones
    const connectionValues = ['24 ACTIVE', '25 ACTIVE', '23 ACTIVE', '22 ACTIVE', '26 ACTIVE'];
    const bandwidthValues = ['1.2 Gb/s', '1.3 Gb/s', '1.1 Gb/s', '1.4 Gb/s', '1.25 Gb/s'];
    const securityLevels = ['MAXIMUM', 'CRITICAL', 'HIGH', 'ULTRA'];

    // Cambiar valores periódicamente
    setInterval(() => {
        // Conexiones (cambia más rápido)
        connections.textContent = connectionValues[Math.floor(Math.random() * connectionValues.length)];
        connections.style.color = getRandomGreenColor();

        // Animar cambio
        connections.style.transform = 'scale(1.1)';
        setTimeout(() => {
            connections.style.transform = 'scale(1)';
        }, 300);

        // Ancho de banda (cambia más lento)
        if (Math.random() > 0.7) {
            bandwidth.textContent = bandwidthValues[Math.floor(Math.random() * bandwidthValues.length)];
            bandwidth.style.color = getRandomGreenColor();
        }

        // Nivel de seguridad (cambia ocasionalmente)
        if (Math.random() > 0.9) {
            security.textContent = securityLevels[Math.floor(Math.random() * securityLevels.length)];
        }

    }, 2000);

    // Efecto de parpadeo en estado del servidor
    setInterval(() => {
        if (serverStatus.textContent === 'ONLINE') {
            serverStatus.style.textShadow = '0 0 10px #00ff00, 0 0 20px #00ff00';
            setTimeout(() => {
                serverStatus.style.textShadow = 'none';
            }, 200);
        }
    }, 3000);
}

// ===== FUNCIÓN: COLOR VERDE ALEATORIO =====
function getRandomGreenColor() {
    const greens = [
        '#00ff00', '#00ff88', '#00ff44', '#00cc00',
        '#00ff66', '#00ff22', '#00ffaa', '#00ff33'
    ];
    return greens[Math.floor(Math.random() * greens.length)];
}

// ===== FUNCIÓN: EVENTOS PARA IMÁGENES =====
function setupImageEvents() {
    const hackImages = document.querySelectorAll('.hack-image');
    const hackCards = document.querySelectorAll('.hack-card');

    // Efecto al pasar el mouse sobre imágenes
    hackImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.3) contrast(1.3) hue-rotate(10deg)';

            // Añadir efecto de sonido (opcional)
            playClickSound();
        });

        img.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(0.9) contrast(1.1)';
        });

        // Al hacer clic en la imagen
        img.addEventListener('click', function() {
            const filename = this.src.split('/').pop();
            showFileInfo(filename, this.alt);
        });
    });

    // Efectos en tarjetas
    hackCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Efecto de brillo en el borde
            this.style.boxShadow =
                '0 15px 35px rgba(0, 255, 0, 0.5), 0 0 50px rgba(0, 255, 0, 0.4)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
}

// ===== FUNCIÓN: MOSTRAR INFORMACIÓN DE ARCHIVO =====
function showFileInfo(filename, description) {
    // Crear o actualizar ventana de información
    let infoBox = document.getElementById('fileInfoBox');

    if (!infoBox) {
        infoBox = document.createElement('div');
        infoBox.id = 'fileInfoBox';
        infoBox.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 30, 0, 0.95);
            border: 2px solid #00ff00;
            padding: 25px;
            border-radius: 10px;
            z-index: 1000;
            color: #00ff00;
            font-family: 'Courier New', monospace;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 0 50px rgba(0, 255, 0, 0.5);
            backdrop-filter: blur(10px);
        `;
        document.body.appendChild(infoBox);
    }

    // Contenido de la información
    infoBox.innerHTML = `
        <h3 style="color: #00ff88; margin-bottom: 15px; border-bottom: 1px solid #00ff00; padding-bottom: 10px;">
            🖼️ FILE INFORMATION
        </h3>
        <p><strong>Filename:</strong> <span style="color: #ffffff">${filename}</span></p>
        <p><strong>Description:</strong> <span style="color: #cccccc">${description}</span></p>
        <p><strong>Path:</strong> <span style="color: #00ff88">/var/www/media/${filename}</span></p>
        <p><strong>Size:</strong> <span style="color: #00ff88">${Math.floor(Math.random() * 5000) + 100} KB</span></p>
        <p><strong>Type:</strong> <span style="color: #00ff88">${filename.endsWith('.gif') ? 'GIF Image' : 'JPEG Image'}</span></p>
        <p><strong>Last accessed:</strong> <span style="color: #00ff88">${new Date().toLocaleTimeString()}</span></p>
        <div style="margin-top: 20px; text-align: center;">
            <button onclick="closeFileInfo()" style="
                background: #00ff00;
                color: #001100;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                font-family: 'Courier New', monospace;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s;
            " onmouseover="this.style.background='#00ff88'" onmouseout="this.style.background='#00ff00'">
                CLOSE [ESC]
            </button>
        </div>
    `;

    // Cerrar con ESC
    document.addEventListener('keydown', function closeOnEsc(e) {
        if (e.key === 'Escape') {
            closeFileInfo();
            document.removeEventListener('keydown', closeOnEsc);
        }
    });

    // Cerrar al hacer clic fuera
    setTimeout(() => {
        document.addEventListener('click', function closeOnOutside(e) {
            if (!infoBox.contains(e.target)) {
                closeFileInfo();
                document.removeEventListener('click', closeOnOutside);
            }
        });
    }, 100);
}

// ===== FUNCIÓN: CERRAR INFORMACIÓN DE ARCHIVO =====
function closeFileInfo() {
    const infoBox = document.getElementById