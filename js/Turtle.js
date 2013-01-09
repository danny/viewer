function Turtle (scene) {
  var self = this;

  this.scene = scene;

  this.position = new SphericalPoint (0,0,0);
  this.oldPosition = new THREE.Vector3 (0,0, 0);
  this.stepSize = 5;

  this.penDown = true;
  this.color = 0x00FF00;

  this.turtleMesh;

  this.forward = function(steps){

    self.position.radius = steps * self.stepSize;
    self.position.origin = self.oldPosition;

    var newPos = self.position.getVector();

    if (self.penDown)
      self.drawLine (new THREE.Vertex (self.oldPosition), new THREE.Vertex(newPos));

    self.oldPosition = newPos;
    self.turtleMesh.position = newPos;

    console.log (self.position.toString())
  }

  this.backward = function(steps){
  }

  this.turnUp = function (degree) {
    self.turnDown (-degree);
  }

  this.turnDown = function(degree) {
    self.position.addPhi (degree);
  }

  this.turnLeft = function (degree) {
    self.position.addTheta(degree);
  }

  this.turnRight = function (degree) {
    self.turnLeft (-degree);
  }

  this.changeColor = function (newColor) {
    self.color = newColor;
  }

  this.penUp = function () {
    this.penDown = false;
  }

  this.penDown = function () {
    this.penDown = true;
  }

  this.drawTurtle = function () {
    var cube = new THREE.CubeGeometry( 25, 100, 25 );

    cube.vertices[ 0 ].position.multiplyScalar( 0.01 );
    cube.vertices[ 1 ].position.multiplyScalar( 0.01 );
    cube.vertices[ 4 ].position.multiplyScalar( 0.01 );
    cube.vertices[ 5 ].position.multiplyScalar( 0.01 );

    var material = new THREE.MeshBasicMaterial( {color:0xFF0000, opacity:0.8, transparent:true });

    self.turtleMesh = new THREE.Mesh( cube, material );
    self.turtleMesh.position.set (0,50,0);
    self.turtleMesh.rotation.x = 80;
    self.turtleMesh.rotation.z = 45;
    self.turtleMesh.updateMatrix();
    self.turtleMesh.matrixAutoUpdate = true;
    self.scene.addChild( self.turtleMesh );

  }

  this.drawLine = function (oldVertex, newVertex) {
    var material = new THREE.LineBasicMaterial( { color: 0xff0000, opacity: 1 } );
    var g2 = new THREE.Geometry();
    g2.vertices.push (oldVertex);
    g2.vertices.push (newVertex);

    self.line = new THREE.Line( g2, material );
    self.line.matrixAutoUpdate = true;
    scene.addChild (self.line);
  }
}

