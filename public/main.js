function createparagraph(count) {
    log = console.log;
    for (let i = 0; i < count; i++) {
        let plate = document.createElement("div");
        plate.className = "plate";

        let button = document.createElement("button");
        button.textContent = "+";
        plate.appendChild(button);

        let input_file = document.createElement("input");
        input_file.type = "file";
        input_file.accept = "image/png, image/jpeg";
        plate.appendChild(input_file);

        let thumbnail = document.createElement("div");
        thumbnail.className = "thumbnail";
        plate.appendChild(thumbnail);


        thumbnail.addEventListener("click", () => {
            selectImg(thumbnail.style.backgroundImage);

            unfocusThumbnail();
            thumbnail.style.boxShadow = "inset 0 0 0 150vw rgba(0,0,0,0.5)";
        });


        input_file.addEventListener("change", () => {
            if (input_file.files.length === 0) {
                return;
            }
            log(input_file.files);
            file = input_file.files[0];
            log(file);

            log(URL.createObjectURL(file));
            thumbnail.style.backgroundImage = "url('" + URL.createObjectURL(file) + "')";
            URL.revokeObjectURL(file);
            input_file.value = "";
        });

        button.addEventListener("click", () => {
            unfocusThumbnail();
            log("click to buttom " + (i + 1));
            if (button.textContent === "+") {
                button.textContent = "-"
                input_file.click();
                log(input_file.files);
            }
            else {
                button.textContent = "+"
                let scene = document.getElementById("scence");
                if (scene.style.backgroundImage === thumbnail.style.backgroundImage) {
                    scene.style.backgroundImage = "";
                }
                thumbnail.style.backgroundImage = "";
            }
        });

        document.getElementById("panel").appendChild(plate);
    }
}

function unfocusThumbnail() {
    let frames = document.getElementsByClassName("thumbnail");
    for (let i = 0; i < frames.length; i++) {
        frames[i].style.boxShadow = "";
    }
}

function selectImg(sourse_img) {
    let scene = document.getElementById("scence");
    scene.style.backgroundImage = sourse_img;
}

function startAnimation() {
    let start_buttom = document.getElementById("start");
    start_buttom.style.display = "none";

    let thumbnail = document.getElementsByClassName("thumbnail");
    let thumbnail_arr = [];
    for (let i = 0; i < thumbnail.length; i++) {
        let img = thumbnail[i].style.backgroundImage;
        if (img != "") {
            thumbnail_arr.push(thumbnail[i]);
        }
    }


    let slider = document.getElementById("slider");
    let i = 0;
    let gif = setInterval(() => {
        thumbnail_arr[i].click();
        i ++;
        i %= thumbnail_arr.length;
    }, slider.value * 1000);

    let stop_button = document.getElementById("stop");
    stop_button.style.display = "inline";
    stop_button.addEventListener("click", () => {
        start_buttom.style.display = "inline";
        stop_button.style.display = "none";

        clearInterval(gif);
    });
}

function clearConfiguration() {
    let scene = document.getElementById("scence");
    scene.style.backgroundImage = "";
    let thumbnail = document.getElementsByClassName("thumbnail");
    let stop_button = document.getElementById("stop");
    stop_button.click();
    for (let i = 0; i < thumbnail.length; i++) {
        thumbnail[i].style.backgroundImage = "";
    }

    let slider = document.getElementById("slider");
    slider.value = 0.5;
    let output = document.getElementById("output");
    output.textContent = 0.5;
}
