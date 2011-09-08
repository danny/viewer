
//theta, phi (degrees), origin THREEE.Vector
function SphericalPoint (radius, theta, phi, origin) {
	var self = this;

	this.degreesToRadians = function (degree) {
		return degree/(180.0/Math.PI);
	}

	this.setTheta = function (theta) {
		this.theta = this.degreesToRadians(theta);

	}

	this.setPhi = function (phi) {
		this.phi = this.degreesToRadians(phi);
	}

	this.setTheta (theta); //self.theta
	this.setPhi (phi);	//self.phi
	this.radius = radius;
		
	if (origin == null)
		origin = new THREE.Vector3 (0,0,0);

	this.origin = origin;

	this.getVector = function () {
		var x = Math.sin (self.theta) * Math.cos (self.phi) * self.radius; 
		var y = Math.sin (self.theta) * Math.sin (self.phi) * self.radius;
		var z = Math.cos (self.theta) * self.radius;
		return new THREE.Vector3 (x, y, z).addSelf (self.origin);	
	}

	this.addTheta = function (degree) {
		self.theta += self.degreesToRadians(degree);	
	}

	this.addPhi = function (degree) {
		self.phi  += self.degreesToRadians (degree);
	}

	this.toString = function () {
		var newPos = self.getVector ();
		return "R: " +self.radius + " Theta: " +self.theta +" Phi " +self.phi 
			+"(" +self.origin.x +"," +self.origin.y +"," +self.origin.z +") :: " 
			+"(" +newPos.x +"," +newPos.y +"," +newPos.z +")";	
	}
}

