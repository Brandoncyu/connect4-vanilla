const gridTemplate = (color) => {
    return `<div class="row">
                <div class="square">
                    <div class="grid-circle" style="background: ${color}"></div>
                </div>
            </div>`
}

module.exports = gridTemplate
