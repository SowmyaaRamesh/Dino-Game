document.addEventListener("DOMContentLoaded", () => {
    /* Execute Js only after loading the HTML */

    const dino = document.querySelector(".dino");
    let isJumping = false;
    let gravity = 0.9;
    const container = document.querySelector(".container");
    let gameOver = false;
    const alert = document.getElementById('alert');
    const title = document.getElementById('title');
    const score = document.getElementById('score');
    let position = 0;
    let points = 0;

    function control(e) {
        if (e.keyCode == 32 || e.keyCode == 38) {
            /* 32- SPACE BAR */
            if (!isJumping) {
                isJumping = true;
                jump();
            }


        }
    }

    document.addEventListener("keyup", control);

    function jump() {

        let count = 0;


        let upTimer = setInterval(function() {
            if (count === 15) {
                clearInterval(upTimer);
                let downTimer = setInterval(function() {
                    if (count === 0) {
                        clearInterval(downTimer);
                        isJumping = false;
                    }
                    count--;
                    position -= 7;
                    position = position * gravity;
                    dino.style.bottom = position + 'px';
                }, 15);
            }
            count++;
            position += 45;
            position = position * gravity;
            dino.style.bottom = position + "px";
        }, 15);

    }

    function updateScore() {
        let timer = setInterval(function() {
            if (gameOver) {
                clearInterval(timer);
                return;
            }
            points += 1;
            score.innerHTML = points;
        }, 1200);
    }

    function generateObstacles() {


        if (gameOver) {
            clearTimeout(timeout);
        }

        let randomTime = Math.floor(Math.random() * (6000 - 2000));
        let obstaclePosition = 1500;
        let obstacle = document.createElement('div');
        let left_arm = document.createElement('div');
        let right_arm = document.createElement('div');
        if (!gameOver)
            obstacle.classList.add('cactus-body');
        left_arm.classList.add('cactus-arm-left')
        right_arm.classList.add('cactus-arm-right')
        obstacle.appendChild(left_arm)
        obstacle.appendChild(right_arm)
        container.appendChild(obstacle);
        obstacle.style.left = obstaclePosition + "px";

        let obstacleTimer = setInterval(function() {
            if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60) {
                clearInterval(obstacleTimer);
                gameOver = true;
                title.innerHTML = " ";
                score.innerHTML = "Score: " + points;
                alert.innerHTML = "GAME OVER!";
                while (container.firstChild) {
                    container.removeChild(container.lastChild);
                }

            }
            obstaclePosition -= 10;
            obstacle.style.left = obstaclePosition + "px";

        }, 30);


        if (!gameOver) {
            let timeout = setTimeout(generateObstacles, randomTime);

        }

    }

    generateObstacles();
    updateScore();
});