function graph_func(func) {
    const uid_1 = get_uid();

    const text = `
        <div class="canvas-outer-wrapper" style="overflow:hidden; height: 30rem; border: .1rem solid #333">
            <div class="canvas-inner-wrapper canvas-inner-box4">
                <canvas id="${ uid_1 }" width="2000px" height="1000px"></canvas>
            </div>
        </div>
    `;

    document.write(text);

    setvar(45,5,4,[[func,"rgb(66,44,255)",1]], uid_1 ,10,15,5,"x","y",0,0);
}