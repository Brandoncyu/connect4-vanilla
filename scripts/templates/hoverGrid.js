const hoverGrid = (color) => {
    return `<div class="row">
                <div class="hover-square">
                    <div class="grid-circle" style="background: ${color}"></div>
                </div>
            </div>`
}

module.exports = hoverGrid
