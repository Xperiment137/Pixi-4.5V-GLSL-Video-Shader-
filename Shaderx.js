var app = new PIXI.Application(screen.innerWidth, screen.innerHeight, { transparent: true });
document.body.appendChild(app.view);
const button = new PIXI.Graphics()
    .beginFill(0x0, 0.5)
    .drawRoundedRect(0, 0, 100, 100, 10)
    .endFill()
    .beginFill(0xffffff)
    .moveTo(36, 30)
    .lineTo(36, 70)
    .lineTo(70, 50);
// Position the button
button.x = (app.screen.width - button.width) / 2;
button.y = (app.screen.height - button.height) / 2;

// Enable interactivity on the button
button.interactive = true;
button.buttonMode = true;

// Add to the stage
app.stage.addChild(button);

// Listen for a click/tap event to start playing the video
// this is useful for some mobile platforms. For example:
// ios9 and under cannot render videos in PIXI without a
// polyfill - https://github.com/bfred-it/iphone-inline-video
// ios10 and above require a click/tap event to render videos
// that contain audio in PIXI. Videos with no audio track do
// not have this requirement
button.on('pointertap', onPlayVideo);


function onPlayVideo() {
    // Don't need the button anymore
    button.destroy();
const video =  document.createElement('video')
video.crossOrigin = 'anonymous'
video.preload = ''
video.src = 'Sprites/betis.mp4'
 sprite = PIXI.Sprite.from(video)
  sprite.filters = [filter];
app.stage.addChild(sprite)
app.render()
}


app.stop();

const shaderFrag = `

precision mediump float;

uniform float iTime;

void main() {
	gl_FragColor = vec4(abs(sin(iTime)),0.0,0.0,0.0);
}

`;

PIXI.loader.add('shader', './Shaders/Bruma.frag')
    .load(onLoaded);

var filter;

// Handle the load completed
function onLoaded(loader, res) {
    // Create the new filter, arguments: (vertexShader, framentSource)
    filter = new PIXI.Filter(null, res.shader.data);

    // Add the filter
  let width = window.innerWidth;
  let height = window.innerHeight;
    filter.uniforms.u_resolution= [width, height];
    filter.uniforms.u_time = [1.0];  

app.ticker.add(function(delta) {
	filter.uniforms.u_time[0] += 0.01;  // Change time to animate the transition of red 
});

}


    app.start();





