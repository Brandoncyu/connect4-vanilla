const hoverGrid = (color) => {
    return `<div class="row">
                <div id="square" class="square">
                    <div class="grid-circle" style="background: ${color}"></div>
                </div>
            </div>`
}

module.exports = hoverGrid
