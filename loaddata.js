// some variables used in the demo, these can be removed
var frameCount = 0; // number of frames drawn
var particles = [];

var xzOffset = 0.05;
var yOffset = 0.05;
var particleCount = 1;
var repeat = true;
var retain = true; //this is referred to as "path" in the spec
var maxAge = 10;
var ageVar = 0;
var size = 0.1;
var reinit = {offsets: false}; //this originally had more values but i removed them all le mao

const TEST = false;
const TEST_INTERVAL = 120;
const XZBOUNDS = [-2.0, 2.0];
const YBOUNDS = [-1.0, 1.0];

function randRange(min, max) {
	return Math.random() * (min - max) + max;
}

class Particle {
	constructor(x, y, z) {
		this.pos = {x: x, y: y, z: z};
		this.age = 0;
		this.maxAge = maxAge + Math.round(randRange(0, ageVar));
		this.isClone = false; //used to prevent the cloned particles from moving on their own
		this.offsets = {};
		this.calculateOffsets();
		this.calculateVertices();
		this.normals = [0.0, 0.0, 1.0,
                        0.0, 0.0, 1.0,
                        0.0, 0.0, 1.0,

                        0.0, 0.0, 1.0,
                        0.0, 0.0, 1.0,
                        0.0, 0.0, 1.0]; //i COULD calcualte these...
	}
	calculateOffsets() { //only sets y if it is undefined, to prevent a change in xzOffset also changing y direction
		this.offsets = {
			x: randRange(-xzOffset, xzOffset),
			y: this.offsets.y === undefined ? yOffset : this.offsets.y,
			z: randRange(-xzOffset, xzOffset)
		}; //they never had top go down in the first place. functionality REMOVED.
	}
	calculateVertices() { //internally used mf constantly
		let hsize = size/2;
		this.vertices = [this.pos.x - hsize, this.pos.y + hsize, this.pos.z,
                         this.pos.x + hsize, this.pos.y + hsize, this.pos.z,
                         this.pos.x + hsize, this.pos.y - hsize, this.pos.z,

                         this.pos.x - hsize, this.pos.y + hsize, this.pos.z,
                         this.pos.x + hsize, this.pos.y - hsize, this.pos.z,
                         this.pos.x - hsize, this.pos.y - hsize, this.pos.z];
	}
	updatePos() {
		this.pos.x += this.offsets.x;
		this.pos.y += this.offsets.y;
		this.pos.z += this.offsets.z;
		this.calculateVertices();
	}
	clone() {
		let cloned = Object.assign(Object.create(Object.getPrototypeOf(this)),JSON.parse(JSON.stringify(this))); //japaspript
		cloned.isClone = true;
		return cloned;
	}
}

function getDefaultParticle() {
	return new Particle(randRange(XZBOUNDS[0], XZBOUNDS[1]), randRange(YBOUNDS[0], YBOUNDS[1]), randRange(XZBOUNDS[0], XZBOUNDS[1]));
}

// return the number of vertices in the object
function getVertexCount() { //yuh
    return particles.length * 6;
}

function reInitParticles() { //called when something changes due to a keypress.
	//although most of the behaviour in here is just guessed because idrk what he actually wants us to do
	for (let particleIndex in particles) {
		if (reinit.offsets) { //for a change in xzOffset. NOTE: completely recalculates all x & z offsets
			particles[particleIndex].calculateOffsets();
		}
	}
	reinit.offsets = false;
} //alternative implementation: callback/listener hell? EDIT: nvm i removed most of the reinit cases since they're unspecified

function initParticles() {
	particles = [];
	for(let i = 0; i < particleCount; i++) {
		particles.push(getDefaultParticle());
	}
	console.log("initial particles",particles);
}

// vertex positions
function loadvertices() { //called every frame. also really enjoy how this isnt properly cased
	let verts = [];
	for(let i = 0; i < particles.length; i++) { //no frame limit because he literally says to remove it
		if (frameCount % 4 == 0) {
			particles[i].age += 1;
			if (particles[i].age > particles[i].maxAge) {
				if(particles[i].isClone || !repeat) { //the clones must die because i hate them. also kill if repeat is off
					particles.splice(i, 1);
				}
				else { //otherwise we re-initialize the particle
					particles[i] = getDefaultParticle();
				}
			}
			else if (!particles[i].isClone) { //don't re-clone or move clones
				if (retain) { //if path is on we clone the particle before moving it
					particles.push(particles[i].clone());
				}
				particles[i].updatePos();
			}
		}
		if (particles[i]) {
			verts.push(...particles[i].vertices);
		}
	}
	return verts;
}


// normals array
// all triangles face in the same direction so the normals are
// all the same 
function loadnormals() {
	let normals = [];
	for (let particleIndex in particles) {
		normals.push(...particles[particleIndex].normals); //slow? dont care.
	}
	return normals;
}


// texture coordinates
// the current texture support four colours
// 0.0 to 0.5, 0.0 to 0.5   colour 1
// 0.0 to 0.5, 0.5 to 1.0   colour 2
// 0.5 to 1.0, 0.0 to 0.5   colour 3
// 0.5 to 1.0, 0.5 to 1.0   colour 4
function loadtextcoords() { //TODO: needs some revamping
	let textures = [];
	for (let c = 0; c < (particles.length * 2); c++) {
		textures.push(0.5, 0.5, 1.0, 0.5, 1.0, 1.0);
	}
	return textures;
}


// load vertex indices
function loadvertexindices() {
	let indices = [];
	for (let c = 0; c < particles.length * 6; c+=6) {
		indices.push(...[c, c+1, c+2, c+3, c+4, c+5]);
	}
	return indices; //slow? don't care.
}

// texture array size and data
function loadwidth() {
   return 2;
}

function loadheight() {
   return 2;
}

function loadtexture() {
   return(new Uint8Array([50,100,50,255,
                          100,150,100,255,
                          150,200,150,255,
                          200,250,200,255])
	);
}

