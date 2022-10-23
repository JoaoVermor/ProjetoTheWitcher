const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const gravity = 0.5

const geralt = new Image();
geralt.src = './assets/images/geralt.png'

const platformImg = new Image();
platformImg.src = './assets/images/plataform.png'

const bgimg = new Image();
bgimg.src = './assets/videos/forest.gif'

const bonfireImg = new Image();
bonfireImg.src = './assets/videos/bonfire.gif'

class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 1
        }
        this.width = 30
        this.height = 30
    }

    draw() {
        c.drawImage(geralt, this.position.x, this.position.y, 50, 50)
        
    }
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity
        else this.velocity.y = 0

    }


}

class Platform {
    constructor() {
        this.position = {
            x: 0,
            y: 600
        }
        this.width = 1600
        this.height = 500
    }

    draw() {
        c.drawImage(platformImg, this.position.x, this.position.y, this.width, this.height)
    }
}

class Bg {
    constructor() {
        this.position = {
            x: 0,
            y: 20
        }
        this.width = 1600
        this.height = 610
    }

    draw() {
        c.drawImage(bgimg, this.position.x, this.position.y, this.width, this.height)
    }
}

class Bonfire {
    constructor() {
        this.position = {
            x: 700,
            y: 590
        }
        this.width = 40
        this.height = 40
    }

    draw() {
        c.drawImage(bonfireImg, this.position.x, this.position.y, this.width, this.height)
    }
}



const player = new Player()
const platform = new Platform()
const bg = new Bg()
const bonfire = new Bonfire()
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    platform.draw()
    bg.draw()
    bonfire.draw()
    player.update()

    if (keys.right.pressed) {
        player.velocity.x = 5
    }
    else if (keys.left.pressed) {
        player.velocity.x = -5
    }
    else player.velocity.x = 0

    if (player.position.y + player.height <= platform.position.y 
        && player.position.y + player.height + player.velocity.y 
        >= platform.position.y && player.position.x + player.width >= platform.position.x &&
        player.position.x <= platform.position.x + platform.width) {
        player.velocity.y = 0
    }
}

animate()

addEventListener('keydown', ({ keyCode }) => {
    console.log(keyCode)
    switch (keyCode) {
        case 65:
            console.log('left')
            keys.left.pressed = true
            break
        case 68:
            console.log('right')
            keys.right.pressed = true
            break
        case 87:
            console.log('up')
            player.velocity.y = -5
            break
    }
})

addEventListener('keyup', ({ keyCode }) => {
    console.log(keyCode)
    switch (keyCode) {
        case 65:
            console.log('left')
            keys.left.pressed = false
            break
        case 68:
            console.log('right')
            keys.right.pressed = false
            break
        case 87:
            console.log('up')
            player.velocity.y = 0
            break
    }
})