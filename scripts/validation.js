document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    if (!form) return;

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Сбрасываем предыдущие ошибки
        document.querySelectorAll('.border-red-300, .focus\\:ring-red-500').forEach(el => {
            el.classList.remove('border-red-300', 'focus:ring-red-500');
            el.classList.add('border-gray-300', 'focus:ring-indigo-500');
        });
        
        document.querySelectorAll('.text-red-500.text-sm.mt-1').forEach(el => el.remove());
        
        let isValid = true;
        
        // 1. Проверка ФИО (не пустое, минимум 2 слова)
        const fullname = document.getElementById('fullname');
        const fullnameValue = fullname.value.trim();
        
        if (fullnameValue === '') {
            showError(fullname, 'Введите фамилию и имя');
            isValid = false;
        } else if (fullnameValue.split(' ').filter(word => word.length > 0).length < 2) {
            showError(fullname, 'Введите фамилию и имя');
            isValid = false;
        }
        
        // 2. Проверка телефона  (не пустой, 10 цифр) 
        const phone = document.getElementById('phone');
        const phoneValue = phone.value.trim();
        const phoneDigits = phoneValue.replace(/\D/g, '');
        
        if (phoneValue === '') {
            showError(phone, 'Введите номер телефона');
            isValid = false;
        } else if (phoneDigits.length < 10) {
            showError(phone, 'Введите 10 цифр номера');
            isValid = false;
        } else if (phoneDigits.length > 11) {
            showError(phone, 'Номер слишком длинный');
            isValid = false;
        }
        
        // 3. Проверка email (не пустой, содержит @ и .)
        const email = document.getElementById('email');
        const emailValue = email.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailValue === '') {
            showError(email, 'Введите email');
            isValid = false;
        } else if (!emailPattern.test(emailValue)) {
            showError(email, 'Введите корректный email');
            isValid = false;
        }
        
        // Если всё корректно - отправляем событие 
        if (isValid) {
            const message = document.getElementById('message');
            const agreement = document.getElementById('agreement');
            
            // Проверка согласия
            if (agreement && !agreement.checked) {
                showError(agreement, 'Необходимо согласие на обработку данных');
                isValid = false;
                return;
            }
            
            const formData = {
                fullname: fullnameValue,
                phone: phoneValue,
                email: emailValue,
                message: message ? message.value.trim() || '(не заполнено)' : '(не заполнено)',
                agreement: agreement ? agreement.checked : false
            };
            
            const event = new CustomEvent('formValid', { detail: formData });
            document.dispatchEvent(event);
            
             alert('Форма отправлена! Данные в консоли.');
        }
    });
    
    // Функция показа ошибки
    function showError(input, message) {
        // Для текстовых полей ввода
        if (input.type !== 'checkbox') {
            input.classList.remove('border-gray-300', 'focus:ring-indigo-500');
            input.classList.add('border-red-300', 'focus:ring-red-500');
            
            const parent = input.closest('.space-y-2') || input.parentNode.parentNode;
            
            const error = document.createElement('p');
            error.classList.add('text-red-500', 'text-sm', 'mt-1', 'font-medium');
            error.textContent = message;
            
            // Удаляем старую ошибку, если есть
            const oldError = parent.querySelector('.text-red-500.text-sm.mt-1');
            if (oldError) oldError.remove();
            
            parent.appendChild(error);
        } 
        // Для чекбокса
        else {
            const parent = input.closest('.flex.items-start') || input.parentNode.parentNode;
            
            const error = document.createElement('p');
            error.classList.add('text-red-500', 'text-sm', 'mt-1', 'font-medium');
            error.textContent = message;
            
            const oldError = parent.querySelector('.text-red-500.text-sm.mt-1');
            if (oldError) oldError.remove();
            
            parent.appendChild(error);
        }
    }
    
    // Сброс ошибки при вводе
    document.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', function() {
            // Сброс стилей для текстовых полей
            if (this.type !== 'checkbox') {
                this.classList.remove('border-red-300', 'focus:ring-red-500');
                this.classList.add('border-gray-300', 'focus:ring-indigo-500');
            }
            
            // Удаление сообщения об ошибке
            const parent = this.closest('.space-y-2') || this.closest('.flex.items-start') || this.parentNode.parentNode;
            const errors = parent.querySelectorAll('.text-red-500.text-sm.mt-1');
            errors.forEach(el => el.remove());
        });
    });
});