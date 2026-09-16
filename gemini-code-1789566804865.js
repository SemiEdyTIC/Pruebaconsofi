document.addEventListener('DOMContentLoaded', () => {

  // 1. Control de Alto Contraste
  const btnContrast = document.getElementById('btn-contrast');
  btnContrast.addEventListener('click', () => {
    document.body.classList.toggle('high-contrast');
  });

  // 2. Control del Tamaño de Letra (DUA: Accesibilidad Sensorial)
  let currentScale = 16; // px base
  const btnFontUp = document.getElementById('btn-font-up');
  const btnFontDown = document.getElementById('btn-font-down');

  btnFontUp.addEventListener('click', () => {
    if (currentScale < 24) {
      currentScale += 2;
      document.documentElement.style.fontSize = `${currentScale}px`;
    }
  });

  btnFontDown.addEventListener('click', () => {
    if (currentScale > 12) {
      currentScale -= 2;
      document.documentElement.style.fontSize = `${currentScale}px`;
    }
  });

  // 3. Lector de Voz Integrado (Text-To-Speech - DUA: Múltiples formas de representación)
  const btnTts = document.getElementById('btn-tts');
  let isSpeaking = false;

  btnTts.addEventListener('click', () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        btnTts.textContent = '🔊 Escuchar';
        isSpeaking = false;
      } else {
        const textToRead = document.getElementById('main-content').innerText;
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.lang = 'es-ES';
        utterance.rate = 0.95; // Velocidad ligeramente pausada para facilitar la comprensión

        utterance.onend = () => {
          btnTts.textContent = '🔊 Escuchar';
          isSpeaking = false;
        };

        window.speechSynthesis.speak(utterance);
        btnTts.textContent = '⏹️ Detener';
        isSpeaking = true;
      }
    } else {
      alert('Tu navegador no soporta síntesis de voz.');
    }
  });

  // 4. Lógica del Caso Práctico (Interactividad y Retroalimentación)
  const btnCheckQuiz = document.getElementById('btn-check-quiz');
  const feedback = document.getElementById('quiz-feedback');

  btnCheckQuiz.addEventListener('click', () => {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');

    if (!selectedOption) {
      feedback.className = 'feedback incorrect';
      feedback.textContent = 'Por favor, selecciona una opción antes de verificar.';
      return;
    }

    if (selectedOption.value === 'b') {
      feedback.className = 'feedback correct';
      feedback.innerHTML = '<strong>¡Correcto!</strong> El sesgo proviene de los datos históricos. Modificar el prompt o acelerar el procesamiento no soluciona el origen del problema; se debe auditar y balancear la muestra de entrenamiento.';
    } else {
      feedback.className = 'feedback incorrect';
      feedback.innerHTML = '<strong>Incorrecto.</strong> Intenta nuevamente. Recuerda que los modelos de IA replican los patrones y decisiones presentes en los datos con los que fueron entrenados.';
    }
  });

});