 /**
 *  Class TCurvedText v1.10
 *  @author: Lezhnev (lezhnevod@gmail.com)
 *
 * Constructor -----------------------------------------------------------------
 * @confin.cuttext: Integer                                                - ограничение на отображение текста 
 * @confin.startleftpoint[] :{x: int, y: int}                             - крайняя верхняя левая точка
 * @confin.width:  Integer                                                - Диаметр круга по X
 * @confin.height: Integer                                                - Диаметр круга по Y
 * @confin.grade: Integer                                                 - От куда начинать отображать Текст в Радианах
 * @confin.reverseDirection: Boolean                                      - Отображение текста по часовой или против часовой
 * @confin.font:{family: String, style: String, size: INT, color: String} - Параметры текста
 * @confin.stroke:{color: '#000000', width: 0.0}                          - текст цвет обводки
 *  
 * show_contrl ----------------------------------------------------------------
 *
 * hide_contrl ----------------------------------------------------------------
 * 
 *
 * set_text ---------------------------------------------------------------
 * @set_text: String  - Строка на которуюбудет изменен текст
 */
     
function TCurvedText(config) {
  this._initGroup(config);
  this._basicInit(config);     
};
   
TCurvedText.prototype = {
    imagelist: Object(),
    textlines: null,
    rotationAnchor: Object(),    
    Patch_text_groop: Object(),
    blueRect: Object(),
    grade: 1.57,
    rotationgrade: 0,
    jcylinder_begin_move: false,    
    startleftpoint: ['x', 'y'],
    width: 560,
    height: 420, 
    reverseDirection: true,    
    font: {family: 'Tahoma', style: 'normal', size: 15, color: '#00CC00'},
    stroke:{},
    shadow:{},
    indent: 20,//растояние междутекстом и точкой
    rotationOmPos: {x: 0, y: 0},
    rotationmPos: {x: 0, y: 0},
    texttitle : '',
    cuttext: 6.28,   //Ограничение в отображении
    data_CurvedTextcoordinates: '',
    layer:{},
    
 
    _basicInit: function(config){
        var self = this;
        this.width = config.width || this.width;
        this.height = config.height || this.height;
        this.startleftpoint.x = config.startleftpoint.x || this.startleftpoint.x;
        this.startleftpoint.y = config.startleftpoint.y ||  this.startleftpoint.y;
        this.grade = this.grade + config.grade;
        this.texttitle = config.texttitle || this.texttitle;
        this.cuttext = config.cuttext || this.cuttext;   
        this.font = config.font || this.font;
        this.stroke = config.stroke || this.stroke;
        this.shadow = config.shadow || this.shadow;
        this.reverseDirection = config.reverseDirection || this.reverseDirection;
        this.indent = this.font.size + 10;        
        this.imagelist = config.imagelist;   
        this.layer = config.layer;
        
        this.rotationBaseline = new Kinetic.Ellipse({
            x: this.startleftpoint.x + (this.width/ 2), 
            y: this.startleftpoint.y + (this.height/ 2),
            radius: {
              x: this.width/ 2,
              y: this.height/ 2
            },        
            stroke: "#ffcdab",
            strokeWidth: 1            
        }); 
        this.add(this.rotationBaseline);
          
        this.data_CurvedTextcoordinates = this._CurvedTextcoordinates(this.startleftpoint.x, this.startleftpoint.y, this.width, this.height, this.grade, this.reverseDirection, this.cuttext); //x, y, width, height, textStartPosition, reverseDirection     
       	this._set_product_text(
        		0,	
        		0,			
        		0,
        		0,
        		this.data_CurvedTextcoordinates,
        		this.font,
        		this.stroke,
        		this.shadow,
        		0,
        		this.texttitle            
         );  
         
         dataCircle = this._StartingPointCircle(this.startleftpoint.x, this.startleftpoint.y, this.width, this.height, this.grade);
         this.rotationAnchor = new Kinetic.Circle({
            x: dataCircle.x, 
            y: dataCircle.y,
            radius: 30,                     
            fill: {
              image: this.imagelist.getImage('curved-text-control-anchor-icons'),
              offset: [30, 30]
            },
            draggable: true,
            dragBoundFunc: function(pos) {
              
              var x = self.startleftpoint.x + ( self.width / 2);
              var y = self.startleftpoint.y + ( self.height / 2);
              
              var radiusX = self.width/2 - self.indent;
              var radiusY = self.height/2 - self.indent;
              
              var scaleX = radiusX / Math.sqrt(Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2));
              var scaleY = radiusY / Math.sqrt(Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2));
              
              var rpos = {
                x: Math.round((pos.x - x) * scaleX + x),
                y: Math.round((pos.y - y) * scaleY + y)
              };
              
              if(self.rotationOmPos.x == 0){
                self.rotationOmPos = rpos;
              }
                          
              self.rotationmPos = rpos;
              return rpos;
            }
          });
        	this.add(this.rotationAnchor);
          
//------------------------------------------------------------------------------                    
  
          this.rotationAnchor.on('dragmove', function(){                     
                  var startleftpoint = {
                    x: self.startleftpoint.x + ( self.width/ 2 ),
                    y: self.startleftpoint.y + ( self.height/ 2 )
                  }
                  self.grade = self._getRotationAngle(startleftpoint, 200, self.rotationmPos, self.rotationOmPos, self.grade)                 
                 self.data_CurvedTextcoordinates = self._CurvedTextcoordinates(self.startleftpoint.x, self.startleftpoint.y, self.width, self.height, self.grade+1.57, self.reverseDirection, self.cuttext); //x, y, width, height, textStartPosition, reverseDirection                      
                 self._set_product_text(
                  		0,	
                  		0,			
                  		0,
                  		0,
                  		self.data_CurvedTextcoordinates,
                  		self.font,
                  		self.stroke,
                  		self.shadow,
                  		0,
                  		self.texttitle             
                 );
               
          });
          
           this.rotationAnchor.on('dragend', function(){                               
           self.textlines.setAttrs({
              fontFamily: self.font.family,
          		fontStyle: self.font.style,
          		fontSize: self.font.size,
        			textFill: self.font.color,
        			textStroke: self.stroke.color,
          		textStrokeWidth: self.stroke.width,
        			shadow: self.shadow             
           });           
           self.layer.draw();      
           });
          
          
          
          
//-------------------------------------------------------
    },   
//Начальные координаты для точки
    _StartingPointCircle : function (x, y, width, height, textStartPosition){
    	var startleftpoint = { x: x + (width/ 2), y: y + (height/ 2) };	
    	var radiusx = width/2 - this.indent; // радиус первого кольца по x
      var radiusy = height/2 - this.indent; // радиус первого кольца по y   
      var rotation = -textStartPosition;    //угол старта позиции   
    	var kryg='';    	
      var result=new Array();
		  result.x = parseFloat(Math.sin((rotation)) * radiusx + startleftpoint.x,6);
	    result.y = parseFloat(Math.cos((rotation)) * radiusy + startleftpoint.y,6);		      
    	return  result;
    },  
//координаты Текста круга
    _CurvedTextcoordinates : function (x, y, width, height, textStartPosition, reverseDirection, cuttext){    	
      var startleftpoint = { x: x + (width/2), y: y+(height/2) };	
    	var radiusx = width / 2; // радиус первого кольца по x
      var radiusy = height / 2; // радиус первого кольца по y      
      var clockwise = reverseDirection; // против часовой стрелки    
    	var rotation = - textStartPosition;    //угол старта позиции
    	var kryg='';
    	var i = 0;
    	if(clockwise){ //по часовой или против часовой			
    		while(i>-cuttext){		
    			 x1 = parseFloat(Math.sin((i+rotation)) * radiusx + startleftpoint.x,6);
    		   y1 = parseFloat(Math.cos((i+rotation)) * radiusy + startleftpoint.y,6);		
    	 		 if (i == 0){
    				kryg = kryg + " M" + x1 + "," + y1;
    			 }else{
    				kryg = kryg + " L" + x1+"," + y1;
    			 }
    		i = i - 0.01;		
    		}	
    	}else{ //по часовой или против часовой			
    		while(i < cuttext){		
    			 x1 = parseFloat(Math.sin((i + rotation)) * radiusx + startleftpoint.x,6);
    		     y1 = parseFloat(Math.cos((i + rotation)) * radiusy + startleftpoint.y,6);		
    	 		 if (i == 0){
    				kryg = kryg + " M" + x1 + "," + y1;
    			 }else{
    				kryg = kryg + " L" + x1 + "," + y1;
    			 }
    		i=i + 0.01;		
    		}	
    	}		
    	kryg = kryg + "Z";
    	return  kryg;
    },  
//Удаление старого и добавление нового Текста в layer
    _set_product_text: function( x, y, width, height, data, font, stroke, shadow, deg, text){
  
    if(!this.textlines || typeof(this.textlines)=='undefined' ){
      
          this.textlines = new Kinetic.TextPath({
    			id: '1',
          x: x,
    			y: y,    			
    			data: data,
    			fontFamily: font.family,
      		fontStyle: font.style,
      		fontSize: font.size,
    			textFill: font.color,
    			textStroke: stroke.color,
      		textStrokeWidth: stroke.width,
    		//	shadow: shadow,    		
    			text: text			
    		});        
        this.add(this.textlines);        
   }else{             
          this.textlines.remove();
          this.textlines = null;          
          this.textlines = new Kinetic.TextPath({
    			id: '1',
          x: x,
    			y: y,    	
    			data: data,
    			fontFamily: font.family,
      		fontStyle: font.style,
      		fontSize: font.size,
    			textFill: font.color,
    			textStroke: stroke.color,
      		//textStrokeWidth: stroke.width,
    			//shadow: shadow,    			
    			text: text			
    		});        
        this.add(this.textlines);        
   }         
         
 },
// Вычисление угла поворота
    _getRotationAngle: function(startleftpoint, radius, mPos, omPos, cAngle){    
   //Расчет градусов между двумя точками и центром
    var AB = Math.sqrt( Math.pow((0 - startleftpoint.x), 2) + Math.pow((startleftpoint.y - startleftpoint.y), 2));     
    var AC = Math.sqrt( Math.pow((omPos.x - startleftpoint.x), 2) + Math.pow((omPos.y - startleftpoint.y), 2));
    var BC = Math.sqrt( Math.pow((omPos.x - 0), 2) + Math.pow((omPos.y - startleftpoint.y), 2));
    var ABC =(Math.pow((AB), 2) + Math.pow((AC), 2) - Math.pow((BC), 2))/(2 * AB * AC); 
    var alfa2 = Math.acos(ABC);     
    var angle = 0;    
    if(mPos.y > startleftpoint.y){
       alfa2=-alfa2; 
    }
    
    //Запоминаем x  и y
    omPos.x = mPos.x;
    omPos.y = mPos.y;       
    return alfa2;
  },
//Изменение текста      
   set_text: function(set_text){     
       if(set_text){       
         this.texttitle = set_text;          
         this._set_product_text(
        		0,	
        		0,			
        		0,
        		0,
        		this.data_CurvedTextcoordinates,
        		this.font,
        		this.stroke,
        		this.shadow,
        		0,
        		set_text            
         ); 
        this.layer.draw();      
       }
     },   
// Показать 
   show_contrl: function(){
     this.rotationBaseline.show();    
     this.rotationAnchor.show(); 
      this.layer.draw();      
  },                                           
//Скрыть
   hide_contrl:function(){
     this.rotationBaseline.hide();
     this.rotationAnchor.hide(); 
     this.layer.draw();           
  }
};
   
Kinetic.Global.extend(TCurvedText, Kinetic.Group);



























