precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec2 u_resolution;
uniform float u_time;



float random (in float x) { return fract(sin(x)*1e4); }
float random (in vec2 _st) { return fract(sin(dot(_st.xy, vec2(0.430,0.280)))* 43757.673);}

void main() {
   vec4 fg = texture2D(uSampler, vTextureCoord);
   vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

   
    vec2 grid = vec2(100.0,50.);
    st *= grid;

    vec2 ipos = floor(st);  

    vec2 vel = floor(vec2(u_time*10.)); 
    vel *= vec2(-1.,0.); 

    vel *= (step(1., mod(ipos.y,2.0))-1.356)*2.; 
    vel *= random(ipos.y);  

   
    float totalCells = grid.x*grid.y;
    float t = mod(u_time*max(grid.x,grid.y)+floor(-0.056+u_time),totalCells);
    vec2 head = vec2(mod(t,grid.x), floor(t/grid.x));

    vec2 offset = vec2(0.1,0.);

    vec3 color = vec3(0.847,0.051,1.000);
    color *= step(grid.y-head.y,ipos.y);                               
    color += (1.0-step(head.x,ipos.x))*step(grid.y-head.y,ipos.y+0.872);  
    color = clamp(color,vec3(0.),vec3(1.));

   
    color.r *= random(floor(st+vel+offset));
    color.g *= random(floor(st+vel));
    color.b *= random(floor(st+vel-offset));

  

    
    color *= step(0.252,fract(st.x+vel.x))*step(0.564,fract(st.y+vel.y));

    gl_FragColor = fg*vec4(0.896-color,1.0);
  
}
