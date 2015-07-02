/**
 * @author Douglas Chorpita   http://chorpita.com
 */

function AtomspaceGui() {
	
	var controls = {
		"Link Depth": 4,
		"Force Dynamics": true,
		"Animation": false,
		"Force Range": 5.0,
		"Jump Limit": 2.0,
		"Iterations": 200,
		"Cooling Rate": 5.0,
		"Placement": 1,
		"Link Length": 10,
		"Planar Linkage": false,
		"Surfaces": 0,
		"Shapes": 2,
		"Mode": 1,
		"Text": "test",
		"Color": "#3412fe",
		"Slider": 0.5,
		"Atom Type": 1,
		"Atom Id": 324324,
		"Atom Name": ""
	};
	
	var atomFolder;
	
	controls["Event"] = function() {
	};
	
	controls["Rebuild"] = function() {
		window.dispatchEvent( new CustomEvent( 'rebuild' ) );
	};
	
	controls["Spline Camera"] = function() {
		window.dispatchEvent( new CustomEvent( 'splcamera' ) );
	};
	
	this.getForceDynamics = function() {
		return controls["Force Dynamics"];
	}
	
	this.getAnimation = function() {
		return controls["Animation"];
	}
	
	this.getForceRange = function() {
		return controls["Force Range"];
	}

	this.getJumpLimit = function() {
		return controls["Jump Limit"];
	}

	this.getIterations = function() {
		return controls["Iterations"];
	}

	this.getCoolingRate = function() {
		return controls["Cooling Rate"];
	}

	this.getPlanarLinkage = function() {
		return controls["Planar Linkage"];
	}
	
	this.getLinkLength = function() {
		return controls["Link Length"];
	}

	this.getLinkDepth = function() {
		return controls["Link Depth"];
	}

	this.getPlacement = function() {
		return controls["Placement"];
	}
	
	this.openAtomFolder = function() {
		atomFolder.open();
	}
		
	this.update = function() {
	};

	var init = function() {

		var gui = new dat.GUI();

		var pOpts = gui.addFolder( 'Physics' );
		pOpts.add( controls, "Force Dynamics" );
		pOpts.add( controls, "Iterations", 20, 400 ).step( 10 );
		pOpts.add( controls, "Force Range", 2.0, 12.0, 0.1 );
		pOpts.add( controls, "Jump Limit", 1.0, 5.0, 0.1 );
		pOpts.add( controls, "Cooling Rate", 1.0, 20.0, 0.1 );
		pOpts.add( controls, "Placement", { "Random Position": 0, "Octant Extension": 1, "Random Extension": 2 } );
		pOpts.add( controls, "Planar Linkage" );
		
		var vOpts = gui.addFolder( 'View' );
		vOpts.add( controls, "Link Length", 5.0, 20.0, 0.1 );
		vOpts.add( controls, "Animation" );
		vOpts.add( controls, "Spline Camera" );

/*
		var lOpts = gui.addFolder( 'Lighting' );
		lOpts.add( controls, "Text" );
		lOpts.addColor( controls, "Color" );
		lOpts.add( controls, "Slider", 0, 1, 0.01 );
		lOpts.add( controls, "Event" );
*/

		var qOpts = gui.addFolder( 'Query' );		
		
		qOpts.add( controls, "Link Depth", 1, 7 ).step( 1 );
		qOpts.add( controls, "Rebuild" );
		
		atomFolder = gui.addFolder( 'Atom' );
		atomFolder.add( controls, "Atom Type", {"Evaluation Link": 0, "Inheritance Link": 1, "Concept Node": 2 } );
		
//		pOpts.open();
		vOpts.open();
//		lOpts.open();
		qOpts.open();
	}
	
	init.call( this );
}
