document.addEventListener("DOMContentLoaded", () => {

    const text = document.querySelector(".text");
    const input = document.querySelector("#input");
    const words = document.querySelectorAll(".text span");
    const words_quantity = words.length;
    const speed = document.querySelector(".speed");
    const errors = document.querySelector(".errors");
    const output_time = document.querySelector(".output_time");
    const track = document.querySelector(".track");
    const car = document.querySelector(".car");
    const start = document.querySelector(".start");
    const countdown = document.querySelector(".countdown");

    let time = 0;
    let running = 0;
    let chars = 0;
    let n = 0;
    let i = 0;
    let fl = false;
    let word_current = words[0];
    let errors_quantuty = 0;
    let way = track.offsetWidth - 20 - car.offsetWidth;
    let step = way / words_quantity;

    //ЗАПУСК И ОСТАНОВКА ТАЙМЕРА
    function startPause() {
        if (running == 0) {
            running = 1;
            increment();
        } else {
            running = 0;
        }
    }

    //ТАЙМЕР
    function increment() {
        if (running == 1) {
            setTimeout(function () {
                time++;
                let mins = Math.floor(time / 10 / 60);
                let secs = Math.floor(time / 10 % 60);
                let hours = Math.floor(time / 10 / 60 / 60);
                let tenth = time % 10;
                if (mins < 10) {
                    mins = "0" + mins;
                }
                if (secs < 10) {
                    secs = "0" + secs;
                }
                output_time.textContent = hours + ":" + mins + ":" + secs + ":" + tenth + "0";
                increment();
            }, 100)
        }
    }

    //РАСЧЁТ КОЛИЧЕСТВА СИМВОЛОВ
    words.forEach(item => {
        chars += item.textContent.length;
    });


    //ОБРАТНЫЙ ОТСЧЁТ
    start.addEventListener("click", () => {

        if (running == 0) {
            event.preventDefault();
            countdown.style.display = "block";
            countdown.textContent = 3;
            countdown.classList.add("countdown_start");
            setTimeout(() => {
                countdown.classList.remove("countdown_start");
            }, 950);
            setTimeout(() => {
                countdown.textContent = 2;
                countdown.classList.add("countdown_start");
            }, 1000);
            setTimeout(() => {
                countdown.classList.remove("countdown_start");
            }, 1950);
            setTimeout(() => {
                countdown.textContent = 1;
                countdown.classList.remove("countdown_start");
                countdown.classList.add("countdown_start");
            }, 2000);
            setTimeout(() => {
                countdown.classList.remove("countdown_start");
            }, 2950);
            setTimeout(() => {
                countdown.textContent = "GO";
                countdown.classList.remove("countdown_start");
                countdown.classList.add("countdown_start");
            }, 3000);
            setTimeout(() => {
                countdown.classList.remove("countdown_start");
            }, 3950);
            setTimeout(() => {
                countdown.style.display = "";
                countdown.textContent = "";
                word_current = words[0];
                word_current.classList.add("blue")
                startPause();
                input.focus();
            }, 4000);
        }
    });

    //ФОКУС ПОЛЯ ВВОДА
    input.addEventListener("focus", () => {
        if (n == words_quantity) {
            words.forEach(item => {
                item.classList.remove("green");
            });
            car.style.marginLeft = "0px";
            errors_quantuty = 0;
            errors.textContent = "";
            speed.textContent = "0 %";
            time = 0;
            n = 0;
            word_current = words[0];
            output_time.textContent = "0:00:00:00";
        }
    });

    //ВВОД В ПОЛЕ КАКОГО-ЛИБО ЗНАЧЕНИЯ
    input.addEventListener("keydown", event => {

        if (event.key != "Shift" && event.key != "Alt") {
            let input_length = input.value.length + 1;

            //УДАЛЕНИЕ СИМВОЛА
            if (event.key == "Backspace") {
                input_length = input.value.length - 1;
                if (i == input_length) {
                    input.classList.remove("red");
                    fl = true;
                }
                if (i != 0 && i == input_length + 1) {
                    i--;
                }
            }

            let word = words[n];
            //ПРОВЕРКА НА ОШИБКУ
            if (event.key.trim() == word.textContent[i].trim() && i == input_length - 1) {

                i++;
                input.classList.remove("red");
                fl = true;
                if (event.key == '.') {
                    //ОКОНЧАНИЕ ВВОДА ТЕКСТА
                    if (n == words_quantity - 1 && word.textContent.trim() == input.value.trim() + event.key) {
                        car.style.marginLeft = way + "px";
                        input.blur();
                        startPause();
                        word.classList.remove("blue");
                        word.classList.add("green");
                        n++;
                        speed.textContent = (n / words_quantity) * 100 + " %            " +
                            Math.floor(chars / time * 600) + "    зн/мин            ";
                        errors.textContent = errors_quantuty + " ошибок";
                        input.value = "";
                        i = 0;
                    }
                }

            } else if (event.key != "Backspace") {

                if (fl) {
                    fl = false;
                    errors_quantuty++;
                    input.classList.add("red");
                    errors.textContent = errors_quantuty + " ошибок";
                }

            }

            //ПЕРЕХОД К СЛЕДУЮЩЕМУ СЛОВУ
            if (event.code == 'Space' && fl) {

                car.style.marginLeft = step * (n + 1) + "px";
                distance_traveled = step * (n + 1);

                word_current.classList.remove("blue");

                if (n != words_quantity - 1) {

                    word_current = words[n + 1];
                    word_current.classList.add("blue");

                }

                i = 0;

                if (word.textContent.trim() == input.value.trim()) {
                    word.classList.add("green");
                    n++;
                    speed.textContent = (n / words_quantity) * 100 + " %            ";
                    errors.textContent = errors_quantuty + " ошибок";
                }
                event.preventDefault();
                input.value = "";
            }

        }

    });

});