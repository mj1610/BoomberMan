let random = new Array();
        function randomArray(){
            for (let i = 1; i <= 10;) {
                let value = Math.floor(Math.random() * (81));
                if(!random.includes(value)){
                random.push(value)
                    i++;
                }
            }
        }        
       
        const container = document.querySelector("#main-container");
        let visited = new Array();

        let gameOverFlag = false;
        function gameOver(msg) {
            var newNode = document.createElement("h3");
            newNode.innerText = msg;
            var status = document.querySelector("#resultDisplay");
            status.innerHTML = "";
            revealBombs();
            status.appendChild(newNode);
        }        

    function revealBombs() {
        var nodes = document.getElementsByClassName("cell");
        for (const node of nodes) {
            var num = parseInt(node.getAttribute("data-index"));
            if (random.includes(num) == true) {
                node.classList.add("bombed");
            }
        }
        gameOverFlag = true;
    }    

    let score = 0;
    function setContainer(){
        for (let count = 1; count <= 9 * 9; count++) {
            let div = document.createElement("div");
            div.setAttribute("data-index", count);
            div.setAttribute("class", "cell");
            div.id = "cell_" + count;

            div.addEventListener("click", (e) => {
                if (gameOverFlag == true) 
                    return;
                var ele = parseInt(e.target.getAttribute("data-index"));
                if (visited.includes(ele) == false) {
                    if (random.includes(ele) == true) {
                        gameOver("game over");
                        return;
                    }
                    e.target.classList.add("visited");
                    score++;
                    var gscore = document.getElementById("gameScore");
                    gscore.innerText = score;
                    visited.push(ele);
                    if (visited.length == 71) {
                        gameOver("win");
                        return;
                    }
                }
            });
            container.appendChild(div);
        }  
    }
    function reset(){
        visited = [];
        random=[];
        randomArray();
        score = 0;
        container.innerHTML = "";
        gameOverFlag = false;
        var status = document.querySelector("#resultDisplay");
        status.innerHTML = "";
        var gscore = document.getElementById("gameScore");
        gscore.innerText = score;

        setContainer();

    }
    reset();