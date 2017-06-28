var mainstage  = Object();
var mainlayer = new Kinetic.Layer();
//------------------------------------------------------------------------------
var backgroundgroup = new Kinetic.Group({
	x: 0,
	y: 0,
	draggable: false
});
var photogroup = new Kinetic.Group({
	x: 0,
	y: 0,
	draggable: false
});
var themegroup = new Kinetic.Group({
	x: 0,
	y: 0,
	draggable: false
});
var textgroup = new Kinetic.Group({
	x: 0,
	y: 0,
	draggable: false
});
var formgroup = new Kinetic.Group({
	x: 0,
	y: 0,
	draggable: false
});
//------------------------------------------------------------------------------
var clearimageObj = new Image();
var	backgroundrect = Object();

var formimage = Object();
var formimageObj = new Image();
		
var	themeimage = Object();
var themeimageObj = new Image();
	
var	photoimage = Object();
var circle = Object();
var photoimageObj = new Image();

var textlines = new Array();
 
$(document).ready(function(){

	mainstage = new Kinetic.Stage({
    container: 'product-container',
    width: 560,
    height: 440
	});
	
	clearimageObj.onload = function(){
		_init_product_canvas();
		taimer();
	}
	
	clearimageObj.src = 'rama.png';
		
});

/*
 * Инициализация главной области построения продукта.
 * Initialize the main area of ​​the construction product.
 */
function _init_product_canvas(){

	backgroundrect = new Kinetic.Rect({
	  x: 0,
	  y: 0,
	  width: 560,
	  height: 440, 
	  fill: '#FFFFFF',
	  cornerRadius: 10,
	  lineJoin: 'round'
	});
	//############################################################################
	formimage = new Kinetic.Image({
		x: 0,
		y: 0,
		image: clearimageObj,
		width: 560,
		height: 440
	});
	formgroup.add(formimage);
	formimageObj.onload = function(){
		formimage.setImage(formimageObj);
		mainlayer.draw();
	}
	//############################################################################
	themeimage = new Kinetic.Image({
		x: 0,
		y: 0,
		image: clearimageObj,
		width: 560,
		height: 440
	});	
	themegroup.add(themeimage);
	themeimageObj.onload = function(){
		themeimage.setImage(themeimageObj);
		mainlayer.draw();
	}
	//############################################################################
	photoimage = new Kinetic.Image({
		x: 0,
		y: 0,
		image: clearimageObj,
		width: 560,
		height: 440
	});
	photogroup.add(photoimage);
	photoimageObj.onload = function(){
		photoimage.setImage(photoimageObj);
		mainlayer.draw();
	}
	//############################################################################
	mainlayer.add(backgroundrect);
	mainlayer.add(photogroup);
	mainlayer.add(themegroup);
	mainlayer.add(textgroup);
	mainlayer.add(formgroup);
	//############################################################################
	mainstage.add(mainlayer);
	
}

/*
 * Установка параметров фона продукта.
 * Setting the background settings of the product.
 * 
 * #color																					- One-color fill
 * @fill:string
 *
 * #linear gradient																- Fill with two colors on two axes
 * @fill:{start:{x:int, y:int}, end:{x:int, y:int}, colorStops:[0, 'red', 1, 'yellow']}
 * 
 * #radial gradient																- Fill with two colors and one halftone with radial curves.
 * @fill:{start:{x:int, y:int, radius:int},end:{x:int, y:int, radius:int}, colorStops:[0, 'red', 0.5, 'yellow', 1, 'blue']}
 *
 * #pattern																				- Fill a prepared image.
 * @fill:{image:imagesObject, offset:[-int, -int]}
 */
function set_product_background(fill){
	backgroundrect.setFill(fill);
	mainlayer.draw();
}

/*
 * Установка параметров изображения загруженного пользователем с коррекцией на вращение.
 * Setting parameters uploaded by users images corrected for the rotation.
 * 
 * @x:int																					- x position.
 * @y:int																					- y position.
 * @width:int																			- width of shape.
 * @height:int																		- height of shape.
 * @crop = {x:int, y:int, width:int, height:int} 	- object containing x, y, width, and height properties.
 * @deg:int																				- rotation about the center point in degrees.
 * @url:string																		- the path to the downloaded image.
 * 
 */
function set_product_photo(x, y, width, height, crop, deg, url){
	
	if(!deg){
		deg = 0;
	}
	
	if(deg > 360){
		deg = 0;
	}
	
	photoimage.setRotationDeg(deg);
	
	photoimage.setOffset(width / 2 , height / 2);
	
	photoimage.setX(x + (width / 2));
	photoimage.setY(y + (height / 2));
	
	photoimage.setWidth(width);
	photoimage.setHeight(height);
	
	photoimage.setCrop(crop);
	
	photoimageObj.src = url;
}

/*
 *
 *
 */
function set_product_theme(url){
	themeimageObj.src = url;
}

/*
 *
 *
 */
function set_product_text(lineid, x, y, width, height, data, font, stroke, shadow, deg, text){
	
	if(lineid > 1 || lineid < 0){
		lineid = 0;
	}
	
	if(!deg){
		deg = 0;
	}
	
	if(deg > 360){
		deg = 0;
	}
	
	if(!textlines[lineid] || textlines[lineid] == 'undefined'){
		
		textlines[lineid] = new Kinetic.TextPath({
			x: x + width / 2,
			y: y + height / 2,
			offset: [width / 2, height / 2],
			data: data,
			fontFamily: font.family,
  		fontStyle: font.style,
  		fontSize: font.size,
			textFill: font.color,
			textStroke: stroke.color,
  		textStrokeWidth: stroke.width,
			shadow: shadow,
			rotationDeg: deg,
			text: text,
			
		});
		
		textgroup.add(textlines[lineid]);
		
	}else{
		
		textgroup.remove(textlines[lineid]);
		textlines[lineid] = null;
		
		textlines[lineid] = new Kinetic.TextPath({
			x: x + width / 2,
			y: y + height / 2,
			offset: [width / 2, height / 2],
			data: data,
			fontFamily: font.family,
  		fontStyle: font.style,
  		fontSize: font.size,
			textFill: font.color,
			textStroke: stroke.color,
  		textStrokeWidth: stroke.width,
			shadow: shadow,
			rotationDeg: deg,
			text: text
		});
		
		textgroup.add(textlines[lineid]);
		
	}
	
	mainlayer.draw();
	
}

/*
 *
 *
 */
function set_product_form(url){
	formimageObj.src = url;
}


// Function: convertToPath
// Convert selected element to a path, or get the BBox of an element-as-path
//
// Parameters: 
// elem - The DOM element to be converted
// getBBox - Boolean on whether or not to only return the path's BBox
//
// Returns:
// If the getBBox flag is true, the resulting path's bounding box object.
// Otherwise the resulting path element is returned.
function convertToPath(shape, shapeType, getBBox){
	
	// Possibly the cubed root of 6, but 1.81 works best
	var num = 1.81;

	switch (shapeType) {
		case 'ellipse':
		case 'circle':
			
			var a = $(elem).attr(['rx', 'ry', 'cx', 'cy']);
			
			var cx = a.cx, 
					cy = a.cy,
					rx = a.rx,
					ry = a.ry;
			
			if(shapeType == 'circle') {
				rx = ry = $(elem).attr('r');
			}
		
			joinSegs([
				['M',[(cx - rx),(cy)]],
				['C',[(cx - rx),(cy - ry / num), (cx - rx / num),(cy - ry), (cx),(cy - ry)]],
				['C',[(cx + rx / num),(cy - ry), (cx + rx),(cy - ry / num), (cx + rx),(cy)]],
				['C',[(cx + rx),(cy + ry / num), (cx + rx / num),(cy + ry), (cx),(cy + ry)]],
				['C',[(cx - rx / num),(cy + ry), (cx - rx),(cy + ry / num), (cx - rx),(cy)]],
				['Z',[]]
			]);
		break;
		
		case 'path':
			d = elem.getAttribute('d');
		break;
		
		case 'line':
			var a = $(elem).attr(["x1", "y1", "x2", "y2"]);
			d = "M"+a.x1+","+a.y1+"L"+a.x2+","+a.y2;
		break;
		
		case 'polyline':
		case 'polygon':
			d = "M" + elem.getAttribute('points');
		break;
		
		case 'rect':
			var r = $(elem).attr(['rx', 'ry']);
			
			var rx = r.rx, 
					ry = r.ry;
				
			var b = elem.getBBox();
			
			var x = b.x, 
					y = b.y, 
					w = b.width, 
					h = b.height;
			
			var num = 4 - num; // Why? Because!
			
			if(!rx && !ry){ // Regular rect
				
				joinSegs([
					['M',[x, y]],
					['L',[x + w, y]],
					['L',[x + w, y + h]],
					['L',[x, y + h]],
					['L',[x, y]],
					['Z',[]]
				]);
				
			}else{
				
				joinSegs([
					['M',[x, y + ry]],
					['C',[x, y + ry / num, x + rx / num, y, x + rx, y]],
					['L',[x + w - rx, y]],
					['C',[x + w - rx / num, y, x + w, y + ry / num, x + w, y + ry]],
					['L',[x + w, y + h - ry]],
					['C',[x + w, y + h - ry / num, x + w - rx / num, y + h, x + w - rx, y + h]],
					['L',[x + rx, y + h]],
					['C',[x + rx / num, y + h, x, y + h - ry / num, x, y + h - ry]],
					['L',[x, y + ry]],
					['Z',[]]
				]);
				
			}
		break;
		
		default:
			//path.parentNode.removeChild(path);
		break;
	}
	
	
	
}