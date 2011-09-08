function MouseCamera (scene, renderer) {
	var self = this;
		
	this.scene = scene;
	this.renderer = renderer;	

	this.rotationSpeed = 0.1;
	this.rotationEnabled = false;

  this.targetPosition = new THREE.Vector3 (0,200, 0);

	this.radius = 1600; 
	this.theta = 45; 
	this.onMouseDownTheta = 45; 
	this.phi = 60; 
	this.onMouseDownPhi = 60;

	this.isMouseDown = false;
	this.onMouseDownPosition = new THREE.Vector2();

  this.gridLine;
  this.gridSize = 30;
  this.gridSpacing = 50;
  this.gridY = 0;

	this.updateCameraPos = function () {
		self.camera.position.x = self.radius * Math.sin( self.theta * Math.PI / 180 ) * Math.cos( self.phi * Math.PI / 180 );
		self.camera.position.y = self.radius * Math.sin( self.phi * Math.PI / 180 );
		self.camera.position.z = self.radius * Math.cos( self.theta * Math.PI / 180 ) * Math.cos( self.phi * Math.PI / 180 );
    self.camera.position.addSelf (self.targetPosition);
		self.camera.updateMatrix();
	}
	
	this.camera = new THREE.Camera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
	this.updateCameraPos();
  this.camera.target.position = self.targetPosition;
	//this.camera.target.position.y = 200;
	
	this.update = function () {
		self.updateCameraPos ();
		self.render ();
	}

	this.rotate = function () {
		if (self.rotationEnabled){
			self.theta = (self.theta + self.rotationSpeed)%720;
			self.updateCameraPos ();
		}
	}

	this.topView = function () {
		this.radius = 1600; 
		this.theta = 0;
		this.phi = 180; 
		this.update();
	}

	this.mainView = function () {
		this.radius = 1600; 
		this.theta = 0; 
		this.phi = 50; 
		this.update();
	}

  this.toggleTargetSphere = function () {
    if (self.sphere == null) {
      self.addTargetSphere();
      return;
    }
 
    self.sphere.visible = !self.sphere.visible; 
  }

  this.addTargetSphere = function () {
  	self.sphere = new THREE.Mesh(new THREE.SphereGeometry( 50, 50, 50), 
    new THREE.MeshBasicMaterial({color:0x00fa00, opacity:0.6, transparent:true}));

    self.sphere.position = self.targetPosition;
		scene.addObject( self.sphere );	
    console.log ('a');
  }
			
  this.toggleGrid = function (){ 
      if (self.gridLine == null) {
        self.addGrid ();
        return;
      }

      self.gridLine.visible = !self.gridLine.visible;
  }

  this.addGrid = function () {
      var length = self.gridSize * self.gridSpacing;
      var offset = length/2

      var g = new THREE.Geometry();

      for (var i = 0; i <= self.gridSize; i++)
      {
        var left = (i * self.gridSpacing) - offset;
        g.vertices.push(new THREE.Vertex(new THREE.Vector3(left, self.gridY, offset)));
        g.vertices.push(new THREE.Vertex(new THREE.Vector3(left, self.gridY, -offset)));
        g.vertices.push(new THREE.Vertex(new THREE.Vector3(left, self.gridY, offset)));
        //go back to the beginning
      }

      for (var j = 0; j < self.gridSize; j++)
      {
        var top = (j * self.gridSpacing) - offset;
        g.vertices.push(new THREE.Vertex(new THREE.Vector3(offset, self.gridY, top)));
        g.vertices.push(new THREE.Vertex(new THREE.Vector3(-offset, self.gridY, top)));
        g.vertices.push(new THREE.Vertex(new THREE.Vector3(offset, self.gridY, top)));
      }
 
      	
			var m  = new THREE.LineBasicMaterial( { color: 0xa0a0a0, opacity: 1 } );	
		  self.gridLine = new THREE.Line(g, m );
          
		  self.scene.addChild (self.gridLine);
    }
  

	this.render = function () {
		self.renderer.render (self.scene, self.camera);
	}

	//MOUSE

	this.addMouseListeners = function () {
		self.renderer.domElement.addEventListener( 'mousemove',this.onDocumentMouseMove, false );
		self.renderer.domElement.addEventListener( 'mousedown', this.onDocumentMouseDown, false );
		self.renderer.domElement.addEventListener( 'mouseup', this.onDocumentMouseUp, false );
	}

	this.onDocumentMouseDown = function( event ) {
 
		event.preventDefault();
 
		self.isMouseDown = true;
 
		self.onMouseDownTheta = self.theta;
		self.onMouseDownPhi = self.phi;
		self.onMouseDownPosition.x = event.clientX;
		self.onMouseDownPosition.y = event.clientY;
	}
 
	this.onDocumentMouseMove = function( event ) {
 
		event.preventDefault();
 
		if ( self.isMouseDown ) {
 
			self.theta = (- ( ( event.clientX - self.onMouseDownPosition.x ) * 0.5 ) + self.onMouseDownTheta) % 360;
			self.phi = ( ( event.clientY - self.onMouseDownPosition.y ) * 0.5 ) + self.onMouseDownPhi;
 
			self.phi = Math.min( 180, Math.max( 0, self.phi ) );
 
			self.updateCameraPos();
		}

		self.render ();
	}
 
	this.onDocumentMouseUp = function ( event ) {
 		event.preventDefault();
		self.isMouseDown = false;
	}
} 

