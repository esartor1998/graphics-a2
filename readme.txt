Assignment 1 - Particle Systems, Vertex Colour
Due. Friday February 18, 2022

Implement a particle system. Add vertex colour support to the shader.

1. Particle Systems
Particle systems control a set of points that follow an algorithm which
controls their motion, lifespan, and drawing characteristics. Particles follow
a path that can be straight or curved. For each step the particle takes the
current position is updated using the direction values for that particle.
Movement in the y axis (up) will be the same for each step. Movement in the x
and z axis can be different for each particle. This will allow the particles to
move independently of each other.

Particles have a lifespan which represents how many steps they take on their
path before they are reset. Particles start with an initial age of zero and
once they pass their maximum age they are reset with a new starting
configuration. 

The particles you will be emulating have the following properties:
-current position (x,y,z)
-xz-direction - added to the current position for each step to create the new
current position
-age - add one each time the particle position is updated and it is drawn 
-maximum age - once the age passed this number the particle given a new
starting position, the existing particle is erased
These properties need to be initialized and stored for each particle. The age
is updated for each step the particle takes. Once the age is greater than the
maximum age these parameters are reset. 

The xz-direction is determined once when the particle is created and stored for
each particle. Use the Direction Offset to generate xz-direction. It will be
used to calculate motion in the x and z directions. For example:
-if a particle starts with a position (1, 0, 1)
-the Direction Offset is 5, this means that the x and z motion can be up
to 5 points in the positive or negative direction, so they will add
+ or - 5 to x and z for each step
-random numbers are used to pick the offset values, for this example
assume the numbers are +3 for x and -4 for z. For each step you add the
offsets to the current position.
-since the starting location was (1,0,1) the next position will be
(1+3, 0+yoffset, 1-4) == (4, 0+yoffset, -3) and the position after
that will be (7, 0+2*yoffset, -7).

These parameters control the overall behaviour of the particles. They are the
global parameters for the system. Each particle can have different properties
which allow them to behave differently from each other. These parameters are
used to set the  properties for each particle:
-number of particles - how many does the system create at one time
-direction offset - where the particle moves on the next step
-maximum age - what is the maximum age for the particles in the system
-variation in maximum age - how much variation will there be for each
particle, not all particles must have the same maximum age, this control the
variations in maximum age for each particle
-repeating or one generation - do particles restart after their maximum age
is reached or do they stop - this is only used the the particles draw
a path (the above parameter)
-draw the path or individual particle - are the previously drawn
particles erased or do they remain in the system and continue to be drawn

Initial particle locations will be on a plane between (-2.0, -1.0, -2.0) and
(2.0, -1.0, 2.0). Starting position will be randomized on this plane.

Maximum values for particles will be between (-2.0, 2.0, -2.0) and (2.0, 2.0,
2.0). Pick a y offset for each step that makes it easy to see the particles
move and see the path they are following.

Once a particle passes its maximum age it should be reset with new randomized
initial configuration.  

Parameters will be controlled through keyboard input. Each press of a key will
move to the next parameter value. For example, the maximum number of particles
can be 1, 10, and 100. When the n key is pressed the number of particles will
change from 1 to 10 and then to 100. If n is pressed again then the number of
particles will return to 1.

Parameter              Values          Input
Reinitialize System       -              r              (restarts the system)
Number Particles     1, 10, 100          n
Direction Offset     0.05, 0.1, 0.2      d             (amount to offset x,z)
Maximum Age          10, 20, 50          a     (number of steps before reset)
Age Variation          0, 5, 10          s        (add/subtract from max age)
Repeating             yes or no          m           (one or more iterations)
Path                  yes or no          p


The default values are the first number in the Values column.

The most difficult item will likely be the Path operation because it will
involve a variable number of polygons.  

Pick values for the particles so they appear to be smallish squares. The
samples in the starting code are a good place to start.


2. Adding vertex colour to the shaders
Update the WebGl code and the shaders to use colour for each vertex. The
current system uses textures to define the colour of the objects. Modify the
code so that vertex colours are defined and are passed to the shaders which
will be used to shade the objects. 

The colour information will need to be defined for each vertex and passed to
the shaders so it can be applied to the polygons.

Note that this involved modifying the existing code to add colour information
and not replacing all of the code with another system. The existing code should
be modified to include vertex colour information. You will need to create an
array of colours similar to the arrays for vertices and normals. This array
will need to be stored in a WebGL buffer and the buffer must be passed to the
shaders. 

Submit a second copy of the particle system code with the updated colour
shaders. Use vertex colours to shade the particles. Do not omit submitting the
two versions of the code, one with only the particle updates, one with the
particle and shader updates. Use vertex colours on the particles. 

Name the files that contain the shader modifications index2.html, webgl2.js,
and loaddata2.js.

Sample Code
The starting code for the assignment is on Courselink. It shows a simple
animation for two particles that repeatedly move up and down. The system which
controls the animation will need to be replaced with code that generates the
particle motion for each step.

A step in the animation does not need to be displayed with every refresh of the
screen. If this is done then the animation will likely run too quickly to be
seen.  It is reasonable to change the particle animation after a number of
screen updates have occurred.

There is sample code in index.html that shows how to read from the keyboard.
This can be used to change the parameters for the system. The current system
will rotate the animation around the y axis when 1 is pressed and will change
the particle size when the letter a is pressed.

Handin Notes
Don't change the names of the files other than creating the new files for part
2. You can add more files if you wish.

Before you submit your code, do the following:
-include a readme.txt with you student number and your name
-check that all of the files needed to run the program have been
included

Submit the assignment using the dropbox for assignment 2 in Courselink.

If any parts of the system don't work correctly then include a description of
the problem in the readme.txt file.

Your code will be tested using the Chrome browser. If it doesn't work with
Chrome but it does work on another browser then you will lose marks. 

The assignment will be compiled following these steps by:
-unpacking your submission (tar or zip)
-running the python http.server module
-starting index.html in the browser using localhost:8000
-starting index2.html in the browser using localhost:8000