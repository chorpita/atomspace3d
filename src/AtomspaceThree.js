/**
 * @author Douglas Chorpita   http://chorpita.com
 */
 
function AtomspaceThree() {
	
	var out = {}, geos = {}, materials = [], atoms = [], links = [], scales = [ 5.0, 3.3, 1.6 ];
	
	out.geoNames = [ "ball", "cube", "storus", "htorus", "ctorus", "tetra", "doceda", "can", "cone", "slab", "stick", 
		"plank", "column" ,	"cfrus", "saturn", "stuck", "bloke", "devil", "waiter","biball", "hexie", "pawn", "connie", 
		"angel", "hangel" , "sangel", "cangel","tangel", "pangel",  "xangel",  "kevil", "cross",  "canx", "ballx",
		"bull", "hull" , "sull", "cull","tull", "pull", "xull","castle", "hastle", "sastle", "ccast", "tastle", "pastle", "xastle",
		"ldevil", "codev", "hodev", "sodev", "cadev", "todev", "podev", "xodev", "cbball", "hbball", "sbball", "ccbball", "tbball", 
		"pbball", "xbball" ];
	
	function dumpVec( n, v ) {
	    console.log( n + "= (" + Math.round( 100 * v.x ) / 100.0 + "," + Math.round( 100 * v.y ) / 100.0 + "," + Math.round ( 100 * v.z ) / 100 + ")" );
	}

	function signedRandom( val ) {
		switch( Math.sign( val ) ) {
			case 1:	return Math.random();	
			case -1: return - Math.random();	
			default: return Math.random() - 0.5;
		}
	}

	function computeGeometries() {
		var s0 = scales[ 0 ], s1 = scales[ 1 ], s2 = scales[ 2 ], half = 0.5, part = 0.2; 
		var h0 = s0 * half, h1 = s1 * half, h2 = s2 * half, p0 = s0 * part, p1 = s1 * part, p2 = s2 * part;
		
		// basic geometries
		geos.ball   = [ new THREE.SphereGeometry( h0, 20, 20 ), new THREE.SphereGeometry( h1, 20, 20 ), new THREE.SphereGeometry( h2, 20, 20 ) ];
		geos.cube   = [ new THREE.BoxGeometry( s0, s0, s0 ), new THREE.BoxGeometry( s1, s1, s1 ),  new THREE.BoxGeometry( s2, s2, s2 ) ];
		geos.storus = [ new THREE.TorusGeometry( h0, p0, 8, 4 ), new THREE.TorusGeometry( h1, p1, 8, 4 ), new THREE.TorusGeometry( h2, p2, 8, 4 ) ];	
		geos.htorus = [ new THREE.TorusGeometry( h0, p0, 8, 6 ), new THREE.TorusGeometry( h1, p1, 8, 6 ), new THREE.TorusGeometry( h2, p2, 8, 6 ) ];
		geos.ctorus = [ new THREE.TorusGeometry( h0, p0, 8, 20 ), new THREE.TorusGeometry( h1, p1, 8, 20 ), new THREE.TorusGeometry( h2, p2, 8, 20 ) ];
		geos.tetra  = [ new THREE.TetrahedronGeometry( h0, 0 ), new THREE.TetrahedronGeometry( h1, 0 ), new THREE.TetrahedronGeometry( h2, 0 ) ];
		geos.doceda = [ new THREE.DodecahedronGeometry( h0, 0 ) ];
		geos.can    = [ new THREE.CylinderGeometry( h0, h0, s0, 16 ), new THREE.CylinderGeometry( h1, h1, s1, 16 ), new THREE.CylinderGeometry( h2, h2, s2, 16 ) ];
		geos.cone   = [ new THREE.CylinderGeometry( 0, h0, s0, 16 ), 
						new THREE.CylinderGeometry( 0, h1, s1, 16 ), 
						new THREE.CylinderGeometry( 0, h2 * 0.5, s2, 16 ) ]; // special for links!
		geos.slab   = [ new THREE.BoxGeometry( p0, s0, s0 ), new THREE.BoxGeometry( p1, s1, s1 ), new THREE.BoxGeometry( p2, s2, s2 ) ];
		geos.stick  = [ new THREE.BoxGeometry( p0, s0, p0 ), new THREE.BoxGeometry( p1, s1, p1 ), new THREE.BoxGeometry( p2, s2, p2 ) ];
		geos.plank  = [ new THREE.BoxGeometry( s0, p0, p0 ), new THREE.BoxGeometry( s1, p1, p1 ), new THREE.BoxGeometry( s2, p2, p2 ) ];
		geos.column = [ new THREE.BoxGeometry( h0, s0, h0 ), new THREE.BoxGeometry( h1, s1, h1 ), new THREE.BoxGeometry( h2, s2, h2 ) ];
		geos.cfrus  = [ new THREE.CylinderGeometry( p0, h0, s0, 16 ), new THREE.CylinderGeometry( p1, h1, s1, 16 ), new THREE.CylinderGeometry( p2, h2, s2, 16 ) ];

		// compound geometries
		geos.saturn  = [ computeCompound( geos.ctorus[ 0 ], geos.ball[ 2 ], 0  ) ]; 
		geos.stuck   = [ computeCompound( geos.ctorus[ 0 ], geos.stick[ 0 ], 0 ) ];
		geos.bloke   = [ computeCompound( geos.cube[ 1 ],   geos.column[ 0 ], 0 ) ];
		geos.devil   = [ computeCompound( geos.ball[ 0 ],   geos.cube[ 1 ],  0  ) ];
		geos.waiter  = [ computeCompound( geos.can[ 2 ],    geos.stick[ 0 ], 0  ) ];
		geos.biball  = [ computeCompound( geos.ball[ 1 ],   geos.ball[ 1 ], -1.5 ) ];
		geos.hexie   = [ computeCompound( geos.htorus[ 0 ], geos.ball[ 2 ],  0 ) ];
		geos.pawn    = [ computeCompound( geos.cfrus[ 1 ],  geos.ball[ 1 ], 1.5 ) ];
		geos.connie  = [ computeCompound( geos.cfrus[ 1 ],  geos.cone[ 1 ], 1.5 ) ];
		geos.angel   = [ computeCompound( geos.cone[ 1 ],   geos.ctorus[ 2 ], 2 ) ];
		geos.hangel  = [ computeCompound( geos.cone[ 1 ],   geos.htorus[ 2 ], 2 ) ];
		geos.sangel  = [ computeCompound( geos.cone[ 1 ],   geos.storus[ 2 ], 2 ) ];
		geos.cangel  = [ computeCompound( geos.cone[ 1 ],   geos.can[ 2 ], 2 ) ];
		geos.tangel  = [ computeCompound( geos.cone[ 1 ],   geos.tetra[ 1 ], 1.8 ) ];
		geos.pangel  = [ computeCompound( geos.cone[ 1 ],   geos.plank[ 1 ], 1.4 ) ];
		geos.xangel  = [ computeCompound( geos.pangel[ 0 ], geos.stick[ 1 ], 0.8 ) ];
		geos.kevil   = [ computeCompound( geos.devil[ 0 ],  geos.can[ 2 ], -2.5 ) ];
		geos.cross   = [ computeCompound( geos.plank[ 0 ],  geos.stick[ 0 ], 0 ), computeCompound( geos.plank[ 1 ],  geos.stick[ 1 ], 0 ) ];
		geos.canx    = [ computeCompound( geos.cross[ 0 ],  geos.can[ 1 ], 0 ) ];
		geos.ballx   = [ computeCompound( geos.cross[ 0 ],  geos.ball[ 1 ], 0 ) ];
		geos.bull    = [ computeCompound( geos.ball[ 1 ],   geos.ctorus[ 2 ], 2 ) ];
		geos.hull    = [ computeCompound( geos.ball[ 1 ],   geos.htorus[ 2 ], 2 ) ];
		geos.sull    = [ computeCompound( geos.ball[ 1 ],   geos.storus[ 2 ], 2 ) ];
		geos.cull    = [ computeCompound( geos.ball[ 1 ],   geos.can[ 2 ], 2 ) ];
		geos.tull    = [ computeCompound( geos.ball[ 1 ],   geos.tetra[ 1 ], 1.8 ) ];
		geos.pull    = [ computeCompound( geos.ball[ 1 ],   geos.plank[ 1 ], 1.4 ) ];
		geos.xull    = [ computeCompound( geos.ball[ 1 ],   geos.cross[ 1 ], 1.4 ) ];
		geos.castle  = [ computeCompound( geos.can[ 1 ],    geos.ctorus[ 2 ], 2 ) ];
		geos.hastle  = [ computeCompound( geos.can[ 1 ],    geos.htorus[ 2 ], 2 ) ];
		geos.sastle  = [ computeCompound( geos.can[ 1 ],    geos.storus[ 2 ], 2 ) ];
		geos.ccast   = [ computeCompound( geos.can[ 1 ],    geos.can[ 2 ], 2 ) ];
		geos.tastle  = [ computeCompound( geos.can[ 1 ],    geos.tetra[ 1 ], 1.8 ) ];
		geos.pastle  = [ computeCompound( geos.can[ 1 ],    geos.plank[ 0 ], 1.4 ) ];
		geos.xastle  = [ computeCompound( geos.can[ 1 ],    geos.cross[ 1 ], 1.4 ) ];
		geos.ldevil  = [ computeCompound( geos.ball[ 1 ],   geos.cube[ 2 ],  -1  ) ];
		geos.codev   = [ computeCompound( geos.ldevil[ 0 ], geos.ctorus[ 2 ], 2 ) ];
		geos.hodev   = [ computeCompound( geos.ldevil[ 0 ], geos.htorus[ 2 ], 2 ) ];
		geos.sodev   = [ computeCompound( geos.ldevil[ 0 ], geos.storus[ 2 ], 2 ) ];
		geos.cadev   = [ computeCompound( geos.ldevil[ 0 ], geos.can[ 2 ], 2 ) ];
		geos.todev   = [ computeCompound( geos.ldevil[ 0 ], geos.tetra[ 1 ], 1.8 ) ];
		geos.podev   = [ computeCompound( geos.ldevil[ 0 ], geos.plank[ 1 ], 1.4 ) ];
		geos.xodev   = [ computeCompound( geos.ldevil[ 0 ], geos.cross[ 1 ], 1.4 ) ];
		geos.cbball  = [ computeCompound( geos.biball[ 0 ], geos.ctorus[ 2 ], 2 ) ];
		geos.hbball  = [ computeCompound( geos.biball[ 0 ], geos.htorus[ 2 ], 2 ) ];
		geos.sbball  = [ computeCompound( geos.biball[ 0 ], geos.storus[ 2 ], 2 ) ];
		geos.ccbball = [ computeCompound( geos.biball[ 0 ], geos.can[ 2 ], 2 ) ];
		geos.tbball  = [ computeCompound( geos.biball[ 0 ], geos.tetra[ 1 ], 1.8 ) ];
		geos.pbball  = [ computeCompound( geos.biball[ 0 ], geos.plank[ 1 ], 1.4 ) ];
		geos.xbball  = [ computeCompound( geos.biball[ 0 ], geos.cross[ 1 ], 1.4 ) ];
	}

	function computeMaterials() {
		var colors = [ 0x3333cc, 0x33cc33, 0x33cccc, 0xcccc33, 0xcc3333, 0xcc33cc, 0x666666 ];  
		for( var i in colors ) 
			materials[ i ] = new THREE.MeshPhongMaterial( { color: colors[ i ] } );
	}

	function computeCompound( geo1, geo2, delta ) {
		var compound = new THREE.Geometry();
		var mesh1 = new THREE.Mesh( geo1 ), mesh2 = new THREE.Mesh( geo2 );
		mesh2.position.y += delta;
		mesh2.updateMatrix();
		compound.merge( mesh1.geometry );
		compound.merge( mesh2.geometry, mesh2.matrix );
		return compound;
	}
	
	function findGeometry( geoType, sizeType ) {
		var g = geoType, s = sizeType;
		if( geos[ g ] === undefined )
			g = "ball";
		if( geos[ g ][ s ] === undefined )
			s = 0;
		return geos[ g ][ s ];
	}
	
	function createMesh( geoType, sizeType, colorType ) {
		 return new THREE.Mesh( findGeometry( geoType, sizeType ), materials[ colorType ] );
	}
	
	function createRandomAtomMesh() {
		return createMesh( out.geoNames[ Math.floor( Math.random() * out.geoNames.length ) ], 0, Math.floor( Math.random() * 6 ) );		  
	}
	
	function createArrowPoint( from, to ) {
	    var h = 0.5;
		var dx = to.x - from.x;
		var dy = to.y - from.y;
		var dz = to.z - from.z;
		return new THREE.Vector3( to.x - dx * h, to.y - dy * h, to.z - dz * h );
	}
	
	function createArrowMesh( fromAtom, toAtom ) {
		var mesh = new THREE.Mesh( geos.cone[ 2 ], materials[ 6 ] );
		mesh.position.copy( createArrowPoint( fromAtom, toAtom ) );
		var vec = new THREE.Vector3().copy( toAtom ).sub( fromAtom ).normalize(); 
		mesh.quaternion.setFromUnitVectors( THREE.Object3D.DefaultUp, vec ); 
		return mesh;
	}
	
	function createLinkPoints( from, to ) {
	    var linkGap = 2.0;
		var dx = to.x - from.x;
		var dy = to.y - from.y;
		var dz = to.z - from.z;
		var dis = Math.sqrt( dx * dx + dy * dy + dz * dz );
		var gx = dx * linkGap / dis;
		var gy = dy * linkGap / dis;
		var gz = dz * linkGap / dis;
		return [ new THREE.Vector3( from.x + gx, from.y + gy, from.z + gz ), new THREE.Vector3( to.x - gx, to.y - gy, to.z - gz ) ];
	}
	
	function createLinkMesh( fromAtom, toAtom ) {
		var linkGeo = new THREE.Geometry();
		var pts = createLinkPoints( fromAtom, toAtom );
		linkGeo.vertices.push( pts[ 0 ] );
		linkGeo.vertices.push( pts[ 1 ] );
		var linkMaterial = new THREE.LineBasicMaterial();
		return new THREE.Line( linkGeo, linkMaterial );	
	}
	
	function createChildren( level, numChildren, parent, parentId, root, linkLength, planarLinkage, prevVec ) {
		
	  	function createVector() {
			var vec, z = 0;
			switch( placement ) {
				case '0':
				{
					if( ! planarLinkage )
						z = - Math.random();
					vec = new THREE.Vector3( signedRandom( 0 ), signedRandom( 0 ), z );  
					vec.normalize().multiplyScalar( 40 * Math.random() );
					vec.z += ( root.position.z + 20 );
					vec.sub( parent.position );
					return vec;
				}
				default:
				{
					if( prevVec && ( placement == 1 ) ) {
						if( ! planarLinkage )
							z = - signedRandom( prevVec.z );
						vec = new THREE.Vector3( signedRandom( prevVec.x ), signedRandom( prevVec.y ), z );  
					}
					else {	
						if( ! planarLinkage )
							z = signedRandom( 0 );
						vec = new THREE.Vector3( signedRandom( 0 ), signedRandom( 0 ), z );  
					}
					return vec.normalize().multiplyScalar( linkLength );
				}
			}
		}
		
		function createChild( parentPos ) {
			// create vector for child mesh
			var vector = createVector();
				
			// create child mesh
			var childMesh = createRandomAtomMesh();
				
			// position it
			childMesh.position.set( parentPos.x + vector.x, parentPos.y + vector.y, parentPos.z + vector.z );
								
			// relation updates
			var relations = [];
			relations.push( parentId );
			atoms.push( { mesh: childMesh, rel: relations, physics: [] } );
			var id = atoms.length - 1;
			atoms[ parentId ].rel.push( id ); 

			// create link
			var hasArrow = ( Math.random() * 6 < 1 ); 
			links.push( { mesh: null, directed: hasArrow, amesh: null, from: parentId, to: id } );

			// child's children 
			var numChildChildren = Math.floor( Math.random() * 4 ) + 1; // 1 to 4 additional links...
			createChildren( level - 1, numChildChildren, childMesh, id, root, linkLength, planarLinkage, vector );
	 	}

		if( level === 0 )
			return;
			
		for( var i = 0; i < numChildren; i++ ) 
			createChild( parent.position );
	}; 
	
	
	function forceTrial( trialNum, kFac, cLimit, rLimit ) {
		
		for( var i = 0; i < atoms.length; i++ ) {
			var fx = 0.0, fy = 0.0, fz = 0.0, ai = atoms[ i ].physics[ trialNum ], ix = ai.x, iy = ai.y, iz = ai.z;
			for( var j = 0; j < atoms.length; j++ ) 
				if( i != j ) {
					var aj = atoms[ j ].physics[ trialNum ], x = ix - aj.x, y = iy - aj.y, z = iz - aj.z;
					var d2 = x * x + y * y + z * z;
					
					if( d2 < 0.01 )
						d2 = 0.01;
					
					if( ( rLimit == 0.0 ) || ( rLimit * rLimit > d2 ) ) {
						var fr = kFac * kFac / d2; 
						fx += x * fr;
						fy += y * fr;
						fz += z * fr;
					}
						
					var connected = false;
					for ( var t = 0; t < atoms[ i ].rel.length; t++ )
						if( j == atoms[ i ].rel[ t ] )
							connected = true;
								
					if( connected ) {
						var fa =  Math.sqrt( d2 ) / kFac;
						fx -= x * fa;
						fy -= y * fa;
						fz -= z * fa;
					}
				}
					
			if( fx > 0 )
				fx = Math.min( fx, cLimit )
			else
				fx = Math.max( fx, - cLimit );
					
			if( fy > 0 )
				fy = Math.min( fy, cLimit )
			else
				fy = Math.max( fy, - cLimit );
					
			if( fz > 0 )
				fz = Math.min( fz, cLimit )
			else
				fz = Math.max( fz, - cLimit );
				
			atoms[ i ].physics.push( new THREE.Vector3( ix + fx, iy + fy, iz + fz ) );
		}
	}
	
	out.forceDynamics = function( numTrials, kFac, cLimit, rLimit, coolFactor ) {
		var i;
		for( i = 0; i < atoms.length; i++ )
			atoms[ i ].physics.push( atoms[ i ].mesh.position );
		var lim = cLimit;
		for( i = 0; i < numTrials; i++ ) {
			forceTrial( i, kFac, lim, rLimit );
			lim *= coolFactor;
		}
	}
	
	out.createGraph = function( numChildren, linkDepth, linkLength, planarLinkage, zPos ) {
		var root = createRandomAtomMesh();
		root.position.z = zPos; 
		atoms.push( { mesh: root, rel: [], physics: [] } );
		createChildren( linkDepth, numChildren, root, 0, root, linkLength, planarLinkage, null );
	} 
	
	out.removeGraph = function( scene ) {
		var i;
		for( i = 0; i < atoms.length; i++ )
			scene.remove( atoms[ i ].mesh );
		atoms = [];	
		for( i = 0; i < links.length; i++ ) {
			scene.remove( links[ i ].mesh );
			if( links[ i ].directed )
				scene.remove( links[ i ].amesh );
		}
		links = [];	
	};
	
	out.createOrbit = function() {
		var move, delta, openFolder;
		var xAtom, yAtom, zAtom, 
			xBeginLook, yBeginLook, zBeginLook, 
			xCamera, yCamera, zCamera, 
			xOrbit, yOrbit, zOrbit, 
			xReach, yReach, zReach, 
			half = 0.5, mode = 0, interpolateAt = 0.8;
		
		function _init( camera, target, orbitLength, callbackOpen ) {
			
			move = 0.0;
			
			openFolder = callbackOpen;
			
			xCamera = camera.position.x;
			yCamera = camera.position.y;
			zCamera = camera.position.z;
			
			xAtom   = target.position.x;
			yAtom   = target.position.y;
			zAtom   = target.position.z;
			
			var vWork = new THREE.Vector3().copy( camera.position ).sub( target.position );
			
			var distance = vWork.length(); // distance between camera and target
			
			vWork.cross( THREE.Object3D.DefaultUp ).normalize().multiplyScalar( orbitLength );
			
			xOrbit = vWork.x;
			yOrbit = vWork.y;
			zOrbit = vWork.z;
			
			xReach = xAtom + xOrbit;
			yReach = yAtom + yOrbit;
			zReach = zAtom + zOrbit;
			
			var vCrosser = new THREE.Vector3().copy( vWork ).cross( target.position );
			
			// get a down vector to create proper cross product
			if( vCrosser.y > 0 )
				vCrosser.negate();
			
			vCrosser.cross( vWork ).normalize().multiplyScalar( orbitLength );
			
			xCross = vCrosser.x;
			yCross = vCrosser.y;
			zCross = vCrosser.z;

			// the following line of code produces a point in space at a distance "distance" that the camera is currently looking at 
			// see: http://stackoverflow.com/questions/15696963/three-js-set-and-read-camera-look-vector
			// note the unmentioned fact the the camera position must be added to get the real world point
   			var vLook = new THREE.Vector3( 0, 0, - distance ).applyQuaternion( camera.quaternion ).add( camera.position );   
			
			xBeginLook = vLook.x;
			yBeginLook = vLook.y;
			zBeginLook = vLook.z;
			
			delta = 0.005;

			mode = 0;
		}
		
		function _moveCamera( camera ) {

			var xAt, yAt, zAt, xPos, yPos, zPos, xSav, ySav, zSav;
			
			move += delta;
			
			if( ( mode === 0 )  && ( move > interpolateAt ) ) {
				mode = 1;
				openFolder();
			}
			
			if( ( mode === 1 ) && ( move > 1.0 ) ) 
				mode = 2;
				
			if( mode === 2 ) {
				xAt = xAtom;
				yAt = yAtom;
				zAt = zAtom;
			}
			else {
				var cosineEasing = half - half * Math.cos( move * Math.PI );
				xAt  = xBeginLook + ( xAtom - xBeginLook ) * cosineEasing;
				yAt  = yBeginLook + ( yAtom - yBeginLook ) * cosineEasing;
				zAt  = zBeginLook + ( zAtom - zBeginLook ) * cosineEasing;
				xPos = xCamera + ( xReach - xCamera ) * cosineEasing;
				yPos = yCamera + ( yReach - yCamera ) * cosineEasing;
				zPos = zCamera + ( zReach - zCamera ) * cosineEasing;
			}
			
			if( mode === 1 ) {
				xSav = xPos;
				ySav = yPos;
				zSav = zPos;
			}
			
			if( mode > 0 ) {
				var phase = ( Math.sqrt( move ) - 1.0 ) * 8.0, sinVal = Math.sin( phase ), cosVal = Math.cos( phase );
				xPos = xAtom + xOrbit * cosVal + xCross * sinVal;
				yPos = yAtom + yOrbit * cosVal + yCross * sinVal;
				zPos = zAtom + zOrbit * cosVal + zCross * sinVal;
			}
			
			if( mode === 1 ) {
				var translate =  ( move - interpolateAt ) / ( 1.0 - interpolateAt );
				xPos = xSav + ( xPos - xSav ) * translate;
				yPos = ySav + ( yPos - ySav ) * translate;
				zPos = zSav + ( zPos - zSav ) * translate;
			}

			camera.position.copy( new THREE.Vector3( xPos, yPos, zPos ) );

			camera.lookAt( new THREE.Vector3( xAt, yAt, zAt ) );
		}
		
		return { init: _init, moveCamera: _moveCamera };
	}
	
	out.createSpline = function() {
		
		var curve, move, delta;
		
		function _initCurve() {

			function pointNearAtom( numAtoms ) {
				var len = 10;
				// create a random vector of length 10
				var vec = new THREE.Vector3( signedRandom( 0.0 ), signedRandom( 0.0 ), signedRandom( 0.0 ) ).normalize().multiplyScalar( len );
				// add in position of atom position to return a point near an atom, but not inside the atom
				vec.add( atoms[ Math.floor( Math.random() * numAtoms ) ].mesh.position );
				return vec;
			} 

			var pts = [], n = atoms.length;
			for( var i = 0; i < n; i++ )
				pts.push( pointNearAtom( n ) );
			curve = new THREE.ClosedSplineCurve3( pts );
			move = 0.0;
		}
		
		function _setDelta( x ) { delta = x; }
				
		function nextFrame() { 
			move += delta;
			if( move > 0.9999 ) 
				move = 0.0;
		}
		
		function _moveCamera( camera ) {
			nextFrame();

			camera.position.copy( curve.getPoint( move ) );
				
			var opMove;
			if( move >= 0.5 )
			   opMove = move - 0.5
			else
			   opMove = move + 0.5;
				        
			camera.lookAt( curve.getPoint( opMove ) );
		}
		
		return { initCurve: _initCurve, setDelta: _setDelta, moveCamera: _moveCamera };
	}
	
	out.getNumAtoms = function() {
		return atoms.length;
	}

	out.getNumLinks = function() {
		return links.length;
	}

	out.addAtomToScene = function( scene, i ) {
		scene.add( atoms[ i ].mesh );
	}
	
	out.addLinkToScene = function( scene, i ) {
		scene.add( links[ i ].mesh );
		if( links[ i ].amesh )
			scene.add( links[ i ].amesh );
	}
	
	out.updateAtomLocations = function( trial ) {
		for( var i = 0; i < atoms.length; i++ )
			atoms[ i ].mesh.position.copy( atoms[ i ].physics[ trial ] );
	}
	
	out.updateLinkLocationsFast = function() {
		for( var i = 0; i < links.length; i++ ) {
		    var geo = links[ i ].mesh.geometry;
			var pts = createLinkPoints( atoms[ links[ i ].from ].mesh.position, atoms[ links[ i ].to ].mesh.position ); 
			geo.vertices[ 0 ] = pts[ 0 ];
			geo.vertices[ 1 ] = pts[ 1 ];
			geo.verticesNeedUpdate = true;
		}
	}
	
	out.removeLinks = function( scene ) {
		for( var i = 0; i < links.length; i++ )
			scene.remove( links[ i ].mesh );
	}
	
	out.createLink = function( scene, i, showArrow ) {
		var fromAtom = atoms[ links[ i ].from ].mesh.position;
		var toAtom = atoms[ links[ i ].to ].mesh.position;
		var pts = createLinkPoints( fromAtom, toAtom );
		links[ i ].mesh = createLinkMesh( fromAtom, toAtom );
		scene.add( links[ i ].mesh );
		if( showArrow && links[ i ].directed ) {
			links[ i ].amesh = createArrowMesh( fromAtom, toAtom );
			scene.add( links[ i ].amesh );
		}
	}

	out.createLinks = function( scene ) {
		for( var i = 0; i < links.length; i++ )
			out.createLink( scene, i, true );
	}
	
	out.getClickables = function() {
		var a = [];
		for( var i = 0; i < atoms.length; i++ ) {
			var mesh = atoms[ i ].mesh;
			mesh.atom = atoms[ i ];
			a.push( mesh );
		}
		return a;
	}

	computeGeometries();
	computeMaterials();
	return out;
}

