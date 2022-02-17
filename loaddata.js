// some variables used in the demo, these can be removed
var frameCount = 0;  // number of frames drawn
var drawState = 1;   // flag the controls which object drawn
var numVerts = 0;
var particles = []; //would love to avoid using a global var buuuuut...
const SIZE = 0.1;
const MAX_AGE = 999;
const TEST = false;
const TEST_INTERVAL = 120;

function randRange(min, max) {
	return Math.random() * (min - max) + max;
}

class Coord {
	constructor(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}
	toArray() {
		return [this.x, this.y, this.z];
	} //really a shame i cant return these in any other way and still preserve order
}

class Particle {
	constructor(x, y, z, maxAge) {
		this.pos = new Coord(x, y, z);
		this.age = 0;
		this.max_age = maxAge;
		let hsize = SIZE/2;
		this.vertices = [this.pos.x - hsize, y + hsize, this.pos.z,
						 this.pos.x + hsize, y + hsize, this.pos.z,
						 this.pos.x + hsize, y - hsize, this.pos.z,
						 
						 this.pos.x - hsize, y + hsize, this.pos.z,
						 this.pos.x + hsize, y - hsize, this.pos.z,
						 this.pos.x - hsize, y - hsize, this.pos.z];
		this.normals = [0.0, 0.0, 1.0,
						0.0, 0.0, 1.0,
						0.0, 0.0, 1.0,
						
						0.0, 0.0, 1.0,
						0.0, 0.0, 1.0,
						0.0, 0.0, 1.0]; //i COULD calcualte these...
	}
	updatePos(coordinate) {
		this.pos = coordinate;
		let hsize = SIZE/2;
		this.vertices = [this.pos.x - hsize, y + hsize, this.pos.z,
						 this.pos.x + hsize, y + hsize, this.pos.z,
						 this.pos.x + hsize, y - hsize, this.pos.z,
			
						 this.pos.x - hsize, y + hsize, this.pos.z,
						 this.pos.x + hsize, y - hsize, this.pos.z,
						 this.pos.x - hsize, y - hsize, this.pos.z];
	}
}

// return the number of vertices in the object
function getVertexCount() {
    return particles.length * 6;
}

function initParticles() {
	particles = [];
	for(let i = 0; i < 69; i++) {
		particles.push(new Particle(randRange(-2.0, 2.0), randRange(-1.0, 1.0), randRange(-2.0, 2.0), MAX_AGE));
	}
	console.log("initial particles",particles);
}

// vertex positions
function loadvertices() {
	// every 25 frames causes the object being drawn to change to other
	// object
	// this can be removed for the assignment
	let verts = [];
	for(let i in particles) {
		//console.log(particles[i]);
		if (particles[i].age >= particles[i].maxAge) {
			particles.splice(i, 1);
		}
		else {
			verts.push(particles[i].vertices);
		}
	}
	if (TEST && frameCount % TEST_INTERVAL == 0) {
		console.log("vertices",verts.flat());
	}
	return verts.flat();
}


// normals array
// all triangles face in the same direction so the normals are
// all the same 
function loadnormals() {
	let normals = [];
	for (let particleIndex in particles) {
		normals.push(particles[particleIndex].normals); //slow? dont care.
	}
	if (TEST && frameCount % TEST_INTERVAL == 0) {
		console.log("normals",normals.flat());
	}
	return normals.flat();
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
	if (TEST && frameCount % TEST_INTERVAL == 0) {
		console.log("textures",textures);
	}
	return textures;
}


// load vertex indices
function loadvertexindices() {
	let indices = [];
	for (let c = 0; c < particles.length * 6; c+=6) {
		indices.push([c, c+1, c+2, c+3, c+4, c+5]);
	}
	if (TEST && frameCount % TEST_INTERVAL == 0) {
		console.log("indices",indices.flat());
	}
	return indices.flat(); //slow? don't care.
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

